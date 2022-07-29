export interface VotePlayer{
    id:number;
    name:string;
    rate:number;
}
export interface Vote{
    players:VotePlayer[]
}

export interface Player{
    name:string;
    role:string;
    number:number;
}