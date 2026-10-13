# CROLIN - GitHub Pages

Jednostavna, statična web-stranica za projekt **CROLIN / Hrvatski interferometar za praćenje munja** (UIP-2026-9041). Ne koristi bazu, CMS ni instalaciju paketa - za objavu je dovoljno učitati ove datoteke u GitHub repozitorij.

## Što se uređuje najčešće

### Dodavanje rezultata ili publikacije

Otvori `data/publications.js` i dodaj novi objekt unutar uglatih zagrada, po uzoru na postojeći unos.

```js
{
  citation: "Šunjerga, A., ... (2027). Naslov rada. Časopis, 12(3), 1-10.",
  url: "https://doi.org/10.xxxx/xxxxx",
  linkLabel: "DOI"
}
```

Ako dodaješ više publikacija, odvoji objekte zarezom. Stranica ih automatski numerira.

### Dodavanje događaja

Otvori `data/events.js`, dodaj novi objekt po uzoru na postojeće unose i spremi. Događaj se automatski pojavi u odjeljku **Događaji**.

### Promjena novosti, teksta ili članova tima

Sve je u `index.html`. Tekst je raspoređen po jasno označenim odjeljcima: `Novosti`, `Istraživački tim`, `O projektu` i `Planirana infrastruktura`.

### CROLIN logotip

`assets/crolin-logo.svg` je originalni, namjerno jednostavan početni logotip: crna slova i munja umjesto slova **I**. Kasnije ga možeš zamijeniti samo tako da novu SVG/PNG datoteku spremiš pod istim imenom.

## Objavljivanje na GitHub Pages

1. Na GitHubu napravi novi **public** repozitorij, npr. `crolin`.
2. U repozitorij učitaj **sadržaj ove mape** (ne samu roditeljsku mapu): `index.html`, `styles.css`, `script.js`, `assets/` i `data/`.
3. U GitHub repozitoriju otvori **Settings → Pages**.
4. Pod **Build and deployment** odaberi **Deploy from a branch**.
5. Odaberi granu **main** i mapu **/(root)**, zatim klikni **Save**.
6. Za nekoliko minuta stranica će biti dostupna na:

   `https://TVOJ-GITHUB-USERNAME.github.io/crolin/`

7. Svaka kasnija izmjena koju pošalješ na granu `main` automatski će ažurirati stranicu.

Ako kasnije dobiješ vlastitu domenu, u postavkama GitHub Pages upiši je pod **Custom domain**. GitHub će prikazati točan DNS zapis koji treba proslijediti FESB-u / administratoru domene. Ne dodavati `CNAME` datoteku dok nemaš potvrđenu domenu.

## Sadržaj koji je siguran za početnu javnu objavu

U ovoj verziji već su objavljeni samo podaci primjereni javnoj projektnoj stranici:

- naziv projekta, šifra, voditelj, matična ustanova i razdoblje provedbe;
- opći znanstveni cilj, radni smjerovi i opće kategorije planirane opreme;
- članovi tima i njihove javne stručne uloge;
- javne vijesti, događaji i publikacije;
- nazivi institucija s kojima postoji stručna suradnja.

Namjerno nisu objavljeni naziv ili lokacija mjernog mjesta, vlasnik postrojenja, operativni raspored instrumenata, pristupni i mrežni podaci, neobjavljeni podaci te detaljne tehničke specifikacije. Ugovor također predviđa da javni sažetak isključuje financijske podatke, pa točan iznos i proračun nisu stavljeni na stranicu.

## Logotipi

Logotipi i oznake za FESB, HRZZ, međunarodne suradničke institucije te događaje nalaze se u `assets/` i `assets/logos/`. Stranica ih koristi lokalno, bez oslanjanja na vanjske datoteke.

## Lokalna provjera

Stranica je čisti HTML/CSS/JavaScript. Dvostruki klik na `index.html` otvorit će je lokalno u pregledniku; nije potrebno ništa instalirati.
