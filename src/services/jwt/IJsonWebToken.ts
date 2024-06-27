export interface IJsonWebToken {
    generateToken(userJwt: IUserJwt) : string;
    verifyToken(token: string) : string;
}

export interface IUserJwt {
    id: string;
    email: string;
}
