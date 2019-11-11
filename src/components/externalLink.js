import React from 'react';

const ExternalLink = (props) => {
    return (
        <a href={props.to} target="_blank" rel="noopener noreferrer" className={props.className}>{props.children}</a>
    )
}

export default ExternalLink