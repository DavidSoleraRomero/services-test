import { Model } from "./model";

export interface Person extends Model {
    name: string;
    surnames: string;
    age: number;
}