import React from 'react';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';

const Index = () => {
  return (
    <div className="page-about">
      <Layout>
        <div className="hero-block-small hero-about" ></div>
        <div className="title-block">
          <div className="content-wrapper">
            <div className="title-content">
              <h1>About NRL</h1>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <Sidebar menu="about"></Sidebar>
          <div className="main-column">
            <section>
                <h2>The Naval Research Laboratory</h2>
                <p>The U.S. Naval Research Laboratory provides the advanced scientific capabilities required to bolster our country’s position of global naval leadership. Here, in an environment where the nation’s best scientists and engineers are inspired to pursue their passion, everyone is focused on research that yields immediate and long-range applications in the defense of the United States.</p>
            </section>
            <section>
                <h2>Mission</h2>
                <p>The U.S. Naval Research Laboratory (NRL) is the Department of the Navy‘s corporate laboratory, and it reports to the Chief of Naval Research. As the corporate laboratory of the Navy, NRL is the principal in-house component in the
                Office of Naval Research’s (ONR) effort to meet its science and technology responsibilities. NRL has had a long and fruitful relationship with industry as a collaborator, contractor, and through Cooperative Research and Development Agreements (CRADAs). NRL values this linkage and continues to develop it. NRL is an important link in the Navy Research, Development, and Acquisition (RD&A) chain. Through NRL, the Navy has direct ties with sources of fundamental
                ideas in industry and the academic community throughout the world and provides an effective coupling point to the R&D chain for ONR.</p>
            </section>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Index;
