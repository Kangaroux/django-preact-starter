import { Example } from "../models";


export interface IExampleAPI {
    get(id: number): Promise<Example | null>;
    list(): Promise<Example[]>;
}
