import * as React from "react"
import { Link } from "gatsby"

import { Seo } from "../components/seo"

const NotFoundPage = () => (
  <>
    <header className="hero">
      <div className="wrap">
        <h1 className="hero-title">Stránka nenalezena</h1>
      </div>
    </header>
    <div className="wrap">
      <p>
        Omlouváme se, ale požadovaná stránka neexistuje. Web jsme předělali a
        každý přešlap má teď vlastní stránku.
      </p>
      <p>
        <Link to="/" className="button">
          Všechny přešlapy
        </Link>
      </p>
    </div>
  </>
)

export default NotFoundPage

export const Head = ({ location }) => (
  <Seo title="Stránka nenalezena" pathname={location.pathname} noindex />
)
