import { action, observable } from "mobx";


/**
 * The structure of the data store.
 */
export interface IStoreData {
    ready: boolean;
}

/**
 * The data store for the application.
 */
export class Store {
    readonly data: IStoreData;

    constructor() {
        this.data = observable({
            ready: false,
        });
    }

    @action.bound
    setAsReady() {
        this.data.ready = true;
    }
}
