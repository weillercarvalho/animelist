export type Animes = {
    id: number,
    userId: number,
    sessionId: number,
    name: string,
    review: string,
    image: string,
    rate: number,
    token: string,
    date: Date,
}


export type AnimelistProtocol = Omit<Animes, "id" | "userId" | "sessionId" | "token" | "date">

