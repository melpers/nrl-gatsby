import React from "react"
import { graphql, useStaticQuery } from "gatsby"

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
                    <li key={idx} className={"depth-" + item.depth}><a href={item.link}>{item.text}</a></li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
