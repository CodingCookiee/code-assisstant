import passport from '../../../../services/passport';
import nextConnect from 'next-connect';

const handler = nextConnect();
handler.use(passport.initialize());

handler.get(
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false
  })
);

export { handler as GET, handler as POST };
