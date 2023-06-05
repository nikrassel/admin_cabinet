import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore } from "./store/createStore"

const root = ReactDOM.createRoot(document.getElementById("root"))
const store = createStore()
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
