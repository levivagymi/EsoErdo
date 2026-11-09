/* =====================================================================
   Esőerdők világa – közös JavaScript (script.js)
   Minden funkció egy init…() függvény, és csak akkor fut le,
   ha az aktuális oldalon megtalálható a hozzá tartozó HTML-elem.
   ===================================================================== */
'use strict';

/* ---------- Magasságmérő (főoldal, „Az esőerdő szintjei”) ----------
   Görgetés közben jelzi, hogy a látogató éppen melyik erdőszintnél jár. */
function initMagassagmero(retegLista) {
  const retegek = [...retegLista.querySelectorAll('.reteg')];
  const tartomany = (reteg) => ({ felso: Number(reteg.dataset.felso), also: Number(reteg.dataset.also) });
  const legmagasabb = Math.max(...retegek.map((reteg) => tartomany(reteg).felso));
  const hatarok = [...new Set(retegek.flatMap((reteg) => [tartomany(reteg).felso, tartomany(reteg).also]))];

  const ujElem = (tag, osztaly, valtozok = {}) => {
    const elem = document.createElement(tag);
    elem.className = osztaly;
    Object.entries(valtozok).forEach(([nev, ertek]) => elem.style.setProperty(nev, ertek));
    return elem;
  };

  const mero = ujElem('div', 'magassagmero', { '--max': legmagasabb });
  const sav = ujElem('div', 'magassagmero-sav');
  const skala = ujElem('div', 'magassagmero-skala');
  const palya = ujElem('span', 'magassagmero-palya');
  const kiiras = ujElem('span', 'magassagmero-ertek');

  const szakaszok = retegek.map((reteg) => {
    const { felso, also } = tartomany(reteg);
    return ujElem('span', 'magassagmero-szakasz', { '--felso': felso, '--also': also });
  });

  const feliratok = hatarok.map((magassag) => {
    const felirat = ujElem('span', 'magassagmero-felirat', { '--magassag': magassag });
    felirat.textContent = `${magassag} m`;
    return felirat;
  });

  const aktival = (aktivReteg) => {
    const { felso, also } = tartomany(aktivReteg);
    const kozep = (felso + also) / 2;
    mero.style.setProperty('--jelolo', `${((legmagasabb - kozep) / legmagasabb) * 100}%`);
    kiiras.textContent = `${also}–${felso} m`;
    szakaszok.forEach((szakasz, index) => szakasz.classList.toggle('aktiv', retegek[index] === aktivReteg));
  };

  palya.append(ujElem('span', 'magassagmero-jelolo'), kiiras);
  skala.append(...szakaszok, ...feliratok, palya);
  sav.append(skala);
  mero.append(sav);
  mero.setAttribute('aria-hidden', 'true');
  retegLista.before(mero);

  const megfigyelo = new IntersectionObserver((bejegyzesek) => {
    bejegyzesek
      .filter((bejegyzes) => bejegyzes.isIntersecting)
      .forEach((bejegyzes) => aktival(bejegyzes.target));
  }, { rootMargin: '-50% 0px -50% 0px' });

  retegek.forEach((reteg) => megfigyelo.observe(reteg));
  aktival(retegek[0]);
}

const retegLista = document.querySelector('.retegek');
if (retegLista && 'IntersectionObserver' in window) {
  initMagassagmero(retegLista);
}

/* ---------- Közös segédfüggvények ---------- */
const csokkentettMozgas = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Kis DOM-építő: szöveget mindig textContent-tel ír, így nem lehet HTML-t csempészni az oldalba.
function elem(tag, osztaly = '', szoveg = '') {
  const uj = document.createElement(tag);
  if (osztaly) uj.className = osztaly;
  if (szoveg) uj.textContent = szoveg;
  return uj;
}

/* ---------- Interaktív térkép (pages/terkep.html, Leaflet.js) ----------
   A régiók adatai egy tömbben vannak; ebből készül a lista, a jelölők és az információs kártya. */
const ESOERDO_REGIOK = [
  {
    id: 'amazonas', nev: 'Amazonas-esőerdő', tipus: 'tropusi', koord: [-3.5, -62.0],
    hely: 'Dél-Amerika', terulet: 'kb. 5,5 millió km²',
    orszagok: 'Brazília, Peru, Kolumbia, Venezuela, Ecuador, Bolívia, Guyana, Suriname és Francia Guyana',
    fajok: 'jaguár, bőgőmajom, arakanga, amazonasi delfin',
    erdekesseg: 'A Föld legnagyobb trópusi esőerdeje. Folyóiban több mint 2500 halfaj él.',
    veszely: 'marhalegelők, szójaültetvények, erdőtüzek',
  },
  {
    id: 'kongo', nev: 'Kongó-medence', tipus: 'tropusi', koord: [0.0, 21.5],
    hely: 'Közép-Afrika', terulet: 'a világ második legnagyobb trópusi esőerdeje',
    orszagok: 'Kongói Demokratikus Köztársaság, Kongói Köztársaság, Kamerun, Gabon, Közép-afrikai Köztársaság, Egyenlítői-Guinea',
    fajok: 'síkvidéki gorilla, bonobó, erdei elefánt, okapi',
    erdekesseg: 'A bonobó, az ember egyik legközelebbi rokona, csak itt, a Kongó folyótól délre él a vadonban.',
    veszely: 'fakitermelés, bányászat, orvvadászat',
  },
  {
    id: 'borneo', nev: 'Borneó esőerdei', tipus: 'tropusi', koord: [0.9, 114.0],
    hely: 'Délkelet-Ázsia, Borneó szigete', terulet: 'a sziget kb. 743 000 km²-es',
    orszagok: 'Indonézia, Malajzia és Brunei',
    fajok: 'borneói orangután, nagyorrú majom, borneói törpeelefánt, Rafflesia',
    erdekesseg: 'Itt nyílik a Rafflesia, a világ legnagyobb egyedi virága, amely akár 1 méter átmérőjű is lehet.',
    veszely: 'olajpálma-ültetvények, fakitermelés, erdőtüzek',
  },
  {
    id: 'szumatra', nev: 'Szumátra esőerdei', tipus: 'tropusi', koord: [-0.6, 101.3],
    hely: 'Délkelet-Ázsia, Szumátra szigete', terulet: 'a sziget kb. 473 000 km²-es',
    orszagok: 'Indonézia',
    fajok: 'szumátrai tigris, szumátrai orangután, szumátrai orrszarvú, szumátrai elefánt',
    erdekesseg: 'A Leuser-ökoszisztéma az egyetlen hely a Földön, ahol tigris, orangután, orrszarvú és elefánt egy erdőben él.',
    veszely: 'olajpálma- és papíripari ültetvények, orvvadászat',
  },
  {
    id: 'ujguinea', nev: 'Új-Guinea esőerdei', tipus: 'tropusi', koord: [-5.5, 142.0],
    hely: 'Óceánia, Új-Guinea szigete', terulet: 'a harmadik legnagyobb összefüggő trópusi esőerdő',
    orszagok: 'Pápua Új-Guinea és Indonézia',
    fajok: 'paradicsommadarak, fakenguruk, kazuár',
    erdekesseg: 'A paradicsommadarak hímjei látványos tollazattal és különleges táncokkal udvarolnak a tojóknak.',
    veszely: 'fakitermelés, olajpálma-ültetvények, bányászat',
  },
  {
    id: 'daintree', nev: 'Daintree-esőerdő', tipus: 'tropusi', koord: [-16.17, 145.42],
    hely: 'Ausztrália, Queensland', terulet: 'kb. 1200 km²',
    orszagok: 'Ausztrália',
    fajok: 'déli kazuár, Bennett-fakenguru, Ulysses-pillangó',
    erdekesseg: 'A világ egyik legősibb trópusi esőerdejének tartják: a becslések szerint mintegy 180 millió éves.',
    veszely: 'éghajlatváltozás, a part menti beépítés',
  },
  {
    id: 'atlanti', nev: 'Atlanti-parti esőerdő', tipus: 'tropusi', koord: [-22.9, -43.6],
    hely: 'Dél-Amerika, Brazília atlanti partvidéke', terulet: 'eredeti kiterjedésének csak kb. 12%-a maradt meg',
    orszagok: 'Brazília, Paraguay és Argentína',
    fajok: 'aranyoroszlán-tamarin, jaguár, síkvidéki tapír',
    erdekesseg: 'Fajainak jelentős része sehol máshol nem él; az aranyoroszlán-tamarint védelmi programok mentették meg a kihalás széléről.',
    veszely: 'a városok terjeszkedése, mezőgazdaság, utak',
  },
  {
    id: 'madagaszkar', nev: 'Madagaszkár esőerdei', tipus: 'tropusi', koord: [-18.5, 48.8],
    hely: 'Afrika, Madagaszkár keleti partvidéke', terulet: 'a sziget keleti részén húzódó erdősáv',
    orszagok: 'Madagaszkár',
    fajok: 'indri, vörös vari, kaméleonok',
    erdekesseg: 'Az itt élő állatok és növények többsége – például az összes lemúrfaj – csak Madagaszkáron fordul elő.',
    veszely: 'égetéses földművelés, illegális fakitermelés',
  },
  {
    id: 'monteverde', nev: 'Monteverde felhőerdő', tipus: 'tropusi', koord: [10.3, -84.8],
    hely: 'Közép-Amerika, Costa Rica', terulet: 'kb. 105 km²-es védett terület',
    orszagok: 'Costa Rica',
    fajok: 'quetzal, kolibrik, üvegbékák',
    erdekesseg: 'Itt élt az aranyvarangy, amelyet 1989 óta nem láttak – eltűnését az éghajlatváltozással hozzák összefüggésbe.',
    veszely: 'éghajlatváltozás: a felhők egyre magasabbra húzódnak',
  },
  {
    id: 'greatbear', nev: 'Great Bear-esőerdő', tipus: 'mersekelt', koord: [52.5, -128.0],
    hely: 'Észak-Amerika, Kanada (Brit Columbia)', terulet: 'kb. 64 000 km²',
    orszagok: 'Kanada',
    fajok: 'szellemmedve, grizzly medve, lazac, óriás tuja',
    erdekesseg: 'Itt él a szellemmedve: a fekete medve ritka, fehér bundájú változata.',
    veszely: 'fakitermelés – ma a terület nagy része védett',
  },
  {
    id: 'valdivia', nev: 'Valdíviai esőerdő', tipus: 'mersekelt', koord: [-40.5, -72.6],
    hely: 'Dél-Amerika, Chile és Argentína', terulet: 'Chile déli részén húzódó, keskeny erdősáv',
    orszagok: 'Chile és Argentína',
    fajok: 'pudu (a legkisebb szarvas), alerce, chilei araukária',
    erdekesseg: 'Az alerce fák több ezer évig élhetnek: a legidősebb ismert példány több mint 3600 éves.',
    veszely: 'fakitermelés, fenyő- és eukaliptuszültetvények',
  },
];

const TIPUS_NEV = { tropusi: 'Trópusi esőerdő', mersekelt: 'Mérsékelt övi esőerdő' };

function initTerkep(terkepElem) {
  const lista = document.getElementById('regio-lista');
  const info = document.getElementById('regio-info');
  const szamlalo = document.getElementById('regio-szam');
  const szuroGombok = [...document.querySelectorAll('.terkep-szuro [data-szuro]')];
  const osszesGomb = document.getElementById('terkep-osszes');

  if (typeof L === 'undefined') {
    terkepElem.append(elem('p', 'terkep-figyelem',
      'A térképet most nem sikerült betölteni. Ellenőrizd az internetkapcsolatot, majd töltsd újra az oldalt.'));
    return;
  }

  const terkep = L.map(terkepElem, {
    center: [8, 10],
    zoom: 2,
    minZoom: 2,
    maxZoom: 8,
    maxBounds: [[-70, -190], [80, 200]],
    maxBoundsViscosity: 0.8,
    scrollWheelZoom: false,
    zoomControl: false,
  });
  L.control.zoom({ zoomInTitle: 'Nagyítás', zoomOutTitle: 'Kicsinyítés' }).addTo(terkep);
  terkep.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-közreműködők',
  }).addTo(terkep);

  // Görgetéssel csak akkor nagyít a térkép, ha a látogató már belekattintott (így nem „ragad be” az oldal görgetése).
  terkep.on('click focus', () => terkep.scrollWheelZoom.enable());
  terkep.on('mouseout blur', () => terkep.scrollWheelZoom.disable());

  // Az Egyenlítő és a két térítő szaggatott vonallal
  [[23.44, 'Ráktérítő (é. sz. 23,4°)'], [0, 'Egyenlítő'], [-23.44, 'Baktérítő (d. sz. 23,4°)']].forEach(([fok, nev]) => {
    L.polyline([[fok, -190], [fok, 200]], { color: '#582f0e', weight: 1.5, opacity: 0.85, dashArray: '6 6' })
      .bindTooltip(nev, { sticky: true })
      .addTo(terkep);
  });

  const ikon = (tipus) => L.divIcon({
    className: `terkep-jelolo terkep-jelolo-${tipus}`,
    html: '<i class="bi bi-tree-fill" aria-hidden="true"></i>',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -14],
  });

  const jelolok = new Map();
  const listaElemek = new Map();
  let aktivSzuro = 'mind';

  const latszik = (regio) => aktivSzuro === 'mind' || regio.tipus === aktivSzuro;

  const mutasdMind = () => {
    const helyek = ESOERDO_REGIOK.filter(latszik).map((regio) => regio.koord);
    terkep.fitBounds(L.latLngBounds(helyek), { padding: [40, 40], maxZoom: 4, animate: !csokkentettMozgas() });
  };

  const infoKitolt = (regio) => {
    const torzs = elem('div', 'card-body');
    torzs.append(elem('p', `terkep-info-tipus terkep-info-${regio.tipus}`, TIPUS_NEV[regio.tipus]));
    torzs.append(elem('h3', 'card-title', regio.nev));
    const adatok = elem('dl', 'terkep-adatok');
    [['Hol?', regio.hely], ['Terület', regio.terulet], ['Országok', regio.orszagok],
      ['Jellemző élőlények', regio.fajok], ['Érdekesség', regio.erdekesseg], ['Veszélyek', regio.veszely]]
      .forEach(([cimke, ertek]) => adatok.append(elem('dt', '', cimke), elem('dd', '', ertek)));
    torzs.append(adatok);
    info.replaceChildren(torzs);
  };

  const kivalaszt = (regio, terkepMozgatas) => {
    infoKitolt(regio);
    listaElemek.forEach((gomb, id) => {
      const aktiv = id === regio.id;
      gomb.classList.toggle('active', aktiv);
      if (aktiv) gomb.setAttribute('aria-current', 'true');
      else gomb.removeAttribute('aria-current');
    });
    const jelolo = jelolok.get(regio.id);
    if (!terkepMozgatas) {
      jelolo.openPopup();
      return;
    }
    // a felugró ablak csak a mozgás végén nyílik ki, különben megzavarná a repülést
    terkep.once('moveend', () => jelolo.openPopup());
    if (csokkentettMozgas()) terkep.setView(regio.koord, 5);
    else terkep.flyTo(regio.koord, 5, { duration: 1.2 });
  };

  ESOERDO_REGIOK.forEach((regio) => {
    const nevElem = elem('strong', '', regio.nev);
    const jelolo = L.marker(regio.koord, { icon: ikon(regio.tipus), title: regio.nev, keyboard: true, riseOnHover: true })
      .bindPopup(nevElem)
      .on('click', () => kivalaszt(regio, false))
      .addTo(terkep);
    jelolok.set(regio.id, jelolo);

    const gomb = elem('button', 'list-group-item list-group-item-action terkep-lista-elem');
    gomb.type = 'button';
    gomb.append(elem('span', 'terkep-lista-nev', regio.nev), elem('span', 'terkep-lista-hely', regio.hely));
    gomb.addEventListener('click', () => kivalaszt(regio, true));
    lista.append(gomb);
    listaElemek.set(regio.id, gomb);
  });

  const szur = (szuro) => {
    aktivSzuro = szuro;
    szuroGombok.forEach((gomb) => {
      const aktiv = gomb.dataset.szuro === szuro;
      gomb.classList.toggle('active', aktiv);
      gomb.setAttribute('aria-pressed', String(aktiv));
    });
    let darab = 0;
    ESOERDO_REGIOK.forEach((regio) => {
      const lathato = latszik(regio);
      if (lathato) {
        darab += 1;
        jelolok.get(regio.id).addTo(terkep);
      } else {
        jelolok.get(regio.id).remove();
      }
      listaElemek.get(regio.id).hidden = !lathato;
    });
    szamlalo.textContent = `${darab} régió látható a térképen.`;
    mutasdMind();
  };

  szuroGombok.forEach((gomb) => gomb.addEventListener('click', () => szur(gomb.dataset.szuro)));
  osszesGomb.addEventListener('click', () => szur('mind'));
  mutasdMind();
}

const terkepElem = document.getElementById('terkep');
if (terkepElem) {
  initTerkep(terkepElem);
}

/* ---------- Élővilág: fajok szűrése (pages/elovilag.html) ----------
   A kártyák oszlopain lévő data-tipus alapján rejti el vagy mutatja meg a fajokat. */
function initFajSzuro(szuroSav) {
  const gombok = [...szuroSav.querySelectorAll('[data-szuro]')];
  const oszlopok = [...document.querySelectorAll('.faj-racs > [data-tipus]')];
  const szamlalo = document.getElementById('faj-szam');

  const szur = (szuro) => {
    let darab = 0;
    oszlopok.forEach((oszlop) => {
      const lathato = szuro === 'mind' || oszlop.dataset.tipus === szuro;
      oszlop.hidden = !lathato;
      if (lathato) darab += 1;
    });
    gombok.forEach((gomb) => {
      const aktiv = gomb.dataset.szuro === szuro;
      gomb.classList.toggle('active', aktiv);
      gomb.setAttribute('aria-pressed', String(aktiv));
    });
    szamlalo.textContent = `${darab} faj látható`;
  };

  gombok.forEach((gomb) => gomb.addEventListener('click', () => szur(gomb.dataset.szuro)));
}

const fajSzuro = document.querySelector('.faj-szuro');
if (fajSzuro) {
  initFajSzuro(fajSzuro);
}

/* ---------- Élővilág: állathangok (pages/elovilag.html) ----------
   Egyetlen közös Audio objektum szól, így egyszerre mindig csak egy hang hallható.
   A hangfájl útvonala a gomb data-hang attribútumában van. */
function initHangok(gombok) {
  const lejatszo = new Audio();
  lejatszo.preload = 'none';
  const allapot = document.getElementById('hang-allapot');
  let aktivGomb = null;

  const gombAllapot = (gomb, szol) => {
    const felirat = gomb.querySelector('.hang-felirat');
    const ikon = gomb.querySelector('.bi');
    if (!gomb.dataset.eredetiFelirat) gomb.dataset.eredetiFelirat = felirat.textContent;
    gomb.setAttribute('aria-pressed', String(szol));
    gomb.classList.toggle('szol', szol);
    felirat.textContent = szol ? 'Leállítás' : gomb.dataset.eredetiFelirat;
    ikon.classList.toggle('bi-stop-fill', szol);
    ikon.classList.toggle(gomb.dataset.hang.includes('hangulat') ? 'bi-music-note-beamed' : 'bi-volume-up', !szol);
  };

  const leallit = () => {
    lejatszo.pause();
    lejatszo.currentTime = 0;
    if (aktivGomb) gombAllapot(aktivGomb, false);
    aktivGomb = null;
  };

  lejatszo.addEventListener('ended', () => {
    if (aktivGomb) allapot.textContent = `Véget ért: ${aktivGomb.dataset.eredetiFelirat}.`;
    leallit();
  });

  gombok.forEach((gomb) => {
    gomb.addEventListener('click', () => {
      if (aktivGomb === gomb) {
        leallit();
        allapot.textContent = 'A hang leállt.';
        return;
      }
      leallit();
      aktivGomb = gomb;
      gombAllapot(gomb, true);
      lejatszo.src = gomb.dataset.hang;
      // A play() Promise-t ad vissza: ha a böngésző nem tudja lejátszani, itt kezeljük a hibát.
      lejatszo.play()
        .then(() => {
          if (aktivGomb === gomb) allapot.textContent = `Most szól: ${gomb.dataset.eredetiFelirat}.`;
        })
        .catch((hiba) => {
          // Ha közben egy másik hangot indítottak el, a régi lejátszás megszakad (AbortError) – ez nem hiba.
          if (aktivGomb !== gomb || hiba.name === 'AbortError') return;
          leallit();
          allapot.textContent = 'A hangot most nem sikerült lejátszani. Próbáld újra, vagy ellenőrizd a hangerőt!';
        });
    });
  });
}

const hangGombok = [...document.querySelectorAll('.hang-gomb')];
if (hangGombok.length) {
  initHangok(hangGombok);
}

/* ---------- Kvíz (pages/kviz.html) ----------
   Minden kérdésnél az első válasz a helyes; a sorrendet a program keveri össze. */
const KVIZ_KERDESEK = [
  {
    kerdes: 'A szárazföldek nagyjából hány százalékát borítják esőerdők?',
    valaszok: ['kb. 6%-át', 'kb. 20%-át', 'kb. 35%-át', 'kb. 50%-át'],
    magyarazat: 'Az esőerdők a szárazföldeknek csak kb. 6%-át borítják, mégis itt él a Föld növény- és állatfajainak több mint fele.',
  },
  {
    kerdes: 'Melyik az esőerdő legmagasabb szintje?',
    valaszok: ['az óriásfák szintje', 'a lombkoronaszint', 'az alsó lombkoronaszint', 'a talajszint'],
    magyarazat: 'Az óriásfák (40–60 m) a lombkorona fölé magasodnak, csúcsaikat tűző nap és erős szél éri.',
  },
  {
    kerdes: 'A napfénynek nagyjából hány százaléka jut le az esőerdő talajáig?',
    valaszok: ['kb. 2%-a', 'kb. 25%-a', 'kb. 50%-a', 'kb. 80%-a'],
    magyarazat: 'A sűrű lombkorona szinte minden fényt felfog, a talajra csak kb. 2% jut le, ezért ott félhomály van.',
  },
  {
    kerdes: 'Mi az erdőirtás legfőbb oka az Amazonas vidékén?',
    valaszok: ['a marhalegelők kialakítása', 'a városok építése', 'a turizmus', 'a vasútépítés'],
    magyarazat: 'Az Amazonas vidékén az erdőirtás legfőbb oka a marhalegelők terjeszkedése; emellett a szójaültetvények és a tüzek is sok erdőt pusztítanak.',
  },
  {
    kerdes: 'Melyik esőerdei állat hangja hallatszik el akár 5 kilométerre is?',
    valaszok: ['a bőgőmajomé', 'a lajháré', 'a vörösszemű levelibékáé', 'a jaguáré'],
    magyarazat: 'A bőgőmajom a szárazföld egyik leghangosabb állata; üvöltésével jelzi a csapat területét.',
  },
  {
    kerdes: 'Melyik növénynek van a világ legnagyobb egyedi virága?',
    valaszok: ['a rafflézia', 'az óriás tündérrózsa', 'a vanília', 'a kakaófa'],
    magyarazat: 'A Rafflesia arnoldii virága akár 1 méter átmérőjű is lehet. Nincs levele, szára és gyökere: egy lián belsejében élősködik.',
  },
  {
    kerdes: 'Igaz-e, hogy az Amazonas esőerdő adja a Föld oxigénjének 20%-át?',
    valaszok: [
      'Nem: az erdő élőlényei a megtermelt oxigén szinte egészét maguk fel is használják.',
      'Igen, ezért hívják a Föld tüdejének.',
      'Igen, sőt a Föld oxigénjének a felét adja.',
      'Nem, mert az esőerdő fái egyáltalán nem termelnek oxigént.',
    ],
    magyarazat: 'Ez gyakori tévhit. Az Amazonas sok oxigént termel, de az ott élő növények, állatok és lebontó szervezetek szinte ugyanennyit el is használnak. Az esőerdő azért pótolhatatlan, mert hatalmas mennyiségű szenet tárol, és szabályozza a csapadékot.',
  },
  {
    kerdes: 'Mit jelez az FSC-jelölés egy fa- vagy papírterméken?',
    valaszok: ['hogy felelős erdőgazdálkodásból származik', 'hogy újrahasznosított műanyagból készült', 'hogy Magyarországon gyártották', 'hogy vízálló'],
    magyarazat: 'Az FSC-jelölés azt mutatja, hogy a fa olyan erdőből származik, ahol figyelnek a természetre és az ott élő emberekre is.',
  },
  {
    kerdes: 'Miért sötét, tea színű az Amazonas „fekete vizű” folyóinak vize?',
    valaszok: ['a bomló növényi anyagokból oldódó szerves vegyületek miatt', 'olajszennyezés miatt', 'a mélyben lévő vulkáni kőzetek miatt', 'mert nagyon hideg a víz'],
    magyarazat: 'A lehulló levelekből és ágakból humuszanyagok oldódnak a vízbe, és ezek nyelik el a fényt. A víz ettől még lehet viszonylag átlátszó.',
  },
  {
    kerdes: 'Mekkora az Amazonas esőerdeje?',
    valaszok: ['kb. 5,5 millió km²', 'kb. 55 ezer km²', 'kb. 550 ezer km²', 'kb. 55 millió km²'],
    magyarazat: 'Az Amazonas esőerdeje kb. 5,5 millió km²-es: majdnem hatvanszor akkora, mint Magyarország.',
  },
];

// Fisher–Yates keverés: a tömb egy összekevert másolatát adja vissza.
function kever(tomb) {
  const masolat = [...tomb];
  for (let i = masolat.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [masolat[i], masolat[j]] = [masolat[j], masolat[i]];
  }
  return masolat;
}

function initKviz(kvizElem) {
  const $ = (id) => kvizElem.querySelector(`#${id}`);
  const kezdo = $('kviz-kezdo');
  const kerdesResz = $('kviz-kerdes-resz');
  const eredmeny = $('kviz-eredmeny');
  const szamlalo = $('kviz-szamlalo');
  const pontKiiras = $('kviz-pont');
  const sav = $('kviz-sav');
  const savBelso = $('kviz-sav-belso');
  const kerdesSzoveg = $('kviz-kerdes-szoveg');
  const valaszDoboz = $('kviz-valaszok');
  const visszajelzes = $('kviz-visszajelzes');
  const tovabbGomb = $('kviz-tovabb');
  const darab = KVIZ_KERDESEK.length;

  let sorrend = [];
  let index = 0;
  let pont = 0;

  // A lebegő menü ne takarja ki a kérdést: ha a kérdés nem látszik jól, a kvíz elejére görgetünk.
  const kerdesLathatoba = () => {
    kerdesSzoveg.focus({ preventScroll: true });
    const teteje = kerdesSzoveg.getBoundingClientRect().top;
    if (teteje < 120 || teteje > window.innerHeight - 160) {
      kvizElem.scrollIntoView({ behavior: csokkentettMozgas() ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const kerdesMutat = () => {
    const kerdes = sorrend[index];
    szamlalo.textContent = `${index + 1}. kérdés / ${darab}`;
    sav.setAttribute('aria-valuenow', String(index + 1));
    sav.setAttribute('aria-valuetext', `${index + 1}. kérdés a ${darab}-ből`);
    savBelso.style.width = `${((index + 1) / darab) * 100}%`;
    kerdesSzoveg.textContent = kerdes.kerdes;
    visszajelzes.replaceChildren();
    visszajelzes.className = 'kviz-visszajelzes';
    tovabbGomb.hidden = true;

    const helyes = kerdes.valaszok[0];
    const gombok = kever(kerdes.valaszok).map((szoveg) => {
      const gomb = elem('button', 'btn kviz-valasz', szoveg);
      gomb.type = 'button';
      gomb.addEventListener('click', () => valaszol(gomb, szoveg === helyes, helyes, kerdes.magyarazat));
      return gomb;
    });
    valaszDoboz.replaceChildren(...gombok);
  };

  const valaszol = (valasztott, talalt, helyes, magyarazat) => {
    [...valaszDoboz.children].forEach((gomb) => {
      gomb.disabled = true;
      if (gomb.textContent === helyes) {
        gomb.classList.add('helyes');
        gomb.append(elem('span', 'visually-hidden', ' – helyes válasz'));
      }
    });
    if (!talalt) {
      valasztott.classList.add('helytelen');
      valasztott.append(elem('span', 'visually-hidden', ' – a te válaszod'));
    }
    if (talalt) pont += 1;
    pontKiiras.textContent = String(pont);

    visszajelzes.className = `kviz-visszajelzes ${talalt ? 'jo' : 'rossz'}`;
    const cim = elem('strong', '', talalt ? '✔ Helyes! ' : `✘ Nem egészen. A helyes válasz: ${helyes}. `);
    visszajelzes.replaceChildren(cim, document.createTextNode(magyarazat));

    tovabbGomb.textContent = index === darab - 1 ? 'Eredmény megtekintése' : 'Következő kérdés';
    tovabbGomb.hidden = false;
    tovabbGomb.focus({ preventScroll: true });
    if (tovabbGomb.getBoundingClientRect().bottom > window.innerHeight) {
      tovabbGomb.scrollIntoView({ behavior: csokkentettMozgas() ? 'auto' : 'smooth', block: 'nearest' });
    }
  };

  const ertekeles = () => {
    if (pont === darab) return 'Tökéletes! Igazi esőerdő-szakértő vagy.';
    if (pont >= 8) return 'Nagyon szép! Szinte mindent tudsz az esőerdőkről.';
    if (pont >= 5) return 'Jó kezdet! Nézz körül még egyszer az oldalon, aztán próbáld újra.';
    return 'Ne add fel! Fedezd fel az aloldalakat, aztán próbáld újra.';
  };

  const vege = () => {
    kerdesResz.hidden = true;
    eredmeny.hidden = false;
    $('kviz-vegpont').textContent = String(pont);
    $('kviz-ertekeles').textContent = `${Math.round((pont / darab) * 100)}% – ${ertekeles()}`;
    $('kviz-eredmeny-cim').focus();
  };

  const indit = () => {
    sorrend = kever(KVIZ_KERDESEK);
    index = 0;
    pont = 0;
    pontKiiras.textContent = '0';
    kezdo.hidden = true;
    eredmeny.hidden = true;
    kerdesResz.hidden = false;
    kerdesMutat();
    kerdesLathatoba();
  };

  tovabbGomb.addEventListener('click', () => {
    if (index === darab - 1) {
      vege();
      return;
    }
    index += 1;
    kerdesMutat();
    kerdesLathatoba();
  });
  $('kviz-indit').addEventListener('click', indit);
  $('kviz-ujra').addEventListener('click', indit);
}

const kvizElem = document.getElementById('kviz');
if (kvizElem) {
  initKviz(kvizElem);
}

/* ---------- Tárolás a böngészőben (localStorage) ----------
   Privát módban vagy letiltott sütik mellett a localStorage hibát dobhat: ilyenkor az oldal tárolás nélkül működik tovább. */
const tarolo = {
  olvas(kulcs, alapertek) {
    try {
      const ertek = window.localStorage.getItem(kulcs);
      return ertek === null ? alapertek : JSON.parse(ertek);
    } catch (hiba) {
      return alapertek;
    }
  },
  ir(kulcs, ertek) {
    try {
      window.localStorage.setItem(kulcs, JSON.stringify(ertek));
      return true;
    } catch (hiba) {
      return false;
    }
  },
};

/* ---------- Tippek: vállalás-lista (pages/tippek.html) ---------- */
const VALLALAS_KULCS = 'esoerdo-vallalasok';

function vallalasUzenet(db, osszes) {
  if (db === 0) return 'Még nem vállaltál egy tippet sem. Válassz legalább egyet!';
  if (db === osszes) return `Mind a ${osszes} tippet vállaltad – az esőerdők nevében: köszönjük!`;
  if (db >= 8) return `${db} vállalásod van. Lenyűgöző, már csak néhány hiányzik!`;
  if (db >= 4) return `${db} vállalásod van. Szuper, igazi esőerdő-barát vagy!`;
  return `${db} vállalásod van. Jó kezdet – minden lépés számít!`;
}

function initVallalasok(dobozok) {
  const sav = document.getElementById('vallalas-sav');
  const savBelso = document.getElementById('vallalas-sav-belso');
  const szoveg = document.getElementById('vallalas-szoveg');
  const torles = document.getElementById('vallalas-torles');
  const ervenyes = new Set(dobozok.map((doboz) => doboz.dataset.tipp));

  const mentett = tarolo.olvas(VALLALAS_KULCS, []);
  const mentettLista = Array.isArray(mentett) ? mentett.filter((kulcs) => ervenyes.has(kulcs)) : [];
  dobozok.forEach((doboz) => {
    doboz.checked = mentettLista.includes(doboz.dataset.tipp);
  });

  const frissit = (mentes) => {
    dobozok.forEach((doboz) => doboz.closest('.tipp-kartya').classList.toggle('vallalt', doboz.checked));
    const bejelolt = dobozok.filter((doboz) => doboz.checked);
    const db = bejelolt.length;
    sav.setAttribute('aria-valuenow', String(db));
    sav.setAttribute('aria-valuetext', `${db} vállalás a ${dobozok.length}-ből`);
    savBelso.style.width = `${(db / dobozok.length) * 100}%`;
    let uzenet = vallalasUzenet(db, dobozok.length);
    if (mentes && !tarolo.ir(VALLALAS_KULCS, bejelolt.map((doboz) => doboz.dataset.tipp))) {
      uzenet += ' (A böngésződ most nem engedi a mentést, de amíg itt vagy, a vállalásaid megmaradnak.)';
    }
    if (szoveg.textContent !== uzenet) szoveg.textContent = uzenet;
    torles.disabled = db === 0;
  };

  dobozok.forEach((doboz) => doboz.addEventListener('change', () => frissit(true)));
  torles.addEventListener('click', () => {
    dobozok.forEach((doboz) => {
      doboz.checked = false;
    });
    frissit(true);
  });
  frissit(false);
}

const vallalasDobozok = [...document.querySelectorAll('.vallalas')];
if (vallalasDobozok.length) {
  initVallalasok(vallalasDobozok);
}
