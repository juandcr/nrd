import { Data } from "@angular/router";

export interface Resultado{
    player:string,
    rates:[{}]
}
export interface Resultados{
    player:string,
    ratings:Map<number,number>;
    labels:string[];
    data:[{data:any[],label:string}];
    promedio:number;
    max:number;

}
    