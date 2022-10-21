import {INote} from "@/interfaces"
export interface IWilder {
    id: number;
    first_name: string;
    last_name: string;
    age: number;
    notes: INote[]
}