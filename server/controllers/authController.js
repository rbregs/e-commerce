import catchAssyncErrors from '../middlewares/catchAssyncErrors.js'
import User from '../models/usermodel.js'
import sendToken from '../routes/sendToken.js'
import { delteFile, uploadFile } from '../utils/cloudinary.js'
import { getResetPasswordTemplate } from '../utils/emailTemplate.js'
import ErrorHandler from '../utils/errorHandler.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'


// register
export const registerUser = catchAssyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password
    })

    sendToken(user, 201, res)
})

export const loginUser = catchAssyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    // find user in database
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler('Invalid credentials', 401))
    }

    // check if password is correct
    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid credentials', 401))
    }

    sendToken(user, 201, res)
});

//logout 
export const logout = catchAssyncErrors(async (req, res, next) => {
    
    res.cookie("token",null, {
        expires:new Date(Date.now()),
        httpOnly:true
    }) 

    res.status(200).json({
        message:"Logged Out",
    })
});

//upload avatar
export const upload = catchAssyncErrors(async (req, res, next) => {

    //remove previous avatar

    if(req?.user?.avatar.url) {
        await delteFile(req?.user?.avatar?.public_id)
    }
    
   const avatarResponse = await uploadFile(req.body.avatar,"kproducts/avatars")

   const user = await User.findByIdAndUpdate(req?.user?._id, {
    avatar: avatarResponse
   })
   
    res.status(200).json({
     user,
    })
});


// forgotPassword function
export const forgotPassword = catchAssyncErrors(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler('Email is required', 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler('Email not found', 404));
    }


    const resetToken = user.getResetPassword();
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = getResetPasswordTemplate(user.name, resetUrl);

    await sendEmail({
        email: user.email,
        subject: 'KProducts Password Recovery',
        message,
    });

    res.status(200).json({
        message: `Email sent to: ${user.email}`,
    });
});


// resetPassword function
export const resetPassword = catchAssyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });



    if (!user) {
      return next(new ErrorHandler('Password reset token is invalid or has expired', 404));
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler('Passwords do not match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});



//get user profile  api/v1/me
export const getUserProfile = catchAssyncErrors(async (req,res,next) => {
    const user = await User.findById(req?.user?._id)

    res.status(200).json({
        user,
    })
})


//update password api/v1/password/update
export const updatePassword = catchAssyncErrors(async (req,res,next) => {
    const user = await User.findById(req?.user?._id).select("+password")

    //check the previous password

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Current password is incorrect', 400))
    }

    user.password = req.body.password
    user.save()

    res.status(200).json({
        sucess: true,
    })
})

//update user profile  = > /api/v1/me/update
export const updateProfile = catchAssyncErrors(async (req,res,next) => {
   
    const newUSerData = {
        name: req.body.name,
        email: req.body.email 
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUSerData, {new: true})

    // user.save()

    res.status(200).json({
        user
    })
})


//admin get all users  api/v1/admin/users

export const allUser = catchAssyncErrors(async (req,res,next) => {
    const users = await User.find()

    res.status(200).json({
        users,
    })
})

//admin get all users  api/v1/admin/users/:id
export const getUserDetails = catchAssyncErrors(async (req,res,next) => {
    // const { id } = req.params
   
    const user = await User.findById(req.params.id)
    
    if(!user) {
        return next(new ErrorHandler(`user not found with id ${req.params.id}` ,404 ))
    }

    res.status(200).json({
        user,
    })
})


//update user
export const updateUser = catchAssyncErrors(async (req,res,next) => {
   
    const newUserData = {
        name: req.body.name,
        email: req.body.email, 
        role: req.body.role, 
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {new: true})

    // user.save()

    res.status(200).json({
        user
    })
})


//delete user
export const deleteUser = catchAssyncErrors(async (req,res,next) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        return next(new ErrorHandler(`user not found with id ${req.params.id}` ,404 ))
    }

    //-----------------------------****TO DO ****---------------------- Remove user avatar from cloudinary
    await user.deleteOne()

    res.status(200).json({
        sucess:true,
    })
})
