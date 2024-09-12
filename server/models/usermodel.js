import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [50, "Name should not exceed 50 characters"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, "Password should be at least 6 characters"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });


// Encrypt password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
         next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//return jwtoken
userSchema.methods.getJwtToken = function () {
    return jwt.sign({id : this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPRESS_TIME,
    })
}

//compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password)
}


//generate password reset
userSchema.methods.getResetPassword = function() {

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    console.log(`this is before hashing in userschema ${resetToken}`)

    //hash Token
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest('hex');

      console.log(`Hashed reset token stored in DB: ${this.resetPasswordToken}`);
    //set token expire
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
};


export default mongoose.model('User', userSchema);
