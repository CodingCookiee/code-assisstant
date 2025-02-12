import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/user.model.js";
import bcrypt from "bcrypt";

// Local Strategy for Signup
passport.use('local-signup', new LocalStrategy(
  async (email, password, done) => {
    try {
      console.log('Attempting to sign up:', email);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists:', email);
        return done(null, false, { message: 'User Already Exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashedPassword });
      console.log('User created successfully:', newUser);
      return done(null, newUser);
    } catch (error) {
      console.error('Error during signup:', error);
      return done(error);
    }
  }
));

// Local Strategy for Signin
passport.use(new LocalStrategy(
  async (email, password, done) => {
    try {
      console.log('Attempting to sign in:', email);
      const user = await User.findOne({ email });
      if (!user) {
        console.log('No user found with email:', email);
        return done(null, false, { message: 'No User Exists with this Email' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('Invalid password for user:', email);
        return done(null, false, { message: 'Invalid Password' });
      }
      console.log('User signed in successfully:', user);
      return done(null, user);
    } catch (error) {
      console.error('Error during signin:', error);
      return done(error);
    }
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
