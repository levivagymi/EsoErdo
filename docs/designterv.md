# Designterv – Esőerdők világa

A weboldal egységes, természetközeli megjelenésének szabályai: színek, betűtípus, elrendezés, komponensek, képek és mozgás. A `style.css` minden értéke (szín, betűméret, térköz, lekerekítés, időtartam) a fájl elején definiált **tokenekből** (CSS-változókból) jön, így egy helyen módosítható.

## 1. Színpaletta

Az oldal **három fő színre** épül, ezeket néhány kiegészítő árnyalat egészíti ki. A kiemelőszín egyetlen szín, a zsálya: ez jelöli a fő gombot, az aktív és a kiválasztott állapotot, a fókuszkeretet és a haladást. Minden más semleges.

| Szerep | Szín | CSS-változó | Hol használjuk |
|---|---|---|---|
| **1. fő szín – erdőzöld** | `#333d29` | `--charcoal-brown` | az oldal háttere |
| **2. fő szín – zsálya** (kiemelőszín) | `#c2c5aa` | `--dry-sage` | törzsszöveg; teli fő gomb, aktív menüpont, kiválasztott állapot, fókuszkeret, kvíz- és vállalássáv |
| **3. fő szín – khaki** | `#a68a64` | `--camel` | a talajszint magasságának kiemelése |
| kiegészítő – halvány | `#eef0e1` | `--ink` | címsorok, kiemelt szöveg, a játék mutatói |
| kiegészítő – halvány olíva | `#a4ac86` | `--dry-sage-2` | másodlagos szöveg a háttéren, gombok és kapcsolók kerete |
| kiegészítő – sötét moha | `#1f2518` | `--deep-moss` | menüsáv, lábléc, gombfeliratok világos gombon |
| kiegészítő – kártya | `#414833` | `--ebony` | kártyák, dobozok háttere |
| kiegészítő – olíva | `#656d4a` | `--dusty-olive` | trópusi jelölő a térképen, alsó lombkoronaszint |
| kiegészítő – dióbarna | `#582f0e` / `#7f4f24` | `--dark-walnut` / `--saddle-brown` | szintek kiemelése, Egyenlítő-vonal, mérsékelt övi jelölő |
| állapot – helyes | `#a9c48f` | `--success` | csak a kvíz helyes válaszán |
| állapot – hibás | `#8a3b2a` | `--danger` | csak a kvíz hibás válaszán |

**Kontraszt (WCAG 2.1 AA: normál szöveghez legalább 4,5:1, nagy szöveghez és kerethez legalább 3:1):**

| Szöveg / háttér | Arány | Megfelel? |
|---|---|---|
| zsálya `#c2c5aa` / erdőzöld `#333d29` | 6,4 : 1 | igen |
| zsálya `#c2c5aa` / kártya `#414833` | 5,4 : 1 | igen |
| halvány `#eef0e1` / erdőzöld `#333d29` | 9,9 : 1 | igen |
| sötét moha `#1f2518` / zsálya `#c2c5aa` (teli gomb) | 8,9 : 1 | igen |
| halvány olíva `#a4ac86` / erdőzöld `#333d29` (másodlagos szöveg) | 4,8 : 1 | igen |
| halvány olíva `#a4ac86` / kártya `#414833` | 4,0 : 1 | szövegnek nem, ezért kártyán csak keretként (min. 3:1) használjuk |
| halvány `#eef0e1` / olíva `#656d4a` (alsó szint, térképcímke) | 4,7 : 1 | igen |
| sötét moha `#1f2518` / helyes `#a9c48f` | 8,2 : 1 | igen |
| halvány `#eef0e1` / hibás `#8a3b2a` | 6,6 : 1 | igen |
| khaki `#a68a64` / sötét moha `#1f2518` (talajszint) | 4,8 : 1 | igen |

Áttetszőséggel (`opacity`) nem halványítunk szöveget, és szöveg képre csak tömör hátterű címkében kerül (a képek forrásmegjelölése). A korábbi kék színvilágot a Vízi világ oldalról kivettük, hogy az egész oldal egységes legyen.

## 2. Betűtípus

- **Varela** (Google Fonts) az egész oldalon: barátságos, jól olvasható, letisztult talpatlan betű. Egyetlen (400-as) súlya van, ezért álfélkövért nem használunk: a kiemelést a halványabb, világosabb szín (`--ink`) adja.
- Hét betűméret-token (`--text-xs` … `--text-3xl`, a főoldal főcímén `--text-display`), oldalanként legfeljebb hét méret. A méretek a képernyőhöz igazodnak (CSS `clamp()`): a törzsszöveg 16–18 px, az aloldalak főcíme 36–60 px, a főoldal főcíme 48–104 px.
- Sorköz: 1,6 (szövegek), 1,05–1,25 (címek). A 32 px feletti címek betűköze −0,015em, a kis, nagybetűs címkéké +0,04em.
- A változó és oszlopba rendezett számok (pontszám, mutatók, számadatok) azonos szélességű számjegyekkel jelennek meg (`tabular-nums`).

## 3. Elrendezés

- A tartalom legfeljebb 1200 px széles, két oldalt 20–64 px margóval.
- **Bootstrap 5 grid**: a kártyák mobilon egy, táblagépen kettő, asztali gépen három (vagy négy) oszlopban állnak (`row-cols-*`).
- Töréspontok a Bootstrapéhez igazítva: 576 px, 768 px, 992 px, 1200 px.
- **Fejléc:** lebegő, tömör (sötét moha) menüsáv; alatta osztott hero: balra cím, szlogen és gomb, jobbra lekerekített keretben a nagy kép, amely a 12 oszlopból 7-et foglal el (992 px felett). Mobilon a kép a szöveg alá kerül.
- **Csoportosítás térközzel:** a csoportokon belül kisebb, a csoportok között legalább kétszer akkora térköz; egy dobozon egyetlen elválasztó eszköz (háttérszín vagy keret, nem mindkettő). Vonal csak táblázatszerű soroknál van.
- **Logikus út:** bevezető → információ → interakció → lezárás. Minden oldal végén egy „Következő lépés” blokk visz tovább; a főoldalon ez a térképre mutat.
- **Lábléc** minden oldalon azonos: Rólunk (szerzők), Oldalak, Kapcsolat (GitHub-projekt), térkép, alatta © 2026.

## 4. Komponensek

| Komponens | Hol | Megjegyzés |
|---|---|---|
| Navbar (Bootstrap) | minden oldal | mobilon lenyíló menü, aktív menüpont kiemelve (`aria-current="page"`) |
| Kártyák (Bootstrap card) | főoldal, élővilág, vízi világ, tippek, térkép, kvíz, játék | lekerekített sarkok, keret nélkül; nincs hover-effekt. Csak a főoldali témakártyák kattinthatók (az egész kártya egy link), ezek háttere hoverre kissé világosodik |
| Carousel (Bootstrap) | főoldal – „Az esőerdő arcai” | 5 kép, a felirat a kép alatt, tömör háttéren; automatikus lapozás nélkül |
| Gombok | mindenhol | `.btn-esoerdo` (teli): nézetenként egyetlen fő művelet; `.btn-outline-esoerdo` (körvonalas): másodlagos művelet, a „Következő lépés” gombjai is |
| Progress sáv | kvíz, tippek, játék | haladás és vállalások zsályával, a játék három mutatója semleges halvány színnel |
| List group | térkép | régiólista |
| Form switch | tippek | „Vállalom” kapcsolók, érintve 44 px magas sorral |
| Hanggombok | élővilág | betöltés közben forgó jel és rögzített szélesség, lejátszás közben „Leállítás”, hibánál teendőt mondó üzenet |

Ikon csak ott van, ahol jelentést hordoz (pl. a fajkártyák szint- és helyszíncímkéje, a kvíz pipa- és x-jele, a lábléc elérhetőségei); dekoratív ikonokat és színes ikoncsempéket nem használunk. Minden ikon a Bootstrap Icons készletből való.

## 5. Képek

- Természetfotók (erdő, folyók, állatok, növények); a saját képek mellett a Wikimedia Commons szabad licencű fotói, forrásmegjelöléssel.
- **WebP** formátum, a felhasználás helyéhez igazított méretben (800, 1280, 1920 px), `srcset`-tel és lusta betöltéssel (`loading="lazy"`).
- Minden kép beszédes `alt` szöveget kapott; a csak díszítő logó `alt=""`.

## 6. Mozgás és animációk

Csak a látogató lépésére reagáló, visszajelző mozgás van: legfeljebb 200 ms, csak átlátszóság (`opacity`) és elmozdulás (`transform`), túllendülés nélkül.

- A kvíz válasza és a játék következménye 200 ms alatt jelenik meg (enyhe beúszás).
- A kvíz, a tippek és a játék folyamatsávjai a lépés után 200 ms alatt nőnek (oldalbetöltéskor nem mozognak).
- A galéria lapozása, a mobilmenü lenyílása és a gombok színváltása 150–200 ms.
- A szintek résznél a magasságmérő jelölője görgetésre átcsúszik az aktuális szinthez.
- Nincs oldalbetöltési animáció, hover-re emelkedő kártya vagy nagyítódó kép.
- **Csökkentett mozgásnál** (`prefers-reduced-motion`) minden átmenet azonnali.

## 7. Akadálymentesség

- Ugrólink („Ugrás a tartalomra”) minden oldalon; jól látható, 2 px-es zsálya fókuszkeret 2 px távolsággal (a világos térképen sötét).
- A kvíz, a térkép, a tippek, a hangok és a játék változásait `aria-live` régiók olvassák fel.
- Az információt nem csak szín hordozza: a kvízben pipa vagy x ikon és szöveg is jelzi a helyes választ, a játékban számok mutatják a változást.
- Érintőképernyőn minden kattintható elem legalább 44 × 44 px.
