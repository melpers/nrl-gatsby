import React from 'react';

import Layout from 'components/layout';
import Test from 'components/test';
import Breadcrumbs from "components/breadcrumbs";

const Index = (props) => {

    return (
    <Layout
      pageMeta={{
        title: "Test Page",
      }}
    >
      <div className="title-block">
        <div className="content-wrapper">
          <div className="title-content">
            <h1>Test Page</h1>
            <Breadcrumbs uri={props.uri} title="Test Page"></Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <Test uri={props.uri}></Test>
      </div>
    </Layout>
  );
};

export default Index;
