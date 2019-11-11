import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import ExternalLink from "components/externalLink";

const Sidebar = ({menu}) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    header {
                      navigation {
                            items {
                                type
                                text
                                link
                                depth
                            }
                            title
                        }
                    }
                }
            }
        }
    `)

    // Pick out the menu we want from the full menu tree
    const navigation = data.site.siteMetadata.header.navigation;
    let activeMenu = false;
    for (var i=0; i < navigation.length; i++) {
        if (navigation[i].title.toLowerCase() === menu.toLowerCase()) {
            activeMenu = navigation[i];
            break;
        } 
    }

    return (
        <div className="sidebar-block">
            <ul className={"sidebar-menu sidebar-menu-"+menu}>
                {activeMenu.items.map( (item, idx) => (
                    <>
                    {item.type === 'internal'
                        ?
                        <li key={idx} className={"depth-" + item.depth}><Link to={item.link}>{item.text}</Link></li>
                        :
                        <li key={idx} className={"depth-" + item.depth}><ExternalLink to={item.link}>{item.text}</ExternalLink></li>
                    }
                    </>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
