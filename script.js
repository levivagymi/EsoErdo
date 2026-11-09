'use strict';

const SZURO_MIND = 'mind';

function elemetKeszit(tag, osztaly = '', szoveg = '') {
  const ujElem = document.createElement(tag);
  if (osztaly !== '') {
    ujElem.className = osztaly;
  }
  ujElem.textContent = szoveg;
  return ujElem;
}

function diszitoIkontKeszit(nev) {
  const ikon = elemetKeszit('i', `bi bi-${nev}`);
  ikon.setAttribute('aria-hidden', 'true');
  return ikon;
}

function szuroGombokatFrissit(gombok, aktivSzuro) {
  for (const gomb of gombok) {
    const aktiv = gomb.dataset.szuro === aktivSzuro;
    gomb.classList.toggle('active', aktiv);
    gomb.setAttribute('aria-pressed', String(aktiv));
  }
}

function osszesGombotLetilt(doboz) {
  for (const gomb of doboz.children) {
    gomb.disabled = true;
  }
}

function gombotMegjelol(gomb, osztaly, ikonNev, rejtettSzoveg) {
  gomb.classList.add(osztaly);
  gomb.prepend(diszitoIkontKeszit(ikonNev));
  gomb.append(elemetKeszit('span', 'visually-hidden', rejtettSzoveg));
}

function savotBeallit(belsoSav, arany) {
  belsoSav.style.setProperty('--ertek', String(arany));
}

function animalastBekapcsolKezdoallapotUtan(sav) {
  sav.getBoundingClientRect();
  sav.classList.add('animalt');
}

const KEPERNYO_KOZEPVONALA = '-50% 0px -50% 0px';

function initMagassagmero(retegLista) {
  const mero = document.querySelector('.magassagmero');
  const ertekKiiras = mero.querySelector('.magassagmero-ertek');
  const szakaszok = mero.querySelectorAll('.magassagmero-szakasz');
  const retegek = retegLista.querySelectorAll('.reteg');

  const megfigyelo = new IntersectionObserver(kozepreErtSzintetMutat, { rootMargin: KEPERNYO_KOZEPVONALA });
  for (const reteg of retegek) {
    megfigyelo.observe(reteg);
  }

  mero.hidden = false;
  szintetMutat(retegek[0]);

  function kozepreErtSzintetMutat(bejegyzesek) {
    for (const bejegyzes of bejegyzesek) {
      if (bejegyzes.isIntersecting) {
        szintetMutat(bejegyzes.target);
      }
    }
  }

  function szintetMutat(aktivReteg) {
    const felso = Number(aktivReteg.dataset.felso);
    const also = Number(aktivReteg.dataset.also);
    mero.style.setProperty('--jelolo-magassag', String((felso + also) / 2));
    ertekKiiras.textContent = `${also}–${felso} m`;

    for (let i = 0; i < szakaszok.length; i++) {
      szakaszok[i].classList.toggle('aktiv', retegek[i] === aktivReteg);
    }
  }
}

const retegLista = document.querySelector('.retegek');
if (retegLista && 'IntersectionObserver' in window) {
  initMagassagmero(retegLista);
}

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

const NEVEZETES_SZELESSEGI_KOROK = [
  { szelesseg: 23.44, nev: 'Ráktérítő (é. sz. 23,4°)' },
  { szelesseg: 0, nev: 'Egyenlítő' },
  { szelesseg: -23.44, nev: 'Baktérítő (d. sz. 23,4°)' },
];

const TERKEP_NYUGATI_SZELE = -190;
const TERKEP_KELETI_SZELE = 200;
const JELOLO_MERETE = 34;
const KIVALASZTOTT_REGIO_NAGYITASA = 5;

function initTerkep(terkepElem) {
  const leafletHianyzik = typeof L === 'undefined';
  if (leafletHianyzik) {
    const figyelmeztetes = 'A térképet most nem sikerült betölteni. Ellenőrizd az internetkapcsolatot, majd töltsd újra az oldalt.';
    terkepElem.append(elemetKeszit('p', 'terkep-figyelem', figyelmeztetes));
    return;
  }

  const lista = document.getElementById('regio-lista');
  const info = document.getElementById('regio-info');
  const szamlalo = document.getElementById('regio-szam');
  const szuroGombok = document.querySelectorAll('.terkep-szuro [data-szuro]');
  const osszesGomb = document.getElementById('terkep-osszes');

  const terkep = alapTerkepetKeszit(terkepElem);
  szelessegiKoroketRajzol(terkep);

  const jelolok = {};
  const listaGombok = {};
  let aktivSzuro = SZURO_MIND;

  for (const regio of ESOERDO_REGIOK) {
    jelolok[regio.id] = jelolotKeszit(regio);
    listaGombok[regio.id] = listaGombotKeszit(regio);
  }

  for (const gomb of szuroGombok) {
    gomb.addEventListener('click', function () {
      szur(gomb.dataset.szuro);
    });
  }
  osszesGomb.addEventListener('click', function () {
    szur(SZURO_MIND);
  });
  lathatoRegiokraNagyit();

  function jelolotKeszit(regio) {
    const jelolo = L.marker(regio.koord, { icon: jeloloIkontKeszit(regio.tipus), title: regio.nev, keyboard: true, riseOnHover: true });
    jelolo.bindPopup(elemetKeszit('strong', '', regio.nev));
    jelolo.on('click', function () {
      regiotKiemel(regio);
      jelolo.openPopup();
    });
    jelolo.addTo(terkep);
    return jelolo;
  }

  function listaGombotKeszit(regio) {
    const gomb = elemetKeszit('button', 'list-group-item list-group-item-action terkep-lista-elem');
    gomb.type = 'button';
    gomb.append(elemetKeszit('span', 'terkep-lista-nev', regio.nev), elemetKeszit('span', 'terkep-lista-hely', regio.hely));
    gomb.addEventListener('click', function () {
      regiotKiemel(regio);
      terkepetRegiohozMozgat(regio);
    });
    lista.append(gomb);
    return gomb;
  }

  function regiotKiemel(kivalasztottRegio) {
    regioInfotKitolt(info, kivalasztottRegio);
    for (const regio of ESOERDO_REGIOK) {
      const gomb = listaGombok[regio.id];
      const ezAKivalasztott = regio.id === kivalasztottRegio.id;
      gomb.classList.toggle('active', ezAKivalasztott);
      if (ezAKivalasztott) {
        gomb.setAttribute('aria-current', 'true');
      } else {
        gomb.removeAttribute('aria-current');
      }
    }
  }

  function terkepetRegiohozMozgat(regio) {
    const jelolo = jelolok[regio.id];
    terkep.once('moveend', function () {
      jelolo.openPopup();
    });
    terkep.setView(regio.koord, KIVALASZTOTT_REGIO_NAGYITASA, { animate: !csokkentettMozgastKer() });
  }

  function szur(szuro) {
    aktivSzuro = szuro;
    szuroGombokatFrissit(szuroGombok, szuro);

    let lathatoDarab = 0;
    for (const regio of ESOERDO_REGIOK) {
      const lathato = regioLatszik(regio);
      if (lathato) {
        lathatoDarab += 1;
        jelolok[regio.id].addTo(terkep);
      } else {
        jelolok[regio.id].remove();
      }
      listaGombok[regio.id].hidden = !lathato;
    }

    szamlalo.textContent = `${lathatoDarab} régió látható a térképen.`;
    lathatoRegiokraNagyit();
  }

  function regioLatszik(regio) {
    return aktivSzuro === SZURO_MIND || regio.tipus === aktivSzuro;
  }

  function lathatoRegiokraNagyit() {
    const helyek = [];
    for (const regio of ESOERDO_REGIOK) {
      if (regioLatszik(regio)) {
        helyek.push(regio.koord);
      }
    }
    terkep.fitBounds(L.latLngBounds(helyek), { padding: [40, 40], maxZoom: 4, animate: !csokkentettMozgastKer() });
  }
}

function alapTerkepetKeszit(terkepElem) {
  const terkep = L.map(terkepElem, {
    center: [8, 10],
    zoom: 2,
    minZoom: 2,
    maxZoom: 8,
    maxBounds: [[-70, TERKEP_NYUGATI_SZELE], [80, TERKEP_KELETI_SZELE]],
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

  terkep.on('click focus', function () {
    terkep.scrollWheelZoom.enable();
  });
  terkep.on('mouseout blur', function () {
    terkep.scrollWheelZoom.disable();
  });

  return terkep;
}

function szelessegiKoroketRajzol(terkep) {
  for (const szelessegiKor of NEVEZETES_SZELESSEGI_KOROK) {
    const vonal = [[szelessegiKor.szelesseg, TERKEP_NYUGATI_SZELE], [szelessegiKor.szelesseg, TERKEP_KELETI_SZELE]];
    L.polyline(vonal, { className: 'terkep-vonal', weight: 1.5, opacity: 0.85, dashArray: '6 6' })
      .bindTooltip(szelessegiKor.nev, { sticky: true })
      .addTo(terkep);
  }
}

function jeloloIkontKeszit(tipus) {
  return L.divIcon({
    className: `terkep-jelolo terkep-jelolo-${tipus}`,
    html: '<i class="bi bi-tree-fill" aria-hidden="true"></i>',
    iconSize: [JELOLO_MERETE, JELOLO_MERETE],
    iconAnchor: [JELOLO_MERETE / 2, JELOLO_MERETE / 2],
    popupAnchor: [0, -14],
  });
}

function regioInfotKitolt(info, regio) {
  const sorok = [
    { cimke: 'Hol?', ertek: regio.hely },
    { cimke: 'Terület', ertek: regio.terulet },
    { cimke: 'Országok', ertek: regio.orszagok },
    { cimke: 'Jellemző élőlények', ertek: regio.fajok },
    { cimke: 'Érdekesség', ertek: regio.erdekesseg },
    { cimke: 'Veszélyek', ertek: regio.veszely },
  ];

  const adatok = elemetKeszit('dl', 'terkep-adatok');
  for (const sor of sorok) {
    adatok.append(elemetKeszit('dt', '', sor.cimke), elemetKeszit('dd', '', sor.ertek));
  }

  const torzs = elemetKeszit('div', 'card-body');
  torzs.append(elemetKeszit('p', `terkep-info-tipus terkep-info-${regio.tipus}`, TIPUS_NEV[regio.tipus]));
  torzs.append(elemetKeszit('h3', 'card-title', regio.nev));
  torzs.append(adatok);
  info.replaceChildren(torzs);
}

function csokkentettMozgastKer() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const terkepElem = document.getElementById('terkep');
if (terkepElem) {
  initTerkep(terkepElem);
}

function initFajSzuro(szuroSav) {
  const gombok = szuroSav.querySelectorAll('[data-szuro]');
  const oszlopok = document.querySelectorAll('.faj-racs > [data-tipus]');
  const szamlalo = document.getElementById('faj-szam');

  for (const gomb of gombok) {
    gomb.addEventListener('click', function () {
      szur(gomb.dataset.szuro);
    });
  }

  function szur(szuro) {
    let lathatoDarab = 0;
    for (const oszlop of oszlopok) {
      const lathato = szuro === SZURO_MIND || oszlop.dataset.tipus === szuro;
      oszlop.hidden = !lathato;
      if (lathato) {
        lathatoDarab += 1;
      }
    }
    szuroGombokatFrissit(gombok, szuro);
    szamlalo.textContent = `${lathatoDarab} faj látható`;
  }
}

const fajSzuro = document.querySelector('.faj-szuro');
if (fajSzuro) {
  initFajSzuro(fajSzuro);
}

function initHangok(gombok) {
  const lejatszo = new Audio();
  lejatszo.preload = 'none';
  const allapotSor = document.getElementById('hang-allapot');
  let aktivGomb = null;

  for (const gomb of gombok) {
    const hangulatHang = gomb.dataset.hang.includes('hangulat');
    gomb.dataset.eredetiFelirat = gomb.querySelector('.hang-felirat').textContent;
    gomb.dataset.alapIkon = hangulatHang ? 'music-note-beamed' : 'volume-up';
    gomb.addEventListener('click', function () {
      gombraKattintott(gomb);
    });
  }

  lejatszo.addEventListener('ended', function () {
    if (aktivGomb === null) {
      return;
    }
    const nev = aktivGomb.dataset.eredetiFelirat;
    leallit();
    allapotSortKiir(`Véget ért: ${nev}.`);
  });

  function gombraKattintott(gomb) {
    if (aktivGomb === gomb) {
      leallit();
      allapotSortKiir('A hang leállt.');
      return;
    }
    lejatszastIndit(gomb);
  }

  function lejatszastIndit(gomb) {
    leallit();
    aktivGomb = gomb;
    toltesAllapotbaAllit(gomb);
    allapotSor.setAttribute('aria-busy', 'true');
    allapotSor.textContent = `Betöltés: ${gomb.dataset.eredetiFelirat}…`;
    lejatszo.src = gomb.dataset.hang;
    lejatszo.play()
      .then(function () {
        lejatszasElindult(gomb);
      })
      .catch(function (hiba) {
        lejatszasSikertelen(gomb, hiba);
      });
  }

  function lejatszasElindult(gomb) {
    if (aktivGomb !== gomb) {
      return;
    }
    lejatszasAllapotbaAllit(gomb);
    allapotSortKiir(`Most szól: ${gomb.dataset.eredetiFelirat}.`);
  }

  function lejatszasSikertelen(gomb, hiba) {
    const gombMarNemAktiv = aktivGomb !== gomb;
    const lejatszasMegszakadt = hiba.name === 'AbortError';
    if (gombMarNemAktiv || lejatszasMegszakadt) {
      return;
    }
    leallit();
    allapotSortKiir(`Nem sikerült lejátszani: ${gomb.dataset.eredetiFelirat}. Kattints újra a gombra; ha most sem szól, ellenőrizd az internetkapcsolatot és a hangerőt.`);
  }

  function leallit() {
    lejatszo.pause();
    lejatszo.currentTime = 0;
    if (aktivGomb !== null) {
      alaphelyzetbeAllit(aktivGomb);
    }
    aktivGomb = null;
  }

  function allapotSortKiir(szoveg) {
    allapotSor.removeAttribute('aria-busy');
    allapotSor.textContent = szoveg;
  }
}

function alaphelyzetbeAllit(gomb) {
  jeletEsFeliratotCserel(gomb, diszitoIkontKeszit(gomb.dataset.alapIkon), gomb.dataset.eredetiFelirat);
  gomb.classList.remove('szol');
  gomb.setAttribute('aria-pressed', 'false');
  gomb.removeAttribute('aria-busy');
}

function toltesAllapotbaAllit(gomb) {
  szelessegetRogzit(gomb);
  jeletEsFeliratotCserel(gomb, toltesJeletKeszit(), gomb.dataset.eredetiFelirat);
  gomb.classList.remove('szol');
  gomb.setAttribute('aria-pressed', 'true');
  gomb.setAttribute('aria-busy', 'true');
}

function lejatszasAllapotbaAllit(gomb) {
  szelessegetRogzit(gomb);
  jeletEsFeliratotCserel(gomb, diszitoIkontKeszit('stop-fill'), 'Leállítás');
  gomb.classList.add('szol');
  gomb.setAttribute('aria-pressed', 'true');
  gomb.removeAttribute('aria-busy');
}

function szelessegetRogzit(gomb) {
  if (gomb.style.minWidth === '') {
    gomb.style.minWidth = `${gomb.getBoundingClientRect().width}px`;
  }
}

function jeletEsFeliratotCserel(gomb, ujJel, felirat) {
  gomb.firstElementChild.replaceWith(ujJel);
  gomb.querySelector('.hang-felirat').textContent = felirat;
}

function toltesJeletKeszit() {
  const jel = elemetKeszit('span', 'spinner-border');
  jel.setAttribute('aria-hidden', 'true');
  return jel;
}

const hangGombok = document.querySelectorAll('.hang-gomb');
if (hangGombok.length > 0) {
  initHangok(hangGombok);
}

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

const HELYES_VALASZ_INDEXE = 0;
const SZINTE_HIBATLAN_PONTSZAM = 8;
const JO_PONTSZAM = 5;
const LEBEGO_MENU_HELYE = 120;
const VALASZOK_HELYE = 160;

function initKviz(kvizElem) {
  const kezdoResz = document.getElementById('kviz-kezdo');
  const kerdesResz = document.getElementById('kviz-kerdes-resz');
  const eredmenyResz = document.getElementById('kviz-eredmeny');
  const szamlalo = document.getElementById('kviz-szamlalo');
  const pontKiiras = document.getElementById('kviz-pont');
  const sav = document.getElementById('kviz-sav');
  const savBelso = document.getElementById('kviz-sav-belso');
  const kerdesSzoveg = document.getElementById('kviz-kerdes-szoveg');
  const valaszDoboz = document.getElementById('kviz-valaszok');
  const visszajelzes = document.getElementById('kviz-visszajelzes');
  const tovabbGomb = document.getElementById('kviz-tovabb');
  const kerdesekSzama = KVIZ_KERDESEK.length;

  let kevertKerdesek = [];
  let kerdesIndex = 0;
  let pont = 0;

  tovabbGomb.addEventListener('click', tovabbLep);
  document.getElementById('kviz-indit').addEventListener('click', indit);
  document.getElementById('kviz-ujra').addEventListener('click', indit);
  for (const link of document.querySelectorAll('[data-indit][href="#kviz"]')) {
    link.addEventListener('click', fejlecGombbalIndit);
  }
  animalastBekapcsolKezdoallapotUtan(sav);

  function indit() {
    kevertKerdesek = masolatotKever(KVIZ_KERDESEK);
    kerdesIndex = 0;
    pont = 0;
    pontKiiras.textContent = '0';
    kezdoResz.hidden = true;
    eredmenyResz.hidden = true;
    kerdesResz.hidden = false;
    kerdestMutat();
    kerdestLathatovaTesz();
  }

  function tovabbLep() {
    if (ezAzUtolsoKerdes()) {
      eredmenytMutat();
      return;
    }
    kerdesIndex += 1;
    kerdestMutat();
    kerdestLathatovaTesz();
  }

  function fejlecGombbalIndit(esemeny) {
    esemeny.preventDefault();
    const kvizFolyamatban = !kerdesResz.hidden;
    if (kvizFolyamatban) {
      kerdestLathatovaTesz();
    } else {
      indit();
    }
  }

  function kerdestMutat() {
    const kerdes = kevertKerdesek[kerdesIndex];
    haladastMutat();
    kerdesSzoveg.textContent = kerdes.kerdes;
    visszajelzes.replaceChildren();
    visszajelzes.className = 'kviz-visszajelzes';
    tovabbGomb.hidden = true;

    valaszDoboz.replaceChildren();
    for (const valasz of masolatotKever(kerdes.valaszok)) {
      valaszDoboz.append(valaszGombotKeszit(valasz, kerdes));
    }
  }

  function haladastMutat() {
    const sorszam = kerdesIndex + 1;
    szamlalo.textContent = `${sorszam}. kérdés / ${kerdesekSzama}`;
    sav.setAttribute('aria-valuenow', String(sorszam));
    sav.setAttribute('aria-valuetext', `${sorszam}. kérdés a ${kerdesekSzama}-ből`);
    savotBeallit(savBelso, sorszam / kerdesekSzama);
  }

  function valaszGombotKeszit(valasz, kerdes) {
    const helyesValasz = kerdes.valaszok[HELYES_VALASZ_INDEXE];
    const gomb = elemetKeszit('button', 'btn kviz-valasz', valasz);
    gomb.type = 'button';
    gomb.dataset.helyes = String(valasz === helyesValasz);
    gomb.addEventListener('click', function () {
      valaszol(gomb, kerdes);
    });
    return gomb;
  }

  function kerdestLathatovaTesz() {
    kerdesSzoveg.focus({ preventScroll: true });
    const kerdesTeteje = kerdesSzoveg.getBoundingClientRect().top;
    const menuTakarja = kerdesTeteje < LEBEGO_MENU_HELYE;
    const tulLentVan = kerdesTeteje > window.innerHeight - VALASZOK_HELYE;
    if (menuTakarja || tulLentVan) {
      kvizElem.scrollIntoView({ block: 'start' });
    }
  }

  function valaszol(valasztottGomb, kerdes) {
    const talalt = valasztottGomb.dataset.helyes === 'true';
    osszesGombotLetilt(valaszDoboz);
    helyesValasztMegjelol();

    if (talalt) {
      pont += 1;
    } else {
      gombotMegjelol(valasztottGomb, 'helytelen', 'x-lg', ' – a te válaszod');
    }
    pontKiiras.textContent = String(pont);

    visszajelzestMutat(talalt, kerdes);
    tovabbGombotMutat();
  }

  function helyesValasztMegjelol() {
    for (const gomb of valaszDoboz.children) {
      if (gomb.dataset.helyes === 'true') {
        gombotMegjelol(gomb, 'helyes', 'check-lg', ' – helyes válasz');
      }
    }
  }

  function visszajelzestMutat(talalt, kerdes) {
    let cim;
    if (talalt) {
      visszajelzes.className = 'kviz-visszajelzes jo';
      cim = ikonosCimetKeszit('check-lg', 'Helyes. ');
    } else {
      const helyesValasz = kerdes.valaszok[HELYES_VALASZ_INDEXE];
      visszajelzes.className = 'kviz-visszajelzes rossz';
      cim = ikonosCimetKeszit('x-lg', `Nem jó. A helyes válasz: ${helyesValasz}. `);
    }
    visszajelzes.replaceChildren(cim, kerdes.magyarazat);
  }

  function tovabbGombotMutat() {
    tovabbGomb.textContent = ezAzUtolsoKerdes() ? 'Eredmény megtekintése' : 'Következő kérdés';
    tovabbGomb.hidden = false;
    tovabbGomb.focus({ preventScroll: true });

    const gombKilogLent = tovabbGomb.getBoundingClientRect().bottom > window.innerHeight;
    if (gombKilogLent) {
      tovabbGomb.scrollIntoView({ block: 'nearest' });
    }
  }

  function ezAzUtolsoKerdes() {
    return kerdesIndex === kerdesekSzama - 1;
  }

  function eredmenytMutat() {
    const szazalek = Math.round((pont / kerdesekSzama) * 100);
    kerdesResz.hidden = true;
    eredmenyResz.hidden = false;
    document.getElementById('kviz-vegpont').textContent = String(pont);
    document.getElementById('kviz-ertekeles').textContent = `${szazalek}% – ${kvizErtekelestKeszit(pont, kerdesekSzama)}`;
    document.getElementById('kviz-eredmeny-cim').focus();
  }
}

function masolatotKever(tomb) {
  const masolat = tomb.slice();
  for (let i = masolat.length - 1; i > 0; i--) {
    const veletlenIndex = Math.floor(Math.random() * (i + 1));
    const csere = masolat[i];
    masolat[i] = masolat[veletlenIndex];
    masolat[veletlenIndex] = csere;
  }
  return masolat;
}

function ikonosCimetKeszit(ikonNev, szoveg) {
  const cim = elemetKeszit('strong', '', szoveg);
  cim.prepend(diszitoIkontKeszit(ikonNev));
  return cim;
}

function kvizErtekelestKeszit(pont, kerdesekSzama) {
  if (pont === kerdesekSzama) {
    return 'Minden kérdésre jól válaszoltál.';
  }
  if (pont >= SZINTE_HIBATLAN_PONTSZAM) {
    return 'Szinte mindent tudsz az esőerdőkről.';
  }
  if (pont >= JO_PONTSZAM) {
    return 'Jó alap. Olvasd át még egyszer az aloldalakat, aztán próbáld újra.';
  }
  return 'Olvasd át az aloldalakat, aztán próbáld újra: a kérdések sorrendje minden kitöltésnél más.';
}

const kvizElem = document.getElementById('kviz');
if (kvizElem) {
  initKviz(kvizElem);
}

const VALLALAS_KULCS = 'esoerdo-vallalasok';
const MENTESI_HIBA_MEGJEGYZES = ' (A böngésződ most nem engedi a mentést, de amíg itt vagy, a vállalásaid megmaradnak.)';

function initVallalasok(dobozok) {
  const sav = document.getElementById('vallalas-sav');
  const savBelso = document.getElementById('vallalas-sav-belso');
  const szoveg = document.getElementById('vallalas-szoveg');
  const torlesGomb = document.getElementById('vallalas-torles');
  const osszesTipp = dobozok.length;

  const mentettTippek = mentettTippeketBetolt();
  for (const doboz of dobozok) {
    doboz.checked = mentettTippek.includes(doboz.dataset.tipp);
    doboz.addEventListener('change', mentEsFrissit);
  }
  torlesGomb.addEventListener('click', function () {
    for (const doboz of dobozok) {
      doboz.checked = false;
    }
    mentEsFrissit();
  });

  kijelzestFrissit();
  animalastBekapcsolKezdoallapotUtan(sav);

  function mentEsFrissit() {
    const mentesSikerult = tippeketMent(bejeloltTippek());
    kijelzestFrissit(mentesSikerult);
  }

  function bejeloltTippek() {
    const tippek = [];
    for (const doboz of dobozok) {
      if (doboz.checked) {
        tippek.push(doboz.dataset.tipp);
      }
    }
    return tippek;
  }

  function kijelzestFrissit(mentesSikerult = true) {
    const vallaltDarab = bejeloltTippek().length;
    sav.setAttribute('aria-valuenow', String(vallaltDarab));
    sav.setAttribute('aria-valuetext', `${vallaltDarab} vállalás a ${osszesTipp}-ből`);
    savotBeallit(savBelso, vallaltDarab / osszesTipp);

    let uzenet = vallalasUzenetetKeszit(vallaltDarab, osszesTipp);
    if (!mentesSikerult) {
      uzenet += MENTESI_HIBA_MEGJEGYZES;
    }
    if (szoveg.textContent !== uzenet) {
      szoveg.textContent = uzenet;
    }
    torlesGomb.disabled = vallaltDarab === 0;
  }
}

function mentettTippeketBetolt() {
  try {
    const mentettSzoveg = window.localStorage.getItem(VALLALAS_KULCS);
    if (mentettSzoveg === null) {
      return [];
    }
    const mentett = JSON.parse(mentettSzoveg);
    if (Array.isArray(mentett)) {
      return mentett;
    }
    return [];
  } catch {
    return [];
  }
}

function tippeketMent(tippek) {
  try {
    window.localStorage.setItem(VALLALAS_KULCS, JSON.stringify(tippek));
    return true;
  } catch {
    return false;
  }
}

function vallalasUzenetetKeszit(vallaltDarab, osszesDarab) {
  if (vallaltDarab === 0) {
    return 'Még nem vállaltál egy tippet sem.';
  }
  if (vallaltDarab === osszesDarab) {
    return `Mind a ${osszesDarab} tippet vállaltad.`;
  }
  return `${vallaltDarab} tippet vállaltál a ${osszesDarab}-ből.`;
}

const vallalasDobozok = document.querySelectorAll('.vallalas');
if (vallalasDobozok.length > 0) {
  initVallalasok(vallalasDobozok);
}

const JATEK_KEZDO = { erdo: 80, elovilag: 75, jolet: 45 };
const MUTATO_NEV = { erdo: 'Erdő', elovilag: 'Élővilág', jolet: 'Helyiek jóléte' };
const MUTATO_KULCSOK = Object.keys(MUTATO_NEV);
const MUTATO_MINIMUM = 0;
const MUTATO_MAXIMUM = 100;
const FENNTARTHATO_ERDO = 70;
const FENNTARTHATO_ELOVILAG = 70;
const FENNTARTHATO_JOLET = 55;
const ELTUNT_ERDO_HATARA = 45;
const SZEGENYSEGI_HATAR = 40;

const JATEK_HELYZETEK = [
  {
    cim: 'Fakitermelő cég ajánlata',
    leiras: 'Egy nagy fakitermelő cég sok pénzt ajánl azért, hogy kivághassa az erdő egy részét.',
    dontesek: [
      { szoveg: 'Elfogadod az ajánlatot, és engedélyezed a tarvágást.', hatas: { erdo: -20, elovilag: -15, jolet: 15 },
        kovetkezmeny: 'Sok fa eltűnt, az állatok élőhelye beszűkült. A pénz egy ideig jól jön, de a kivágott erdő évtizedek alatt sem nő vissza.' },
      { szoveg: 'Csak kíméletes, tanúsított (FSC) fakitermelést engedsz.', hatas: { erdo: -5, elovilag: -3, jolet: 8 },
        kovetkezmeny: 'A cég csak válogatva vághat ki fákat, és újakat ültet. Kevesebb a bevétel, de az erdő megmarad.' },
      { szoveg: 'Elutasítod az ajánlatot.', hatas: { erdo: 0, elovilag: 2, jolet: -5 },
        kovetkezmeny: 'Az erdő érintetlen marad, de a helyiek csalódottak, mert elmaradt a munkalehetőség.' },
    ],
  },
  {
    cim: 'Legelő vagy erdő?',
    leiras: 'A gazdák azt kérik, hogy felégethessenek egy erdőrészt új marhalegelőnek.',
    dontesek: [
      { szoveg: 'Engedélyezed az erdőégetést.', hatas: { erdo: -20, elovilag: -15, jolet: 10 },
        kovetkezmeny: 'A tűz hatalmas területet emésztett fel. A legelő talaja néhány év alatt kimerül, és a gazdák újabb erdőt kérnek majd.' },
      { szoveg: 'Segítesz a meglévő legelőket jobban kihasználni.', hatas: { erdo: 0, elovilag: 0, jolet: 6 },
        kovetkezmeny: 'Fák árnyékában legeltetnek, takarmányt termesztenek: ugyanakkora területen több állat fér el.' },
      { szoveg: 'Az erdő árnyékában termesztett kakaót és gyümölcsöt támogatod.', hatas: { erdo: 2, elovilag: 3, jolet: 4 },
        kovetkezmeny: 'Az erdei kertek jövedelmet adnak, és közben az erdő is megmarad.' },
    ],
  },
  {
    cim: 'Turisták érkeznének',
    leiras: 'Egy utazási iroda szállást építene, hogy a turisták megismerhessék az esőerdőt.',
    dontesek: [
      { szoveg: 'Nagy szállodát és utat építtetsz az erdő közepébe.', hatas: { erdo: -10, elovilag: -8, jolet: 10 },
        kovetkezmeny: 'Sok turista érkezik, de az új út mentén megindult az illegális fakivágás is.' },
      { szoveg: 'Kis, helyiek által vezetett ökoszállást támogatsz, helyi túravezetőkkel.', hatas: { erdo: 0, elovilag: 2, jolet: 10 },
        kovetkezmeny: 'A turisták azért fizetnek, hogy élő erdőt lássanak – így a helyieknek megéri megvédeni.' },
      { szoveg: 'Nem engedsz be turistákat.', hatas: { erdo: 0, elovilag: 0, jolet: -3 },
        kovetkezmeny: 'Az erdő nyugalma megmarad, de a vidék egy fontos bevételi lehetőségtől esik el.' },
    ],
  },
  {
    cim: 'Orvvadászok az erdőben',
    leiras: 'Orvvadászok jelentek meg, akik ritka papagájokat és majmokat fognak be eladásra.',
    dontesek: [
      { szoveg: 'Nem foglalkozol vele, erre nincs pénz.', hatas: { erdo: 0, elovilag: -15, jolet: 0 },
        kovetkezmeny: 'Egyre kevesebb papagáj és majom él az erdőben, néhány faj teljesen eltűnt a vidékről.' },
      { szoveg: 'Helyi erdőőröket alkalmazol.', hatas: { erdo: 2, elovilag: 10, jolet: 4 },
        kovetkezmeny: 'Az őrök munkát kaptak, az orvvadászat pedig szinte teljesen megszűnt.' },
      { szoveg: 'Szigorú büntetést vezetsz be, de nincs, aki ellenőrizze.', hatas: { erdo: 0, elovilag: -5, jolet: 0 },
        kovetkezmeny: 'A szabály papíron jó, de ellenőrzés nélkül az orvvadászok folytatják.' },
    ],
  },
  {
    cim: 'Aszály és tűzveszély',
    leiras: 'Rendkívül száraz év jön, az erdőben nagy a tűzveszély.',
    dontesek: [
      { szoveg: 'Tűzoltó csapatokat képzel ki, és megtiltod a tűzgyújtást.', hatas: { erdo: 0, elovilag: 2, jolet: -3 },
        kovetkezmeny: 'Néhány kisebb tűz kitört, de gyorsan eloltották. Az erdő nagy része megmenekült.' },
      { szoveg: 'Nem teszel semmit.', hatas: { erdo: -15, elovilag: -10, jolet: -5 },
        kovetkezmeny: 'Hatalmas erdőtűz pusztított, a füst miatt sok ember meg is betegedett.' },
      { szoveg: 'Engedélyezed a szokásos tarlóégetést.', hatas: { erdo: -10, elovilag: -6, jolet: 2 },
        kovetkezmeny: 'Az egyik tűz átterjedt az erdőre: száraz időben a tűz könnyen elszabadul.' },
    ],
  },
  {
    cim: 'Az őslakosok földjei',
    leiras: 'Az erdőben élő őslakos közösség hivatalos jogot kér az ősei által lakott földekre.',
    dontesek: [
      { szoveg: 'Megadod nekik a földjogot, és támogatod őket.', hatas: { erdo: 8, elovilag: 6, jolet: 8 },
        kovetkezmeny: 'Az őslakosok vigyáznak az erdőre, amelyben élnek. A kutatások szerint ahol biztos a földjoguk, ott sokkal kevesebb erdőt irtanak ki.' },
      { szoveg: 'Elutasítod, mert a földet egy bányacégnek adnád.', hatas: { erdo: -15, elovilag: -10, jolet: -5 },
        kovetkezmeny: 'A bánya szennyezte a folyót, az őslakosoknak el kellett hagyniuk az otthonukat.' },
      { szoveg: 'Elhalasztod a döntést.', hatas: { erdo: -3, elovilag: -2, jolet: -3 },
        kovetkezmeny: 'Amíg nem született döntés, illegális telepesek vágtak ki erdőt a területen.' },
    ],
  },
];

function initJatek(jatekElem) {
  const kezdoResz = document.getElementById('jatek-kezdo');
  const korResz = document.getElementById('jatek-kor');
  const vegeResz = document.getElementById('jatek-vege');
  const evKiiras = document.getElementById('jatek-ev');
  const helyzetCim = document.getElementById('jatek-helyzet-cim');
  const helyzetLeiras = document.getElementById('jatek-helyzet-leiras');
  const dontesDoboz = document.getElementById('jatek-dontesek');
  const kovetkezmeny = document.getElementById('jatek-kovetkezmeny');
  const tovabbGomb = document.getElementById('jatek-tovabb');
  const evekSzama = JATEK_HELYZETEK.length;

  let mutatoErtekek = { ...JATEK_KEZDO };
  let evIndex = 0;
  let naplo = [];

  tovabbGomb.addEventListener('click', tovabbLep);
  document.getElementById('jatek-indit').addEventListener('click', indit);
  document.getElementById('jatek-ujra').addEventListener('click', indit);
  for (const link of document.querySelectorAll('[data-indit][href="#jatek"]')) {
    link.addEventListener('click', fejlecGombbalIndit);
  }
  mutatokatFrissit();
  for (const kulcs of MUTATO_KULCSOK) {
    animalastBekapcsolKezdoallapotUtan(document.getElementById(`mutato-${kulcs}`));
  }

  function indit() {
    mutatoErtekek = { ...JATEK_KEZDO };
    evIndex = 0;
    naplo = [];
    mutatokatFrissit();
    kezdoResz.hidden = true;
    vegeResz.hidden = true;
    korResz.hidden = false;
    helyzetetMutat();
    jatekhozGorget();
  }

  function tovabbLep() {
    if (ezAzUtolsoEv()) {
      eredmenytMutat();
      return;
    }
    evIndex += 1;
    helyzetetMutat();
    jatekhozGorget();
  }

  function fejlecGombbalIndit(esemeny) {
    esemeny.preventDefault();
    const jatekFolyamatban = !korResz.hidden;
    if (jatekFolyamatban) {
      jatekhozGorget();
    } else {
      indit();
    }
  }

  function mutatokatFrissit() {
    for (const kulcs of MUTATO_KULCSOK) {
      const ertek = mutatoErtekek[kulcs];
      document.getElementById(`mutato-${kulcs}`).setAttribute('aria-valuenow', String(ertek));
      savotBeallit(document.getElementById(`mutato-${kulcs}-sav`), ertek / MUTATO_MAXIMUM);
      document.getElementById(`mutato-${kulcs}-ertek`).textContent = `${ertek}%`;
    }
  }

  function helyzetetMutat() {
    const helyzet = JATEK_HELYZETEK[evIndex];
    evKiiras.textContent = `${evIndex + 1}. év / ${evekSzama}`;
    helyzetCim.textContent = helyzet.cim;
    helyzetLeiras.textContent = helyzet.leiras;
    kovetkezmeny.replaceChildren();
    tovabbGomb.hidden = true;

    dontesDoboz.replaceChildren();
    for (const dontes of helyzet.dontesek) {
      dontesDoboz.append(dontesGombotKeszit(dontes, helyzet));
    }
    helyzetCim.focus({ preventScroll: true });
  }

  function dontesGombotKeszit(dontes, helyzet) {
    const gomb = elemetKeszit('button', 'btn jatek-dontes', dontes.szoveg);
    gomb.type = 'button';
    gomb.addEventListener('click', function () {
      dont(gomb, dontes, helyzet);
    });
    return gomb;
  }

  function dont(gomb, dontes, helyzet) {
    osszesGombotLetilt(dontesDoboz);
    gombotMegjelol(gomb, 'valasztott', 'check-lg', ' – a te döntésed');
    hatastAlkalmaz(dontes.hatas);
    mutatokatFrissit();
    naplo.push({ cim: helyzet.cim, dontes: dontes.szoveg });

    kovetkezmeny.replaceChildren(
      elemetKeszit('p', 'jatek-kovetkezmeny-szoveg', dontes.kovetkezmeny),
      elemetKeszit('p', 'jatek-valtozas', `Változás: ${valtozasSzovegetKeszit(dontes.hatas)}.`),
    );
    tovabbGomb.textContent = ezAzUtolsoEv() ? 'Eredmény megtekintése' : 'Következő év';
    tovabbGomb.hidden = false;
    tovabbGomb.focus({ preventScroll: true });
  }

  function hatastAlkalmaz(hatas) {
    for (const kulcs of MUTATO_KULCSOK) {
      mutatoErtekek[kulcs] = mutatoHatarokKozeSzorit(mutatoErtekek[kulcs] + hatas[kulcs]);
    }
  }

  function ezAzUtolsoEv() {
    return evIndex === evekSzama - 1;
  }

  function eredmenytMutat() {
    korResz.hidden = true;
    vegeResz.hidden = false;
    const mutatokSzovege = `Erdő: ${mutatoErtekek.erdo}%, élővilág: ${mutatoErtekek.elovilag}%, helyiek jóléte: ${mutatoErtekek.jolet}%.`;
    document.getElementById('jatek-ertekeles').textContent = `${mutatokSzovege} ${jatekErtekelestKeszit(mutatoErtekek)}`;
    dontesekOsszegzesetKiir();
    document.getElementById('jatek-vege-cim').focus({ preventScroll: true });
    jatekhozGorget();
  }

  function dontesekOsszegzesetKiir() {
    const osszegzes = document.getElementById('jatek-osszegzes');
    osszegzes.replaceChildren();
    for (let i = 0; i < naplo.length; i++) {
      const bejegyzes = naplo[i];
      osszegzes.append(elemetKeszit('li', '', `${i + 1}. év – ${bejegyzes.cim}: ${bejegyzes.dontes}`));
    }
  }

  function jatekhozGorget() {
    jatekElem.scrollIntoView({ block: 'start' });
  }
}

function mutatoHatarokKozeSzorit(ertek) {
  if (ertek < MUTATO_MINIMUM) {
    return MUTATO_MINIMUM;
  }
  if (ertek > MUTATO_MAXIMUM) {
    return MUTATO_MAXIMUM;
  }
  return ertek;
}

function valtozasSzovegetKeszit(hatas) {
  const reszek = [];
  for (const kulcs of MUTATO_KULCSOK) {
    const ertek = hatas[kulcs];
    reszek.push(`${MUTATO_NEV[kulcs]} ${elojeletKeszit(ertek)}${Math.abs(ertek)}`);
  }
  return reszek.join(', ');
}

function elojeletKeszit(ertek) {
  if (ertek > 0) {
    return '+';
  }
  if (ertek < 0) {
    return '−';
  }
  return '±';
}

function jatekErtekelestKeszit(mutatoErtekek) {
  const fenntarthato = mutatoErtekek.erdo >= FENNTARTHATO_ERDO
    && mutatoErtekek.elovilag >= FENNTARTHATO_ELOVILAG
    && mutatoErtekek.jolet >= FENNTARTHATO_JOLET;
  if (fenntarthato) {
    return 'Fenntartható eredmény: megőrizted az erdőt és az élővilágot, és közben az itt élők is jobban élnek. A valóságban is ez a cél.';
  }
  if (mutatoErtekek.erdo < ELTUNT_ERDO_HATARA) {
    return 'Az erdő nagy része eltűnt. A gyors haszon helyett hosszú távú kár lett a vége: a kivágott esőerdő emberöltők alatt sem nő vissza.';
  }
  if (mutatoErtekek.jolet < SZEGENYSEGI_HATAR) {
    return 'Az erdő megmaradt, de az itt élők nehezen boldogulnak. A legjobb megoldások azok, amelyek az embereknek is megélhetést adnak.';
  }
  return 'Kompromisszumos eredmény: az erdő egy része megmaradt, de lett volna jobb út is. Próbáld újra, és keresd azokat a döntéseket, amelyek egyszerre védik az erdőt és segítik az embereket.';
}

const jatekElem = document.getElementById('jatek');
if (jatekElem) {
  initJatek(jatekElem);
}
