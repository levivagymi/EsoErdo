# Designterv – Esőerdők világa

A weboldal egységes, természetközeli megjelenésének szabályai: színek, betűtípus, elrendezés, komponensek, képek és mozgás.

## 1. Színpaletta

Az oldal **három fő színre** épül, ezeket néhány kiegészítő árnyalat egészíti ki. Minden színt CSS-változóként definiáltunk a `style.css` elején, így egy helyen módosítható.

| Szerep | Szín | CSS-változó | Hol használjuk |
|---|---|---|---|
| **1. fő szín – erdőzöld** | `#333d29` | `--charcoal-brown` | az oldal háttere |
| **2. fő szín – zsálya** | `#c2c5aa` | `--dry-sage` | törzsszöveg, aktív menüpont, elsődleges gombok |
| **3. fő szín – khaki** | `#a68a64` / `#b6ad90` | `--camel` / `--khaki-beige` | kiemelések, ikonok, keretek, folyamatjelzők |
| kiegészítő – halvány | `#eef0e1` | `--ink` | címsorok |
| kiegészítő – sötét moha | `#1f2518` | `--deep-moss` | lábléc, gombfeliratok világos gombon |
| kiegészítő – kártya | `#414833` | `--ebony` | kártyák, dobozok háttere |
| kiegészítő – olíva | `#656d4a` | `--dusty-olive` | „Növény” címke, trópusi jelölő a térképen |
| kiegészítő – dióbarna | `#582f0e` / `#7f4f24` | `--dark-walnut` / `--saddle-brown` | szintek kiemelése, mérsékelt övi jelölő |

**Kontraszt (WCAG 2.1 AA, normál szöveghez legalább 4,5:1 kell):**

| Szöveg / háttér | Arány | Megfelel? |
|---|---|---|
| zsálya `#c2c5aa` / erdőzöld `#333d29` | 6,5 : 1 | igen |
| halvány `#eef0e1` / erdőzöld `#333d29` | 9,9 : 1 | igen |
| sötét moha `#1f2518` / zsálya `#c2c5aa` (gombok) | 8,9 : 1 | igen |
| halvány olíva `#a4ac86` / erdőzöld `#333d29` (másodlagos szöveg) | 4,8 : 1 | igen |
| khaki `#a68a64` / erdőzöld `#333d29` | 3,5 : 1 | csak nagy szöveghez, ikonhoz, kerethez használjuk |

A korábbi kék színvilágot a Vízi világ oldalról kivettük, hogy az egész oldal egységes legyen.

## 2. Betűtípus

- **Varela** (Google Fonts) az egész oldalon: barátságos, jól olvasható, letisztult talpatlan betű.
- A betűméretek a képernyőhöz igazodnak (CSS `clamp()`): a törzsszöveg 16–18 px, a főcím mobilon kb. 48 px, asztali gépen akár 104 px.
- Sorköz: 1,6 (szövegek), 1,05–1,2 (címek).

## 3. Elrendezés

- A tartalom legfeljebb 1200 px széles, két oldalt 20–60 px margóval.
- **Bootstrap 5 grid**: a kártyák mobilon egy, táblagépen kettő, asztali gépen három (vagy négy) oszlopban állnak (`row-cols-*`).
- Töréspontok a Bootstrapéhez igazítva: 576 px, 768 px, 992 px, 1200 px.
- **Fejléc:** lebegő, áttetsző menüsáv; alatta osztott hero: balra cím, szlogen és gomb, jobbra lekerekített keretben nagy kép. Mobilon a kép a szöveg alá kerül.
- **Logikus út:** bevezető → információ → interakció → lezárás. Minden aloldal végén egy „Következő lépés” blokk visz tovább.
- **Lábléc** minden oldalon azonos: Rólunk (szerzők), Oldalak, Kapcsolat (GitHub-projekt), térkép, alatta © 2026.

## 4. Komponensek

| Komponens | Hol | Megjegyzés |
|---|---|---|
| Navbar (Bootstrap) | minden oldal | mobilon lenyíló menü, aktív menüpont kiemelve (`aria-current="page"`) |
| Kártyák (Bootstrap card) | főoldal, élővilág, vízi világ, tippek, térkép, kvíz, játék | lekerekített sarkok, hover-re megemelkednek |
| Carousel (Bootstrap) | főoldal – „Az esőerdő arcai” | 5 kép felirattal, automatikus lapozás nélkül |
| Gombok | mindenhol | `.btn-esoerdo` (teli), `.btn-outline-esoerdo` (körvonalas), `.button-57` (animált) |
| Progress sáv | kvíz, tippek, játék | haladás, vállalások, mutatók |
| List group | térkép | régiólista |
| Form switch | tippek | „Vállalom” kapcsolók |

## 5. Képek

- Természetfotók (erdő, folyók, állatok, növények); a saját képek mellett a Wikimedia Commons szabad licencű fotói, forrásmegjelöléssel.
- **WebP** formátum, a felhasználás helyéhez igazított méretben (800, 1280, 1920 px), `srcset`-tel és lusta betöltéssel (`loading="lazy"`).
- Minden kép beszédes `alt` szöveget kapott; a csak díszítő logó `alt=""`.

## 6. Mozgás és animációk

- Főoldal: a cím sorai alulról „emelkednek” be, a hero képkeret kinyílik, a kép lassan közelít.
- Hover-effektek: a kártyák megemelkednek, a képeik kissé felnagyítódnak, a gombok színe lágyan vált.
- A szintek résznél görgetésre mozduló magasságmérő mutatja, hol jár a látogató.
- Minden animáció csak akkor fut, ha a látogató nem kért **csökkentett mozgást** (`prefers-reduced-motion`).

## 7. Akadálymentesség

- Ugrólink („Ugrás a tartalomra”) minden oldalon, jól látható fókuszkeret.
- A kvíz, a térkép, a tippek és a játék változásait `aria-live` régiók olvassák fel.
- Az információt nem csak szín hordozza: a kvízben ✔/✘ jel és szöveg is jelzi a helyes választ, a játékban számok mutatják a változást.
