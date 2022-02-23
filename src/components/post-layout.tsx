
import * as React from "react";
import * as styles from "./post-layout.module.scss";

const Layout = ({ children }) => (
  <section className={styles.section}>
    {children}
  </section>
);

export default Layout;
