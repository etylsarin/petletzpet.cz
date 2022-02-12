import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Y2013 from "./2013.mdx";
import Y2014 from "./2014.mdx";
import Y2015 from "./2015.mdx";
import Y2016 from "./2016.mdx";
import Y2017 from "./2017.mdx";
import Y2018 from "./2018.mdx";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <section>
      <p><strong>2013</strong></p>
      <Y2013 />
    </section>
    <section>
      <p><strong>2014</strong></p>
      <Y2014 />
    </section>
    <section>
      <p><strong>2015</strong></p>
      <Y2015 />
    </section>
    <section>
      <p><strong>2016</strong></p>
      <Y2016 />
    </section>
    <section>
      <p><strong>2017</strong></p>
      <Y2017 />
    </section>
    <section>
      <p><strong>2018</strong></p>
      <Y2018 />
    </section>
  </Layout>
);

export default IndexPage;
