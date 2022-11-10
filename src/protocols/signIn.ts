export type Sessions = {
    id: number,
    userId: number,
    email: string,
    password: string
    token: string,
    date: Date,
}

export type SignInProtocol = Omit<Sessions, "id" | "userId" | "token" | "date">