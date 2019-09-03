import React from "react"

const Sidebar = (props) => {
    const menu = props.menu;
    return (
        <div className="sidebar-block">
            <ul className={"sidebar-menu sidebar-menu-"+menu}>
                <li className="depth-0"><a href="/about">About</a></li>
                <li className="depth-1"><a href="/about">Mission</a></li>
                <li className="depth-0"><a href="/about">Accomplishments</a></li>
                <li className="depth-0"><a href="/about">Leadership</a></li>
                <li className="depth-0"><a href="/about">History</a></li>
            </ul>
        </div>
    )
}

export default Sidebar
