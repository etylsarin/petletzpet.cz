# petletzpet.cz

**Pět let zpět** — přehled největších přešlapů **Miloše Zemana** v roli prezidenta (2013–2023) na časové ose. Každý přešlap má vlastní podstránku se souvislostmi, reakcemi, postojem Hradu, dohrou a odkazy na zdroje. K tématu jsou doporučené knihy s partnerskými odkazy do Knih Dobrovský.

Web běží na [Gatsby](https://www.gatsbyjs.com/) a je nasazený na GitHub Pages (doména v [static/CNAME](./static/CNAME), aby ji každé nasazení zachovalo). Sesterský web: [nasdilejneztozakazou.cz](https://www.nasdilejneztozakazou.cz/) (kauzy Andreje Babiše).

## Pravidla pro obsah

1. **Každé faktické tvrzení musí mít odkaz na zdroj.** Nic si nevymýšlíme. Wikipedie není zdroj.
2. Preferované zdroje: redakce s právní odpovědností (ČT24, iROZHLAS, ČTK, Seznam Zprávy, Deník N, Aktuálně.cz, Respekt…), soudy a úřady.
3. **Presumpce neviny.** Dokud soud pravomocně nerozhodne, píšeme o podezření/obvinění a uvádíme, kdo ho vznesl. U každého přešlapu je i postoj Miloše Zemana nebo Hradu.
4. Když se věc posune, stránka se aktualizuje a posune se pole `updated`.

## Struktura

| Cesta                                                    | Co obsahuje                                                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [src/preslapy/](./src/preslapy/)                         | **Jeden přešlap = jeden soubor MDX.** Název souboru je URL: `novicok.mdx` → `/preslapy/novicok/`             |
| [src/templates/preslap.tsx](./src/templates/preslap.tsx) | Šablona přešlapu (titulek na fotce, datum, témata, knihy, související přešlapy, předchozí/další)             |
| [src/templates/tema.tsx](./src/templates/tema.tsx)       | Přehled přešlapů jednoho tématu na `/tema/<id>/`                                                             |
| [src/pages/](./src/pages/)                               | Úvodní stránka s časovou osou (nejnovější rok nahoře), `/knihy/`, `/o-webu/` a 404                           |
| [src/data/tags.ts](./src/data/tags.ts)                   | Témata (`ustava`, `milosti`, `cina`, `rusko`…) — každé použité má vlastní stránku                            |
| [src/data/books.json](./src/data/books.json)             | Knihy (odkaz do Knih Dobrovský, popis); přešlapy u knihy se berou z pole `books` v MDX                       |
| [src/data/affiliate.ts](./src/data/affiliate.ts)         | **Nastavení partnerského programu** Knih Dobrovský (CJ)                                                      |
| [src/data/resources.ts](./src/data/resources.ts)         | Doporučené důvěryhodné zdroje (úvodní stránka, O webu, patička)                                              |
| [src/components/](./src/components/)                     | Layout, SEO (`<head>`, JSON-LD), karty knih, komponenty dostupné v MDX                                       |
| [src/styles/](./src/styles/)                             | Globální styly (karmínová lišta, Georgia, fotka Miloše Zemana v záhlaví) a styly stránek                    |

### Nový přešlap

Vytvořte `src/preslapy/<slug>.mdx` (slug bez diakritiky, s pomlčkami):

```mdx
---
title: "Novičok: Zeman tvrdil, že se jed vyráběl v Česku" # H1 a <title>, max. ~60 znaků
navTitle: "Novičok" # krátký název do časové osy a navigace
description: "…" # meta description, 120–160 znaků
date: "2018-05-03" # neznámý den → 1. den měsíce (stránka pak ukáže jen měsíc)
tags: ["rusko", "vyroky"] # viz src/data/tags.ts
books: ["rudy-zeman"] # id z src/data/books.json
related: ["zpochybneni-vrbetic"] # volitelné; zbytek se doplní podle společných témat
updated: "2026-09-30"
---

Úvodní odstavec.

## Co se stalo

## Co na to Miloš Zeman

## Jak to dopadlo

## Zdroje

- [Titulek článku](https://…) — ČT24, 3. 5. 2018
```

- Odkaz na jiný přešlap: `[Novičok](/preslapy/novicok/)`.
- `<BookLink id="…" />` vypíše název knihy jako partnerský odkaz. Neznámé `id` shodí build.
- V MDX nepoužívejte HTML komentáře ani samotné znaky `{`, `}`, `<`.

## Partnerský program Knih Dobrovský

Stejné nastavení jako na nasdilejneztozakazou.cz: program běží přes **CJ (Commission Junction)**. CJ přiděluje ID (`CJ_PID`) každému webu zvlášť — přidejte petletzpet.cz jako další web ve stejném účtu CJ, pak doplňte `CJ_PID` a `CJ_AID` v [src/data/affiliate.ts](./src/data/affiliate.ts) a web znovu nasaďte. Do té doby vedou odkazy přímo do obchodu. Odkazy mají `rel="sponsored"`, parametr `sid` s adresou stránky a kliky se v Google Analytics zaznamenávají jako událost `affiliate_click`.

## SEO

- Každá stránka má vlastní `<title>`, meta description, canonical, Open Graph a Twitter tagy (Gatsby Head API).
- JSON-LD: `WebSite` + `Organization` všude, `Article` + `BreadcrumbList` u přešlapů, `CollectionPage` + `ItemList` na úvodní stránce a stránkách témat, `Book` na stránce knih.
- `sitemap-index.xml` s `lastmod` podle pole `updated`; 404 a stránka z `gatsby-plugin-offline` mají `noindex`.

## Vývoj

```shell
yarn install
yarn develop   # http://localhost:8000
yarn build     # produkční build do public/
yarn serve     # náhled produkčního buildu
yarn deploy    # build + publikace na gh-pages
yarn format    # prettier
```

## Licence

Viz [LICENSE](./LICENSE).
