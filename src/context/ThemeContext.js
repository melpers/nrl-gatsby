import React from "react"
import { Location } from '@reach/router';

const defaultState = {
    dark: false,
    toggleDark: () => {},
}

const ThemeContext = React.createContext(defaultState)

// Getting dark mode information from OS
const supportsDarkMode = () => window.matchMedia("(prefers-color-scheme: dark)").matches === true

class ThemeProvider extends React.Component {
    state = {
        dark: false,
    }

    toggleDark = () => {
        let dark = !this.state.dark
        localStorage.setItem("dark", JSON.stringify(dark))
        this.setState({ dark })
    }

    componentDidMount() {
        // Getting dark mode value from localStorage
        const lsDark = JSON.parse(localStorage.getItem("dark"))
        if (lsDark !== null) {
            this.setState({ dark: lsDark })
        } else if (supportsDarkMode()) {
            this.setState({ dark: true })
        }
    }

    render() {
        const { children } = this.props
        const { dark } = this.state
        return (
        <Location>
            {({ location }) => {
                /* Add a className to the context specific to each page to help with styling:
                    Prepend 'page' to the pathname,
                    then replace all "/" characters with "-",
                    then if the last character is a "-" remove it.
                */
                let pageName = "page" + location.pathname.replace(/\//g, '-').replace(/-$/, '');
                if (pageName === "page") {
                    pageName = "page-home"
                }
                return (
                    <ThemeContext.Provider
                        value={{
                            dark,
                            toggleDark: this.toggleDark,
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
