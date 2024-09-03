
export default (user,statusCode,res)=> {

    //create JWT token
    const token = user.getJwtToken()

    //option from cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly:true
    }

    console.log(options)

    res.status(statusCode).cookie("token", token, options).json({
        token,
    })
}