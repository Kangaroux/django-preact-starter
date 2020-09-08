import { getCurrentUrl, Route, Router } from "preact-router";
import { h } from "preact";

import { Home } from "./components/views/Home";
import { Error } from "./components/views/Error";


const externalURL = new RegExp(`^/(admin|api|static)/`);


/**
 * The route used if no other routes matched.
 */
const DefaultRoute = () => {
    const url = getCurrentUrl();

    // Check if the URL should be handled by the SPA. If it's not handled, redirect to
    // the page, otherwise show a 404 error.
    if (externalURL.test(url)) {
        window.location.replace(url);
        return <div></div>;
    }

    return <Error code={404} />
}


export const Routes = () => {
    const handleRoute = () => {
        // Scroll up to the top of the window.
        window.scrollTo(0, 0);
    }

    return (
        <Router onChange={handleRoute}>
            <Route path="/" component={Home} />

            <Route default component={DefaultRoute} />
        </Router>
    );
}
