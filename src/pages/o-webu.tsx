import * as React from "react"
import { Link } from "gatsby"

import { Seo, siteNodeIds } from "../components/seo"
import { ResourceList } from "../components/resource-list"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const TITLE = "O webu: jak vzniká přehled přešlapů Miloše Zemana"
const DESCRIPTION =
  "Podle jakých pravidel vzniká přehled přešlapů Miloše Zemana, odkud bereme informace, jak fungují partnerské odkazy na knihy a kde si ověřit další zprávy."

const AboutPage = () => (
  <>
    <header className="hero">
      <div className="wrap">
        <p className="kicker">O webu</p>
        <h1 className="hero-title">Jak tenhle web vzniká</h1>
      </div>
    </header>

    <div className="wrap prose">
      <p>
        Pět let zpět připomíná, čeho všeho jsme byli svědky během deseti let
        Miloše Zemana na Pražském hradě (2013–2023). Každý přešlap má vlastní
        stránku: co se stalo, jak to kdo komentoval, co na to řekl sám prezident
        a jak to nakonec dopadlo.
      </p>

      <h2 id="pravidla">Pravidla, podle kterých píšeme</h2>
      <ol>
        <li>
          <strong>Každé faktické tvrzení má odkaz na zdroj.</strong> Co nejde
          doložit, na web nepatří.
        </li>
        <li>
          Vycházíme z redakcí, které nesou právní odpovědnost za to, co
          publikují (ČT24, iROZHLAS, ČTK, Seznam Zprávy, Deník N, Aktuálně.cz,
          Respekt…), a z rozhodnutí soudů a úřadů.
        </li>
        <li>
          <strong>Platí presumpce neviny.</strong> Dokud soud pravomocně
          nerozhodne, píšeme o podezření nebo obvinění a uvádíme, kdo je vznesl.
          U každého přešlapu najdete i to, jak se k němu postavil Miloš Zeman
          nebo Hrad.
        </li>
        <li>
          Když se něco změní (soud rozhodne, vyjdou nové informace),{" "}
          <strong>stránku aktualizujeme</strong>. Datum poslední aktualizace je
          u každého přešlapu.
        </li>
      </ol>

      <h2 id="jak-cist">Jak web číst</h2>
      <p>
        <Link to="/">Časová osa na úvodní stránce</Link> řadí přešlapy podle
        roku a měsíce, nejnovější nahoře. Přešlapy jsou navíc rozdělené do
        témat, jako jsou milosti, vztah k Číně a Rusku nebo spory o ústavu —
        každé téma má vlastní přehled.
      </p>

      <h2 id="partnerske-odkazy">Partnerské odkazy na knihy</h2>
      <p>
        Odkazy na <Link to="/knihy/">knihy o Miloši Zemanovi</Link> vedou do
        internetového knihkupectví Knihy Dobrovský a jsou{" "}
        <strong>partnerské (affiliate)</strong>. Když přes ně knihu koupíte,
        knihkupectví nám zaplatí malou provizi z ceny. Pro vás se cena nijak
        nemění.
      </p>
      <p>
        Provize pokrývají provoz webu. Na obsah nemají žádný vliv: knihy jsme
        vybrali proto, že se Zemanovu prezidentství věnují. Partnerské odkazy
        jsou v kódu stránky označené atributem <code>rel="sponsored"</code>.
      </p>

      <h2 id="overovani">Důvěryhodné zdroje: ověřujte si všechno — i nás</h2>
      <p>
        Než něco nasdílíte, ověřte si to. Tyhle weby doporučujeme pro ověřování
        informací i pro další čtení. Nejsou to zdroje, na které odkazujeme u
        jednotlivých přešlapů – tam citujeme přímo redakce, soudy a úřady.
      </p>
      <ResourceList />

      <h2 id="chyby">Našli jste chybu?</h2>
      <p>
        Zdroje občas zmizí nebo se věc posune dál, než stihneme zapsat. Pokud
        narazíte na nefunkční odkaz, zastaralou informaci nebo chybu,{" "}
        <a href="https://github.com/etylsarin/petletzpet.cz/issues">
          napište nám na GitHub
        </a>
        . Opravíme to — s odkazem na zdroj.
      </p>
    </div>
  </>
)

export default AboutPage

export const Head = ({ location }) => {
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)
  const url = `${site.siteUrl}/o-webu/`

  return (
    <Seo
      title={TITLE}
      description={DESCRIPTION}
      pathname={location.pathname}
      schema={[
        {
          "@type": "AboutPage",
          "@id": `${url}#webpage`,
          url,
          name: TITLE,
          description: DESCRIPTION,
          inLanguage: "cs-CZ",
          isPartOf: { "@id": ids.website },
        },
      ]}
    />
  )
}
