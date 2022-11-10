export type Users = {
    id: number,
    name: string,
    email: string,
    password: string,
    confirmPassword?: string,
    date: Date,
}

export type SignUpProtocol = Omit<Users, "id" | "date">