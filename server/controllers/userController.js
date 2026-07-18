import User from '../models/User.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const createJWTToken = (user) => {
    const token = jwt.sign({
        userID: user._id,
        email: user.email,
    }, SECRET_KEY, { expiresIn: "1h" });
    return token;
}
export const createRefreshToken = (user) => {
    const token = jwt.sign({
        userID: user._id,
        email: user.email
    }, SECRET_KEY, { expiresIn: "10h" });
    return token;
}

export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const hashedPass = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPass
            });
            const savedUser = await newUser.save();

            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                },
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = createJWTToken(user);

        // Optional for now
        const refreshToken = createRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 900000,
            sameSite: "none"
        });

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
export const handleRefreshToken = (req, res) => {
    const accessToken = createJWTToken(req.user);

    return res.status(200).json({
        message: "New access token",
        token: accessToken
    });
};