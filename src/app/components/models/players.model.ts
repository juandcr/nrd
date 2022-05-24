export interface VotePlayer{
    id:number;
    name:string;
    rate:number;
}
export interface Vote{
    players:VotePlayer[]
}