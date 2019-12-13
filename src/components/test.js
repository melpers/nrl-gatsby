import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
// import ExternalLink from "components/externalLink";

const _ = require(`lodash`);

function testParse(pages){
    let pagesObj = {};
    let path = "";

    for (var i = 0, len = pages.length; i < len; i++) {
        let page = pages[i].node.frontmatter;
        path = page.path.split("/");
        // console.log(path);
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
                        "path": page.path,
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

function objToArr(obj){
    let newArray = [];

    for (var key in obj) {
        let tempObj = {};
        tempObj.title = obj[key].title;
        tempObj.path = obj[key].path;
        tempObj.navTitle = obj[key].navTitle;
        tempObj.order = obj[key].order;
        tempObj.depth = obj[key].depth;
        
        if (typeof obj[key].children === "object") {
            tempObj.children = objToArr(obj[key].children);
        }

        newArray.push(tempObj);
    }

    return newArray;
}

// function compare(a, b) {
//     let optA = a.order;
//     let optB = b.order;

//     // Bubble the directory links to the bottom
//     if (optA === null) optA = 998;
//     if (optB === null) optA = 998;
//     if (optA === undefined) optA = 999;
//     if (optB === undefined) optB = 999;

//     let comparison = 0;

//     if (optA > optB) {
//         comparison = 1;
//     } else if (optA < optB) {
//         comparison = -1;
//     }

//     return comparison;
// }

function renderArray(arr){
    const menuItems = arr.map((node) => {

        const link = (
            <Link to={node.path}>{node.title}</Link>
        );

        let subMenu;
        if (node.children && node.children.length > 0) {
            subMenu = renderArray(node.children);
        }

        return (
            <li key={node.title} className={"nav-depth-" + node.depth}>
                {link}
                {subMenu}
            </li>
        );
    })

    return (
        <ul>
            {menuItems}
        </ul>
    )

}

function findParentNode(arr, uri){
    let result = [];

    for (var i = 0, len = arr.length; i < len; i++) {
        let node = arr[i];
        if (node.path === uri) {
            result = node.children;
            return result;
        }
        else if (node.children && node.children.length > 0) {
            result = findParentNode(node.children, uri);
        }
        if (result.length > 0) {
            break;
        }
    }
    return result;
}

function trimChildren(arr, targetUri, parentUri){
    console.log("Trim 1",arr);
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i].path === targetUri) {
            for (var j = 0, len2 = arr[i].children.length; j < len2; j++) {
                arr[i].children[j].children = [];
            }
        }
        else if (arr[i].path !== parentUri && arr[i].path !== targetUri){
            arr[i].children = [];
        }
    }
    console.log("Trim 2",arr);
    return arr;
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
    // console.log(testTree);
    const testArr = objToArr(testTree);
    // console.log(testArr);

    //let filteredArr = [];
    const testUri = "/areas-of-research/spacecraft-engineering";
    let parentUri = testUri.substr(0, testUri.lastIndexOf("/"));
    if (parentUri === "") {
        parentUri = "/";
    }
    console.log("ParentURI: ", parentUri);
    const filteredArr = findParentNode(testArr, parentUri);
    const trimmedArr = trimChildren(filteredArr, testUri, parentUri);

    // Sort the links by the order value
    // if (navtree) navtree.sort(compare);
    // console.log(navtree);

    return (
        <div>

        <pre>
            {/* {JSON.stringify(uri, null, 2)}
            <p>=========================</p>
            {JSON.stringify(pages, null, 2)}
            <p>=========================</p>
            {JSON.stringify(testTree, null, 2)}
            <p>=========================</p> */}
            {JSON.stringify(testArr, null, 2)}
            <p>=========================</p>
            {JSON.stringify(trimmedArr, null, 2)}
        </pre>
            { renderArray(testArr) }
            <p>For page {testUri}</p>
            { renderArray(trimmedArr) }
        </div>
    )
}

export default Test
