export interface JwtResponse {
    dataUser: {
        id: number,
        rol: string,
        user: string,
        accessToken: string,
        expiresIn: string
    }
}
