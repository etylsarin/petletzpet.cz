import * as React from "react"
import * as styles from "./post-layout.module.scss"

export const PostLayout = ({ posts }) => (
  <>
    {posts.map((Item, index) => (
      <section className={styles.section} key={index}>
        <Item />
      </section>
    ))}
  </>
)

export default PostLayout
