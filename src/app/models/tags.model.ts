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
    position:number,
    name:string,
    amountOfCandidates:number
}