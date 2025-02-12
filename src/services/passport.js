import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import bcrypt from 'bcrypt';
import User from './models/user.model.js';
import {redis} from './lib/redis.js';


// Local Strategy for Signup
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return done(null, false, { message: 'Email already exists, please try another one.' });
    }
    
   
    const newUser = await User.create({
      email,
      password: hashedPassword,
      provider: 'local'
    });
    
    return done(null, newUser);
  } catch (error) {
    console.log('Error Signing up', error.message)
    return done(error);
  }
}));

// Local Strategy for Signin
passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email, provider: 'local' });
    if (!user) return done(null, false, { message: 'Invalid credentials, please try again.' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return done(null, false, { message: 'Invalid Password, Please try again.' });

    return done(null, user);
  } catch (error) {
    console.log('Error Signing in', error.message)
    return done(error);
  }
}));



// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.NEXTAUTH_URL}/api/auth/google/callback`,
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        provider: 'google'
      });
    }
    
    return done(null, user);
  } catch (error) {
    console.log('Error Signing in with Google', error.message);
    return done(error);
  }
}));



// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.NEXTAUTH_URL}/api/auth/github/callback`,
  scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });
    
    if (!user) {
      user = await User.create({
        githubId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        provider: 'github'
      });
    }
    
    return done(null, user);
  } catch (error) {
    console.log('Error Signing in with GitHub', error.message);
    return done(error);
  }
}));

// Session serialization with Redis
passport.serializeUser((user, done) => {
  const sessionKey = `session:${user.id}`;
  redis.set(sessionKey, JSON.stringify(user), 'EX', process.env.SESSION_TTL || 86400);
  done(null, sessionKey);
});

passport.deserializeUser(async (sessionKey, done) => {
  try {
    const userData = await redis.get(sessionKey);
    done(null, userData ? JSON.parse(userData) : null);
  } catch (error) {
    console.log('Error deserializing user', error.message);
    done(error);
  }
});

export default passport;

