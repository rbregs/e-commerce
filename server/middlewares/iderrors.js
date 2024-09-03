import mongoose from 'mongoose';
import ErrorHandler from '../utils/errorHandler.js';


export const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new ErrorHandler('Invalid id ', 400));
    }
    next();
};