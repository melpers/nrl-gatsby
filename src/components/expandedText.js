import React, { useState } from "react"

const ExpandedText = ({children}) => {
    const [isOpen, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!isOpen);

    return (
        <div className="expanded-text-wrapper">
            <div className={isOpen ? "expanded-text expanded-text-open" : "expanded-text"}>
                {children}
            </div>
            <button className="expanded-text-button" type="button" onClick={toggleOpen}><span>{isOpen ? "Read Less" : "Read More"}</span></button>
        </div>
    )
}

export default ExpandedText
