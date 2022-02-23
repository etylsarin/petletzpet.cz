import * as React from "react";
import { Helmet } from "react-helmet";
import clasNames from "classnames";

import * as styles from "./page-layout.module.scss";

const TITLE = 'Pět let zpět | Největší přešlapy současného prezidenta na časové ose';
const DESC = 'Čeho všeho jsme byli svědky za posledních 5 let úřadování českého prezidenta na hradě? Nabízíme přehled novinových zpráv s největšími přešlapy na časové ose.';

const Layout = ({ children }) => (
  <>
    <Helmet
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
      script={[
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-1DTH85EV1J',
        },
        { 
          type: 'text/javascript', 
          innerHTML: 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments)};gtag("js", new Date());gtag("config", "G-1DTH85EV1J");',
        }
      ]}
    />
    <Helmet

      />
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>{TITLE}</h1>
      </header>
      <main className={clasNames(styles.main, 'zeman')}>
        {children}
      </main>
    </div>
  </>
);

export default Layout;
