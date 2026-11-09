# Oldalvázlat (drótváz) – Esőerdők világa

Két vázlat készült: a **főoldalé** és az **aloldalak közös sablonjáé**, mindkettő asztali és mobil nézetben. Mind a 6 aloldal (Térkép, Élővilág, Vízi világ, Kvíz, Játék, Tippek) a sablon szerint épül fel, csak a középső, interaktív rész különbözik.

## 1. Főoldal – asztali nézet

```
┌──────────────────────────────────────────────────────────────────────┐
│  ( [logó] Esőerdők világa    Főoldal Térkép Élővilág Vízi … Tippek ) │  ← lebegő menüsáv
├───────────────────────────────┬──────────────────────────────────────┤
│  ESŐERDŐK                     │ ╭──────────────────────────────────╮ │
│  VILÁGA            (h1)       │ │                                  │ │
│  Hol nőnek esőerdők, kik…     │ │   NAGY HERO KÉP (12-ből 7 oszlop)│ │
│  térkép 11 régióval, 14 faj…  │ │                                  │ │
│  [Nyisd meg a térképet] Hogy…?│ ╰──────────────────────────────────╯ │
├───────────────────────────────┴──────────────────────────────────────┤
│  Miért fontosak az esőerdők?   │  Csapadék / Hőmérséklet / Élővilág / │
│  3 bekezdés (7 mondat)         │  A legnagyobb  (számadatok)          │
├──────────────────────────────────────────────────────────────────────┤
│  Az esőerdő arcai   ‹ [ CAROUSEL – 5 kép felirattal ] ›   ● ○ ○ ○ ○  │
├──────────────────────────────────────────────────────────────────────┤
│  Az esőerdő szintjei   │magasság-│  Óriásfák → Lombkorona →          │
│                        │ mérő    │  Alsó szint → Talaj (görgetésre)  │
├──────────────────────────────────────────────────────────────────────┤
│  Hat téma, hat aloldal                                               │
│  [kép]Térkép link →    [kép]Élővilág link →    [kép]Vízi világ →     │
│  [kép]Kvíz   link →    [kép]Játék    link →    [kép]Tippek     →     │
├──────────────────────────────────────────────────────────────────────┤
│  Miért vannak veszélyben?   │  ╭ 2025-ben 4,3 millió hektár… ╮       │
├──────────────────────────────────────────────────────────────────────┤
│  Mit tehetsz te?  (4 tipp)  [Nézd meg mind a 10 tippet]  [WWF-doboz] │
├──────────────────────────────────────────────────────────────────────┤
│  ╭ Következő lépés: a térkép   [Nyisd meg a térképet] ╮              │
├──────────────────────────────────────────────────────────────────────┤
│  LÁBLÉC: Rólunk (szerzők) │ Oldalak │ Kapcsolat + GitHub │ térkép    │
│  © 2026 Ádám Levente Dániel és Juhász Arnold · GitHub-repó           │
└──────────────────────────────────────────────────────────────────────┘
```

## 2. Főoldal – mobil nézet

```
┌────────────────────────┐
│ ([logó] Esőerdők…  [≡])│  ← a ≡ gomb lenyitja a menüt
├────────────────────────┤
│ ESŐERDŐK VILÁGA        │
│ Hol nőnek esőerdők…    │
│ [Nyisd meg a térképet] │
│ ╭────────────────────╮ │
│ │   HERO KÉP         │ │
│ ╰────────────────────╯ │
├────────────────────────┤
│ Miért fontosak…?       │
│ (szöveg, alatta adatok)│
├────────────────────────┤
│ ‹ [CAROUSEL] ›         │
├────────────────────────┤
│ Szintek (egymás alatt) │
├────────────────────────┤
│ [kártya: Térkép]       │
│ [kártya: Élővilág]     │
│ … (egy oszlopban)      │
├────────────────────────┤
│ Veszélyek, tippek      │
├────────────────────────┤
│ Következő lépés        │
├────────────────────────┤
│ LÁBLÉC (egymás alatt)  │
└────────────────────────┘
```

## 3. Aloldal-sablon – asztali nézet

```
┌──────────────────────────────────────────────────────────────────────┐
│  ( [logó] Esőerdők világa      menü – az aktuális oldal kiemelve )   │
├───────────────────────────────┬──────────────────────────────────────┤
│  Oldalcím (h1)                │ ╭──────────────────────────────────╮ │
│  Rövid bevezető mondat        │ │  HERO KÉP  (forrás a sarokban)   │ │
│  [Fő gomb]  másodlagos link   │ ╰──────────────────────────────────╯ │
├───────────────────────────────┴──────────────────────────────────────┤
│  Bevezető szakasz (h2 + 1–2 bekezdés)                                │
├──────────────────────────────────────────────────────────────────────┤
│  INTERAKTÍV RÉSZ – oldalanként más:                                  │
│   Térkép:     [szűrő][régiólista][infókártya] │ [ LEAFLET-TÉRKÉP ]   │
│   Élővilág:   [hangulat-gomb] [szűrő]  14 fajkártya hanggombokkal    │
│   Vízi világ: 4 állatkártya + 3 szöveg–kép sor                       │
│   Kvíz:       [progress] kérdés + 4 válasz → visszajelzés → eredmény │
│   Játék:      3 mutató sáv + helyzet + 3 döntés → következmény       │
│   Tippek:     [vállalás-sáv] 10 tippkártya kapcsolóval + szervezetek │
├──────────────────────────────────────────────────────────────────────┤
│  ╭ Következő lépés: …   [Tovább a következő oldalra] ╮               │
├──────────────────────────────────────────────────────────────────────┤
│  LÁBLÉC (azonos minden oldalon)                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## 4. Aloldal-sablon – mobil nézet

```
┌────────────────────────┐
│ ([logó] Esőerdők…  [≡])│
├────────────────────────┤
│ Oldalcím               │
│ Bevezető mondat        │
│ [Fő gomb]              │
│ ╭────────────────────╮ │
│ │ HERO KÉP           │ │
│ ╰────────────────────╯ │
├────────────────────────┤
│ Bevezető szakasz       │
├────────────────────────┤
│ Interaktív rész        │
│ (egy oszlopban; a      │
│ térkép a lista alatt)  │
├────────────────────────┤
│ ╭ Következő lépés ╮    │
├────────────────────────┤
│ LÁBLÉC                 │
└────────────────────────┘
```
