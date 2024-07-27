import bcrypt from "bcrypt";
import { IBcrypt } from "./IBcrypt";

export class Bcrypt implements IBcrypt {

    async generateHash(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (err) {
            throw new Error("Error to generate Hash!");
        }
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        try {
            return bcrypt.compare(password, hash);
        } catch (err) {
            throw new Error("Error to compare Hash!");
        }
    }
}
