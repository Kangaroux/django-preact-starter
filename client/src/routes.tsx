import { Route, Router } from "preact-router";
import { h } from "preact";

import { Home } from "./components/views/Home";
import { Error } from "./components/views/Error";


export const Routes = () => {
    const handleRoute = () => {
        // Scroll up to the top of the window.
        window.scrollTo(0, 0);
    }

    return (
        <Router onChange={handleRoute}>
            <Route path="/" component={Home} />

            <Route component={() => <Error code={404} />} default />
        </Router>
    );
}
