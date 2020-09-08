import { Store } from "./store";

import { IExampleAPI } from "./api";
import { ExampleAPI } from "./api/example";


interface API {
    example: IExampleAPI;
}


const store = new Store();
const api: API = {
    example: new ExampleAPI()
};

Promise.all([
    // TODO: Do initial data loading here.
    api.example.list().then(items => store.addExampleItems(items)),
]).then(() => store.setAsReady());


export {
    store
};
