import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import clasNames from "classnames";

import * as styles from "./page-layout.module.scss";

export const PageLayout = ({ children }) => {
  const { site: { siteMetadata }} = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  const TITLE = `${siteMetadata.title} | Největší přešlapy současného prezidenta na časové ose`;
  const DESC = siteMetadata.description;  

  return (
    <>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        title={TITLE}
        meta={[
          {
            name: `description`,
            content: DESC,
          },
          {
            property: `og:title`,
            content: TITLE,
          },
          {
            property: `og:description`,
            content: DESC,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:title`,
            content: TITLE,
          },
          {
            name: `twitter:description`,
            content: DESC,
          },
        ]}
      />
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>{TITLE}</h1>
        </header>
        <main className={clasNames(styles.main, 'zeman')}>
          {children}
        </main>
        <footer className={styles.footer}>
          <small>
            podporujeme: <a href="https://www.nasdilejneztozakazou.cz/">Sdílejte, než to zakážou! pravá tvář Andreje Babiše</a> a <a href="https://www.volby-kscm.cz/">Komunisti z kola ven</a>
          </small>
        </footer>
      </div>
    </>
  );
};

export default PageLayout;
