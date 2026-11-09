# Esőerdők világa – Interaktív felfedező weboldal

**Élő oldal:** https://levivagymi.github.io/EsoErdo/
**Forráskód:** https://github.com/levivagymi/EsoErdo
**Projektmenedzsment:** Trello-tábla „Esőerdők világa” néven (a link a ClassRoomban található)

Interaktív, reszponzív weboldal az esőerdők világáról: élővilágukról, környezeti szerepükről és a fenntarthatóság fontosságáról. Iskolai csapatprojekt, 2026.

## Csapat és felelősségi körök

A munkát a feladatleírás „B) kiegyensúlyozott” modellje szerint osztottuk fel; a részletes közreműködés a commit-előzményben látható.

| | **Ádám Levente Dániel** (Tanuló A) | **Juhász Arnold** (Tanuló B) |
|---|---|---|
| Tervezés | főoldal ötlete, képi és szöveges anyagok | térkép, kvíz és interaktív modulok ötletei |
| HTML | főoldal, új aloldalak váza | vízi világ, élővilág hangjai, tippek oldal |
| Design | saját CSS, menü, főoldali elemek | Bootstrap-komponensek, lábléc, designterv, oldalvázlat |
| JavaScript | kvízlogika, döntési játék, magasságmérő | interaktív térkép (Leaflet), hanglejátszó, vállalás-lista |
| Dokumentáció | README, kutatási jegyzet | tesztelési jegyzőkönyv, commit-karbantartás |
| Tesztelés | mobilnézet | asztali nézet, W3C-validálás |

## Hogyan készült?

A fejlesztéshez AI-asszisztenst (Claude) is használtunk a kód és a szövegek megírásában. A munkát kisebb csomagokra bontottuk, ezeket felváltva néztük át, próbáltuk ki és commitoltuk a saját GitHub-fiókunkból; az érintett commitok üzenete jelzi az AI közreműködését (`Co-Authored-By`). Mindketten ismerjük a teljes projekt működését (lásd a „Hogyan működik?” részt).

## Oldalak és funkciók

| Oldal | Fájl | Tartalom és interakció |
|---|---|---|
| Főoldal | `index.html` | hero kép animációval, „Miért fontosak az esőerdők?” bevezető, számadatok, Bootstrap carousel, az esőerdő szintjei görgetésre mozduló magasságmérővel, 6 kártya gombokkal az aloldalakra, veszélyek, tippek |
| Térkép | `pages/terkep.html` | interaktív Leaflet-térkép 11 esőerdő-régióval, szűrő (trópusi / mérsékelt övi), régiólista, információs kártya, Egyenlítő és térítők |
| Élővilág | `pages/elovilag.html` | 14 állat- és növényfaj képpel és leírással, szűrő, 5 valódi állathang + esőerdő-hangulat |
| Vízi világ | `pages/vizivilag.html` | az Amazonas vízi élőlényei, fekete és fehér vizű folyók, elárasztott erdők |
| Kvíz | `pages/kviz.html` | 10 kérdés véletlen sorrendben, azonnali visszajelzés magyarázattal, pontszám és értékelés |
| Döntési játék | `pages/jatek.html` | 6 év, 6 döntési helyzet, 3 mutató (erdő, élővilág, helyiek jóléte), végső értékelés |
| Tippek | `pages/tippek.html` | 10 konkrét fenntarthatósági tipp, „Vállalom” kapcsolók mentéssel, szervezetek |

## A követelmények teljesítése

| Követelmény | Hol teljesül |
|---|---|
| Főoldal: fejléc címmel és logóval, menü, hero + szlogen, 2–3 bekezdéses bevezető, képek, lábléc | `index.html` |
| Interaktív térkép a világ esőerdeiről | `pages/terkep.html` (Leaflet.js) |
| Állat- és növényvilág képekkel, leírásokkal, hangeffektekkel | `pages/elovilag.html` |
| Kvízmodul 5–10 kérdéssel és pontszámmal | `pages/kviz.html` (10 kérdés) |
| Fenntarthatósági tippek (legalább 4–5) | `pages/tippek.html` (10 tipp) |
| Opcionális döntési játék | `pages/jatek.html` |
| Minimum 5–6 oldal, egységes menü és lábléc mindenhol | 7 oldal, azonos menü és lábléc (szerzők, évszám, GitHub-link) |
| HTML5 szemantika (header, nav, main, section, article, footer) | minden oldalon |
| Saját CSS (`style.css`), animációk, reszponzív megjelenés | `style.css` |
| Bootstrap 5: navbar, grid, kártyák, carousel, gombok | Bootstrap 5.3.8 |
| Különálló JavaScript (`script.js`), működő interaktív elemek | `script.js` |
| Mappastruktúra: `index.html`, `style.css`, `script.js`, `img/`, `pages/` | lásd lent |
| Hibátlan HTML és CSS (W3C), nincs konzolhiba, nincs 404 | lásd `docs/teszteles.md` |
| GitHub Pages | https://levivagymi.github.io/EsoErdo/ |

## Technológiák

- HTML5, CSS3 (saját `style.css`), JavaScript (ES2020, külön `script.js`)
- [Bootstrap 5.3.8](https://getbootstrap.com/docs/5.3/) és Bootstrap Icons 1.13.2 (CDN, SRI-ellenőrzéssel)
- [Leaflet 1.9.4](https://leafletjs.com/) interaktív térkép, [OpenStreetMap](https://www.openstreetmap.org/copyright) térképcsempék
- Google Fonts: Varela
- Verziókezelés: Git + GitHub, közzététel: GitHub Pages

## Mappastruktúra

```
EsoErdo/
├── index.html          főoldal
├── style.css           saját stíluslap (minden oldalhoz)
├── script.js           saját JavaScript (minden oldalhoz)
├── pages/              aloldalak: terkep, elovilag, vizivilag, kviz, jatek, tippek
├── img/                képek WebP formátumban (img/elovilag/: a fajok képei)
├── audio/              állathangok MP3-ban
├── vendor/leaflet/     a Leaflet térkép stíluslapja
└── docs/               designterv, oldalvázlat, kutatási jegyzet, tesztelési jegyzőkönyv
```

## Futtatás

- Online: https://levivagymi.github.io/EsoErdo/
- Helyben: a mappában indíts egy egyszerű webszervert, például `python -m http.server 8000`, majd nyisd meg a http://localhost:8000 címet. Az `index.html` dupla kattintással is megnyílik, de a térkép csempéihez internet és webszerver kell.

## Hogyan működik? (a `script.js` részei)

Minden funkció egy külön `init…()` függvény, amely csak azon az oldalon fut le, ahol a hozzá tartozó HTML-elem megtalálható.

- **Magasságmérő** (`initMagassagmero`): `IntersectionObserver` figyeli, melyik erdőszint van a képernyő közepén, és ehhez igazítja a jelölőt.
- **Térkép** (`initTerkep`): az `ESOERDO_REGIOK` tömbből készülnek a Leaflet-jelölők, a régiólista és az információs kártya; a szűrő elrejti vagy megmutatja a jelölőket.
- **Élővilág** (`initFajSzuro`, `initHangok`): a kártyák `data-tipus` attribútuma alapján szűr; egyetlen közös `Audio` objektum játssza le a gomb `data-hang` attribútumában megadott hangot, a lejátszási hibát pedig kezeli.
- **Kvíz** (`initKviz`): a `KVIZ_KERDESEK` tömbben minden kérdés első válasza a helyes; a program összekeveri a kérdéseket és a válaszokat, számolja a pontot, és a végén értékel.
- **Döntési játék** (`initJatek`): a `JATEK_HELYZETEK` tömb hat helyzetét játssza le; minden döntés módosítja a három mutatót (0–100), a végén a mutatók alapján értékel.
- **Tippek** (`initVallalasok`): a bekapcsolt vállalásokat a böngésző `localStorage`-ába menti (hibakezeléssel), és frissíti a folyamatjelzőt.

## Fejlesztési napló (a commit-előzmény alapján)

| Dátum | Fázis |
|---|---|
| 2026. 10. 05. | GitHub-repó létrehozása, első fájlok |
| 2026. 10. 12. | fejléc (v1.0), hero szekció, lábléc alapváza |
| 2026. 10. 19. | hero és UI/UX javítások, a növényzet és a vízi világ aloldal alapja, lábléc finomhangolás |
| 2026. 11. 02. | a főoldal teljes UI/UX átalakítása, térkép a láblécben |
| 2026. 11. 08–09. | alapstruktúra kész (mappák), Bootstrap 5, új aloldalak, interaktív térkép, élővilág hangokkal, kvíz, tippek, döntési játék, dokumentáció, tesztelés |

## Dokumentáció

- [Designterv](docs/designterv.md) – színek, betűtípus, elrendezés, komponensek
- [Oldalvázlat](docs/oldalvazlat.md) – drótváz asztali és mobil nézetben
- [Kutatási jegyzet](docs/kutatasi-jegyzet.md) – tények és források

## Képek és hangok forrása

- A saját gyűjtésű képek mellett a Wikimedia Commons szabad licencű fotóit és hangfelvételeit használtuk (CC0, közkincs, CC BY, CC BY-SA). Mindegyiket átméreteztük, illetve megvágtuk és tömörítettük (módosítva).
- A fajok képeinek és a hangoknak a szerzőit és licenceit az Élővilág oldal alján lévő „Képek és hangok forrása” rész sorolja fel; a fejlécképek forrása közvetlenül a képen olvasható.
- Fejlécképek: *Aerial view of the Amazon Rainforest* – lubasi (CC BY-SA 2.0); *Sobrevoo em Rondônia* – Bruno Kelly / Amazônia Real (CC BY 2.0); *Mangrove young plant* – Wilfredor (CC0); *006 Toco toucan* – Giles Laurent (CC BY-SA 4.0); *Arapaima (Arapaima gigas)* – Cliff (CC BY 2.0).
- Térkép: © OpenStreetMap-közreműködők, Leaflet (BSD-2-Clause).
