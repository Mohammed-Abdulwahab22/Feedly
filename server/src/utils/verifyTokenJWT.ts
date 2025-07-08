import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export function generateToken(userID : number)
{
    return jwt.sign({userID}, JWT_SECRET,{expiresIn: "7d"});
}

export function verifyTokenJWT(token : string) : { userID: number } | null
{
    try {
        return jwt.verify(token, JWT_SECRET) as { userID: number };
    } catch (error) {
        return null;
    }
}