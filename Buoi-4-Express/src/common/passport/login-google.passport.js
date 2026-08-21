import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from "../constants/app.constant.js";
import { prisma } from "../prisma/connect.prisma.js";
import { tokenService } from "../../services/token.service.js";

export const initLoginGooglePassport =  () => { 
    passport.use( 
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:3069/api/auth/google/callback",
            },
            async function (accessTokenGG, refreshTokenGG, profile, cb) {
                // console.dir(
                //   { accessToken, refreshToken, profile },
                //   { depth: null, color: true },
                // );

                const fullName = profile.displayName;
                const googleId = profile.id;
                const email = profile.emails[0].value;
                const avartar = profile.photos[0].value;
                const isEmailVerified = profile.emails[0].verified;
                console.log({ fullName, googleId, email, avartar, isEmailVerified });

                if (!isEmailVerified) {
                    return cb(new Error("Email chưa verify"), null)
                }
                let userExit = await prisma.users.findFirst({
                    where: {
                        email: email
                    }
                })
                if (!userExit) {
                    userExit = await prisma.users.create({
                        data: {
                            fullName: fullName,
                            googleId: googleId,
                            email: email,
                            avartar: avartar,
                        }
                    })
                }
                const accessToken = tokenService.createAccessToken(userExit.id)
                const refreshToken = tokenService.createRefreshToken(userExit.id)
                //hợp lệ
                return cb(null, { accessToken, refreshToken });
                //k hợp lệ
                //  return cb(err, null);
            },
        ),
    );
};
