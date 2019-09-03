import React from 'react';
import Layout from '../components/layout';

const Index = () => {
  return (
    <div className="page-home">
      <Layout page="home">
        <div class="content-wrapper">
          <div className="hero-block-large hero-home" >
            <div className="hero-text-block">
              <p>As a specialized laboratory for the U.S. Navy, we are driven to discover. Our research takes us from the depths of the ocean to the edges of the galaxy, producing powerful results that benefit both military and civilians alike.</p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Index;
