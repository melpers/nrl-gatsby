import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

// import ExternalLink from "components/externalLink";
import { parseLinksToTree } from 'utils/parse-links-to-tree';

function findNested(obj, value) {
    const objKey = "directory";
    const arrKey = "links";

    if (typeof obj == 'object') {
        if (obj[objKey] === value) {
            return obj[arrKey];
        } else {
            for (var i = 0, len = Object.keys(obj[arrKey]).length; i < len; i++) {
                if (obj[arrKey][i].directory){
                    var found = findNested(obj[arrKey][i], value);
                }
                if (found) {
                    // If the object was found in the recursive call, bubble it up.
                    return found;
                }
            }
        }
    }
}

function buildTree(tree,uri){
    console.log(uri);
    // Make sure we don't have a trailing slash
    var lastChar = uri.slice(-1);
    if (lastChar === '/') {
        uri = uri.slice(0, -1);
    }
    // Find the directory we need
    let targetDirectory = "/";
    let targetDirectoryArray = uri.split("/");
    console.log(targetDirectoryArray);
    if (targetDirectoryArray.length > 1){
        targetDirectory = targetDirectoryArray[targetDirectoryArray.length - 1];
    }
    console.log(targetDirectory);
    // Fetch the links
    let result = null;
    console.log(tree[0]);
    result = findNested(tree[0], targetDirectory);
    return result;
}

const Sidebar = ({uri}) => {
    const data = useStaticQuery(graphql`
         query {
            allMarkdownRemark(sort: {fields: [frontmatter___path], order: ASC}, filter: {frontmatter: {path: {ne: null}}}) {
                edges {
                    node {
                        frontmatter {
                            path
                            title
                            navTitle
                        }
                    }
                }
            }
        }
    `)

    const pages = data.allMarkdownRemark.edges;
    const tree = parseLinksToTree(pages);
    let navtree = buildTree(tree,uri);

    return (
        <>
        <pre>
            {JSON.stringify(pages, null, 2)}
            <p>=========================</p>
            {JSON.stringify(tree, null, 2)}
        </pre>
        {navtree !== undefined ? 
            <div className="sidebar-block">
                <ul className={"sidebar-menu"}>
                    {navtree.map( (item, idx) => (
                        <>
                        {item.path 
                            ?
                            <li key={idx}>
                                <Link to={item.path}>
                                    {item.navTitle ? item.navTitle : item.title }
                                </Link>
                            </li>
                            :
                            null
                        }
                        </>
                    ))}
                </ul>
            </div>
            :
            null
        }
        </>
    )
}

export default Sidebar
