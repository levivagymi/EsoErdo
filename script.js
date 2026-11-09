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
