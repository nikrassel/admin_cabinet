import React, { useState } from "react"

const Profile = () => {
    const [isOpen, setOpen] = useState(false)
    function toggleMenu() {
        setOpen((prevState) => !prevState)
    }
    // заменить р на линки
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">Name</div>
                <img
                    src="/img/Avatar.jpg"
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <p className="dropdown-item">Profile</p>
                <p className="dropdown-item">Logout</p>
            </div>
        </div>
    )
}

export default Profile
