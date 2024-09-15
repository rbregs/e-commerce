//authenticated user or not

import jwt from "jsonwebtoken"
import ErrorHandler from "../utils/errorHandler.js"
import catchAssyncErrors from "./catchAssyncErrors.js"
import User from '../models/usermodel.js'


export const isAuthenticatedUser = catchAssyncErrors(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login first before accessing this resource', 401))
    }

    //verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = req.user = await User.findById(decoded.id)

    next()

})

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403))
        }
        next()
    }
}