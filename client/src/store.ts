import { action, observable } from "mobx";

import { Example } from "./models";


/**
 * The structure of the data store.
 */
export interface IStoreData {
    ready: boolean;
    exampleItems: Example[];
}

/**
 * The data store for the application.
 */
export class Store {
    readonly data: IStoreData;

    constructor() {
        this.data = observable({
            ready: false,
            exampleItems: [],
        });
    }

    @action.bound
    addExampleItems(items: Example[]) {
        this.data.exampleItems = this.data.exampleItems.concat(items);
    }

    @action.bound
    setAsReady() {
        this.data.ready = true;
    }
}
