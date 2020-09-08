import { h } from "preact";
import { observer } from "mobx-preact";

import { store } from "../../app";


export const Home = observer(() => {
    const renderItems = () => {
        if (!store.data.ready)
            return <p>Loading...</p>;
        else if (store.data.exampleItems.length === 0)
            return <p>There are no items yet, add some in the <a href="/admin/">admin panel</a>.</p>;

        return (
            <ul>
                {
                    store.data.exampleItems.map(
                        item => <li>{item.id}: {item.message}</li>
                    )
                }
            </ul>
        );
    }

    return (
        <div>
            <h1>Hello, world!</h1>
            <h3>Example items:</h3>
            {renderItems()}
        </div>
    );
});
