import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import React from "react"
import ReactDOM from "react-dom/client"
import ReactGA from "react-ga4"
import App from "./App"
import "./index.css"
import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

// Must be changed in host configs if deployed from github since .env is ignored
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID

if (GA4_MEASUREMENT_ID) {
    try {
        ReactGA.initialize(GA4_MEASUREMENT_ID)
    } catch (error) {
        console.warn("GA4 initialization failed:", error)
    }
} else {
    console.warn("GA4 measurement ID not found - analytics disabled")
}

root.render(
    <React.StrictMode>
        <MantineProvider
            theme={{ 
                colorScheme: "dark",
                other: {
                    backgroundColor: '#1a1b1e'
                }
            }}
            withGlobalStyles 
            withNormalizeCSS
        >
            <Notifications position="bottom-center" />
            <App />
        </MantineProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
