import axios, { AxiosError } from "axios";

import { IExampleAPI } from "./index";
import { Example } from "../models";


function serialize(data: any): Example {
    return {
        id: data.id,
        data1: data.data1,
        data2: data.data2
    };
}


export class ExampleAPI implements IExampleAPI {
    get(id: number): Promise<Example | null> {
        return new Promise<Example | null>(
            (resolve, reject) => {
                axios.get(`/api/example/${id}`)
                    .then(resp => resolve(serialize(resp.data)))
                    .catch(err => {
                        const resp = err as AxiosError;

                        if (resp.code == "404") {
                            resolve(null);
                            return;
                        }

                        reject(err);
                    })
            }
        );
    }

    list(): Promise<Example[]> {
        return new Promise<Example[]>(
            (resolve, reject) => {
                axios.get("/api/example/")
                    .then(resp => {
                        const items = (resp.data as any[]).map(
                            data => serialize(data)
                        );

                        resolve(items);
                    })
                    .catch(err => {
                        reject(err);
                    });
            }
        );
    }
}
