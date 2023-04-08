export interface Files{
    id: number,
    name: string,
    type: string,
    child?:Files[],
    hasChild?:boolean,
}