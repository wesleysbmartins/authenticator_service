import jwt from "jsonwebtoken";
import { IJsonWebToken, IUserJwt } from "./IJsonWebToken";

const secret = 'your-secret-key';

export class JsonWebToken implements IJsonWebToken {

    generateToken(userJwt: IUserJwt): string {
        try {
            const token = jwt.sign(userJwt, secret, {  expiresIn: "1h"});
            return token;
        } catch (err) {
            throw new Error("Error to Generate Token!");
        }
    }

    verifyToken(token: string): string {
        try {
            const jwtValidation = jwt.verify(token, secret);
            return jwtValidation as string;
        } catch (err) {
            throw new Error('Invalid token');
        }
    }
}
