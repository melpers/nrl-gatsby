import React from "react"
import { Location } from '@reach/router';
import { cleanPreviewUri } from 'utils/clean-preview-uri';

const defaultState = {
    pageName: "page-home",
}
const ThemeContext = React.createContext(defaultState)

class ThemeProvider extends React.Component {
    render() {
        const { children } = this.props
        return (
            <Location>
                {({ location }) => {
                    /* Add a className to the context specific to each page to help with styling:
                        Prepend 'page' to the pathname,
                        then replace all "/" characters with "-",
                        then if the last character is a "-" remove it.
                    */

                    let pageName = "";

                    let route = location.pathname;
                    console.log('href: ' + location.href);
                    console.log('origin: ' + location.origin);
                    console.log('pathname: ' + location.pathname);
                    // Adjust the URI for the Federalist preview URLs
                    route = cleanPreviewUri(route);

                    if (route === ""){
                        pageName += "page-home";
                    }
                    else {
                        let routeParts = route.split("/");
                        for (let i = 0; i < routeParts.length; i++) {
                            if ( i === (routeParts.length - 1) ){
                                pageName += "path-" + routeParts[i] + " ";
                                pageName += "page-" + routeParts[i];
                            }
                            else {
                                pageName += "path-" + routeParts[i] + " ";
                            }
                        }
                    }
                    return (
                        <ThemeContext.Provider
                            value={{
                                pageName,
                            }}
                        >
                            {children}
                        </ThemeContext.Provider>
                    )
                }}
            </Location>
        )
    }
}

export default ThemeContext

export { ThemeProvider }
