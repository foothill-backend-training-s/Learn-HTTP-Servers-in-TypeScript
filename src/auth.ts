import * as argon2 from "argon2";
import { HTTPError } from "./errors/class_error.js";
import jwt, { JwtPayload } from "jsonwebtoken";

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export async function hashPassword(password: string): Promise<string> {
    try {
        return await argon2.hash(password);
    } catch (err) {
        throw new HTTPError("error", 500)
    }
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean> {
    try {
        if (await argon2.verify(hash, password)) {
            return true
        } else {
            return false
        }
    } catch (err) {
        throw new HTTPError("internal failure", 500)
    }
}

export function makeJWT(userID: string, expiresIn: number, secret: string): string {
    const payload: payload = {
        iss: "chirpy",
        sub: userID,
        iat: Math.floor(Date.now() / 1000),
        exp: expiresIn
    }
    return jwt.sign(payload, secret);
}

export function validateJWT(tokenString: string, secret: string): string {
    try {
        const decoded = jwt.verify(tokenString, secret, {
            algorithms: ['HS256']  // Only accept HS256
        })as payload;
        return decoded.sub as string;
    } catch (error) {
        throw new HTTPError("invalid token", 401);
    }

}
