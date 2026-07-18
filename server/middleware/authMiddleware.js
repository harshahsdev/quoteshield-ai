import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const verifyAuth = (req, res, next)=>{
    const authHeader  = req.headers.authorization;
    if(!authHeader ||  !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "NO token provided"});
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        if(!decoded.userID && !decoded._id && !decoded.id){
            return res.status(401).json({message: "Invalid token"});
        }
        req.user = {
            ...decoded,
            id: decoded.userID || decoded._id || decoded.id,
            userId: decoded.userID || decoded._id || decoded.id
        };
        
        next();
        }
    catch(err){
        return res.status(401).json({ message: "Invalid token", error: err.message});
    }
};
export const verifyRefresh = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshtoken;

        if (!refreshToken) {
            return res.status(403).json({ message: "Refresh token missing" });
        }

        const decoded = jwt.verify(refreshToken, SECRET_CODE);

        req.user = {
            ...decoded,
            id: decoded.userID || decoded._id || decoded.id,
            userId: decoded.userID || decoded._id || decoded.id
        };
        console.log("Decoded user:", req.user);
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};


