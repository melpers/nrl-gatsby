import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
// import ExternalLink from "components/externalLink";

const _ = require(`lodash`);

function treeParse(pages){
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

function renderArray(arr, uri, depth){
    depth = typeof depth !== 'undefined' ? depth + 1 : 0;
    const menuItems = arr.map((node) => {

        let link;
        if (node.path === uri) {
            link = (
                <span className="sidebar-current-page">{node.navTitle ? node.navTitle : node.title}</span>
            );
        }
        else {
            link = (
                <Link to={node.path}>{node.navTitle ? node.navTitle : node.title}</Link>
            );
        }


        let subMenu;
        if (node.children && node.children.length > 0) {
            subMenu = renderArray(node.children, uri, depth);
        }

        return (
            <li key={node.title}>
                {link}
                {subMenu}
            </li>
        );
    })

    return (
        <ul className={"nav-depth-" + depth}>
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
    // Now sort the siblings & active children
    arr.sort(compare);
    for (var k = 0, len3 = arr.length; k < len3; k++) {
        if (arr[k].children.length > 0){
            arr[k].children.sort(compare);
        }
    }

    console.log(arr);
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

    // For the preview pages
    uri = uri.replace('preview/melpers/nrl-gatsby/v0.4/', '');

    const pages = data.allMarkdownRemark.edges;
    // const tree = parseLinksToTree(pages);
    // let navtree = buildTree(tree,uri);
    const navTree = treeParse(pages);
    // console.log(navTree);
    const navArr = objToArr(navTree);
    // console.log(navArr);

    // TODO: test page override if for the test page only. Remove this when converting to a real component.
    // if (uri === "/test") {
    //     uri = "/areas-of-research/spacecraft-engineering";
    // }

    let parentUri = uri.substr(0, uri.lastIndexOf("/"));
    if (parentUri === "") {
        parentUri = "/";
    }
    const filteredArr = findParentNode(navArr, parentUri);
    const trimmedArr = trimChildren(filteredArr, uri, parentUri);

    return (
        <div>

            <pre>
                {/* {JSON.stringify(uri, null, 2)}
                <p>=========================</p>
                {JSON.stringify(pages, null, 2)}
                <p>=========================</p>
                {JSON.stringify(navTree, null, 2)}
                <p>=========================</p>
                {JSON.stringify(navArr, null, 2)}
                <p>=========================</p>
                {JSON.stringify(trimmedArr, null, 2)} */}
            </pre>
            <p>Full Tree</p>
            { renderArray(navArr) }
            <p>For page {uri}</p>
            { renderArray(trimmedArr, uri) }
        </div>
    )
}

export default Test