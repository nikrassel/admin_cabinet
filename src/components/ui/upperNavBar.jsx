import React from "react"
import Profile from "./profile"
import "../../App.css"

const UpperNavBar = () => {
    return (
        <nav className="navbar text-bg-secondary mb-3">
            <div className="container-fluid">
                <h3 className="navbar-brand">Navbar</h3>
                <div className="d-flex">
                    <Profile />
                </div>
            </div>
        </nav>
    )
}

export default UpperNavBar
