export interface dbT{
    products:productT[],
    users: usersT[]
}
export interface usersT{
    id:number,
    userName:string,
    email:string,
    password: string
}
export interface productT {
    name: string,
    id:number,
    photo:string,
    price: number
}