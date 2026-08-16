import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from "../constants/app.constant.js";

export const initLoginGooglePassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:3069/api/auth/google/callback",
            },
            function (accessToken, refreshToken, profile, cb) {
                // console.dir(
                //   { accessToken, refreshToken, profile },
                //   { depth: null, color: true },
                // );

                const fullName = profile.displayName;
                const googleId = profile.id;
                const email = profile.emails[0].value;
                const avatar = profile.photos[0].value;
                const isEmailVerified = profile.emails[0].verified;

                console.log({ fullName, googleId, email, avatar, isEmailVerified });
                //hợp lệ
                return cb(null, "token");
                //k hợp lệ
                //  return cb(err, null);

                if (!isEmailVerified) {
                    return cb(ne)
                }
            },
        ),
    );
};
