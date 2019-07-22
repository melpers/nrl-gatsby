import React from 'react';

const ExternalLink = (props) => {
    if (props.link.includes("http")) {
        return (
            <a href={props.link} target="_blank" rel="noopener noreferrer">{props.text}</a>
        )
    }
    else {
        return (
            <a href={props.link}>{props.text}</a>
        )
    }
}

export default ExternalLink