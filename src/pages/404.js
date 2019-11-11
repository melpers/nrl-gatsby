import React from "react"
import { Link } from "gatsby"

import Layout from 'components/layout';

const NotFound = () => {
    return (
        <div className="page-home">
            <Layout>
                <h1>Page Not Found</h1>
                <p><Link to="/">Home</Link></p>
            </Layout>
        </div>
    )
}

export default NotFound