const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("@prisma");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      // In production: use bcrypt.compare instead
      if (password !== user.password) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: jwt_payload.id } });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);
