import React from "react";
import LogOut from "./LogOut";

function Header() {
    
    return(
        <header className="border-b flex-box justify-between">

            <span className="font-bold text-xl">
                Skill Assessment
            </span>
            
            <LogOut/>
        </header>
    )
}

export default Header;