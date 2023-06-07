import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore } from "./store/createStore"

const root = ReactDOM.createRoot(document.getElementById("root"))
const store = createStore()
root.render(
    <>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
        ></link>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </>
)
