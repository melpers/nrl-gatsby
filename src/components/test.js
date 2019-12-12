import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
// import ExternalLink from "components/externalLink";

// import { parseLinksToTree } from 'utils/parse-links-to-tree';
// import ExternalLink from './externalLink';

const _ = require(`lodash`);

// function findNested(obj, value) {
//     const objKey = "directory";
//     const arrKey = "links";

//     if (typeof obj == 'object') {
//         if (obj[objKey] === value) {
//             return obj[arrKey];
//         } else {
//             for (var i = 0, len = Object.keys(obj[arrKey]).length; i < len; i++) {
//                 if (obj[arrKey][i].directory){
//                     // *** Warning: Recusion Ahead ***
//                     var found = findNested(obj[arrKey][i], value);
//                 }
//                 if (found) {
//                     // If the object was found in the recursive call, bubble it up.
//                     return found;
//                 }
//             }
//         }
//     }
// }

// function buildTree(tree,uri){
//     // console.log(uri);
//     // Make sure we don't have a trailing slash
//     var lastChar = uri.slice(-1);
//     if (lastChar === '/') {
//         uri = uri.slice(0, -1);
//     }
//     // Find the directory we need
//     let targetDirectory = "/";
//     let targetDirectoryArray = uri.split("/");
//     // console.log(targetDirectoryArray);
//     if (targetDirectoryArray.length > 1){
//         targetDirectory = targetDirectoryArray[targetDirectoryArray.length - 1];
//     }
//     // console.log(targetDirectory);
//     // Fetch the links
//     let result = null;
//     // console.log(tree[0]);
//     result = findNested(tree[0], targetDirectory);
//     return result;
// }

function testParse(pages){
    let pagesObj = {};
    let path = "";

    for (var i = 0, len = pages.length; i < len; i++) {
        let page = pages[i].node.frontmatter;
        path = page.path.split("/");
        console.log(path);
        if (path.length === 2 && path[0] === "" && path[1] === "") {
            // Shift the redundant second index off for the first node
            path.shift();
        }
        path[0] = "home";

        let indexPath = "";
        for (var j = 0, len2 = path.length; j < len2; j++) {
            if (j === 0) {
                indexPath = path[j];
            }
            else {
                indexPath += ".children." + path[j];
            }

            if (j === (path.length - 1) ) {
                _.set(
                    pagesObj,
                    indexPath,
                    {
                        "title": page.title,
                        "navTitle": page.navTitle,
                        "order": page.order,
                        "depth": j,
                        "children": {}
                    }
                );
            }
        }
    }

    return pagesObj;
}

function compare(a, b) {
    let optA = a.order;
    let optB = b.order;

    // Bubble the directory links to the bottom
    if (optA === null) optA = 998;
    if (optB === null) optA = 998;
    if (optA === undefined) optA = 999;
    if (optB === undefined) optB = 999;

    let comparison = 0;

    if (optA > optB) {
        comparison = 1;
    } else if (optA < optB) {
        comparison = -1;
    }

    return comparison;
 }

function renderTree(tree){
    let result = "";
    // console.log('renderTree Call');
    // console.log(tree);
    for (var key in tree) {

        result += "<ul class='depth-" + tree[key].depth + "'>";
        result += "<li>" + tree[key].title + "</a></li>";

        if (typeof tree[key].children === "object") {
            result += renderTree(tree[key].children);
        }

        result += "</ul>";
    }
    return result;
}

function RenderTree(tree){
    let result = "";
    for (var key in tree) {

        result += "<ul class='depth-" + tree[key].depth + "'>";
        result += "<li>" + tree[key].title + "</a></li>";

        if (typeof tree[key].children === "object") {
            result += RenderTree(tree[key].children);
        }

        result += "</ul>";
    }
    return result;
}

function RenderComponent(obj) {
    // let objRoot = obj.obj.home;
    // console.log(objRoot);
    // console.log(objRoot.children);

    return (
        <React.Fragment>
            <Link to="/about">test link</Link>
        </React.Fragment>
    )
}


const Test = ({uri}) => {
    const data = useStaticQuery(graphql`
         query {
            allMarkdownRemark(sort: {fields: [frontmatter___path], order: ASC}, filter: {frontmatter: {path: {ne: null}}}) {
                edges {
                    node {
                        frontmatter {
                            path
                            title
                            navTitle
                            order
                        }
                    }
                }
            }
        }
    `)

    const pages = data.allMarkdownRemark.edges;
    // const tree = parseLinksToTree(pages);
    // let navtree = buildTree(tree,uri);

    const testTree = testParse(pages);
    console.log(testTree);

    // Sort the links by the order value
    // if (navtree) navtree.sort(compare);
    // console.log(navtree);

    let testing = "<link to='/about'>Linking?</Link>";

    return (
        <div>

        <pre>
            {JSON.stringify(uri, null, 2)}
            <p>=========================</p>
            {JSON.stringify(pages, null, 2)}
            <p>=========================</p>
            {JSON.stringify(testTree, null, 2)}
            <p>=========================</p>
        </pre>
            <div dangerouslySetInnerHTML={{ __html: renderTree(testTree) }}></div>
            <RenderTree tree={testTree.home} />
            <div dangerouslySetInnerHTML={{__html: testing}}></div>
        </div>
    )
}

export default Test
