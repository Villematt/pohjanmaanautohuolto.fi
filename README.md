# Pohjanmaan Autohuolto

Tavallinen HTML-, CSS- ja JavaScript-sivusto, jonka voi julkaista Cloudflare
Workersiin tai Cloudflare Pagesiin. Sivusto ei tarvitse sovelluskehystä,
tietokantaa tai palvelimella ajettavaa Node.js-sovellusta.
Node.js on käytössä ainoastaan rakennus- ja julkaisutyökaluissa.

## Tiedostojen muokkaaminen

- `public/index.html`: sivun sisältö ja rakenne
- `public/styles.css`, `public/overrides.css`, `public/modal.css`: ulkoasu
- `public/script.js`: selaimessa toimiva JavaScript
- `public/volvo-workshop.png`: etusivun kuva
- `wrangler.jsonc`: Cloudflare Workers -asetukset

## Paikallinen esikatselu

Asenna Node.js 22 tai uudempi ja suorita projektikansiossa:

```sh
npm ci
npm run dev
```

Avaa komennon ilmoittama paikallinen osoite. Muutosten jälkeen käynnistä
komento uudelleen, jotta tiedostot kopioidaan uudestaan `dist`-kansioon.
Voit myös avata `public/index.html`-tiedoston suoraan selaimessa.

## Cloudflare Pages GitHubista

1. Avaa Cloudflaren **Workers & Pages** ja luo uusi **Pages**-projekti.
2. Yhdistä GitHub-repositorio `Veijopappa/pohjanmaanautohuolto.fi`.
3. Käytä seuraavia rakennusasetuksia:

| Asetus | Arvo |
| --- | --- |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Jätä tyhjäksi (repositorion juuri) |
| NODE_VERSION-ympäristömuuttuja | `22` |

Tallenna ja julkaise. Pages rakentaa uudet versiot automaattisesti, kun
`main`-haaraan pusketaan muutoksia. Pages käyttää rakennusasetusten
`dist`-kansiota; `wrangler.jsonc` on Workers-julkaisua varten.

## Cloudflare Workers GitHubista

Luo Workers & Pages -näkymässä uusi **Worker**, yhdistä sama GitHub-repositorio
ja valitse `main`-haara. Käytä Worker-nimeä `pohjanmaanautohuolto`, joka vastaa
`wrangler.jsonc`-tiedoston nimeä.

| Asetus | Arvo |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | Repositorion juuri |
| NODE_VERSION-ympäristömuuttuja | `22` |

Wrangler julkaisee versionhallinnassa olevan `public`-kansion staattisina
tiedostoina. Erillistä Worker-JavaScript-käsittelijää tai erillistä build-
vaihetta ei tarvita Workers-julkaisussa. Tämä estää deploy-virheen, jossa
`dist`-kansiota ei ole vielä luotu.

Vaihtoehtoisesti voit julkaista Workersiin omalta koneeltasi:

```sh
npm ci
npx wrangler login
npx wrangler deploy
```

## Tarkistus ennen julkaisua

```sh
npm run check
```

Komento tarkistaa JavaScriptin syntaksin, paikalliset HTML-tiedostoviittaukset,
rakentaa sivuston ja tarkistaa Workers-julkaisun ilman varsinaista julkaisua.

## Ajanvarauslomake

Nykyinen soittopyyntölomake on käyttöliittymädemo: se näyttää kuittauksen,
mutta ei lähetä tai tallenna tietoja. Cloudflareen julkaiseminen ei lisää
lomakkeeseen lähetystoimintoa. Oikea lomakelähetys tarvitsee erillisen
palvelun tai Worker-/Pages Functions -toteutuksen. Puhelin- ja sähköpostilinkit
toimivat sellaisinaan.

## Cloudflaren ohjeet

- [Staattinen HTML Cloudflare Pagesissa](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
