import "dotenv/config"
// console.log("\n", "database-url", DATABASE_URL, "\n") 
export const DATABASE_URL = process.env.DATABASE_URL
export const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY
export const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET



console.log(REFRESH_TOKEN_SECRET_KEY)