import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import createError from "../_utils/createError.js";
import { redis } from "../lib/redis.js";

export const signUp = async (userData) => {
// Check if the user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw createError(409, "User Already Exists");
  }

  const { email, password } = userData;
  if (!email || !password) {
    throw createError(400, "Please fill all the fields");
  }



try{const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({
    email,
    password: hashedPassword,
  });
  return user}
  catch(error){
    console.log('Error Signing up:', error.message);
    throw error;
    }
};


export const validateCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, "No User Exists with this Email");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createError(401, "Invalid Password");
  }
  return user;
};


export const signIn = async (credentials) => {
    const { email, password } = credentials
    
    if (!email ) {
        throw createError(400, 'Please provide email')
    }
    if(!password) {
        throw createError(400, 'Please provide password')
    }


    const user = await User.findOne({ email })
    if (!user) {
        throw createError(404, 'No User Exists with this Email')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw createError(401, 'Invalid Password')
    }

    // Cache user data in Redis
    await redis.set(`user:${user._id}`, JSON.stringify(user), 'EX', 3600)

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject()
    return userWithoutPassword
}



export const getUser = async (userId) => {
  // Try Redis Cache First
  const cachedUser = await redis.get(`user:${userId}`);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  // Fetch from Database
  const user = await User.findById(userId);
  if (!user) {
    throw createError(404, "User not found");
  }
  await redis.set(
    `user:${userId}`,
    JSON.stringify(user),
    "EX",
    60 * 60 * 24 * 5
  );
  return user;
};

