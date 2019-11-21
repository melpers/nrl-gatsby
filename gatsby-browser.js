import "./src/styles/index.scss"
import "uswds_polyfills"

import React from "react"
import { ThemeProvider } from "./src/context/ThemeContext"
export const wrapRootElement = ({ element }) => (<ThemeProvider>{element}</ThemeProvider>)
