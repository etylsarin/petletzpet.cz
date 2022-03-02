
import * as React from "react";
import * as styles from "./post-layout.module.scss";

export const PostLayout = ({ children }) => (
  <section className={styles.section}>
    {children}
  </section>
);

export default PostLayout;
