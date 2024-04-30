import { signal } from "@angular/core"

export interface Task {
    id:number,
    title:string,
    completed: boolean
}
export interface candidate {
    avatar:string,
    number: number,
    name: string
}
export interface votantes {
    name:string,
    group:string,
    id:number,
    code:number
}
export interface tarjeton {
    name:string,
}

export interface displayMode {
    [key: string]: boolean;
    group: boolean;
    document: boolean;
    name: boolean;
    code: boolean;
}
export interface VotingResult {
    tarjeton: string;
    votes: string[];
  }
