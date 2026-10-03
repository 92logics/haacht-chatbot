(function () {
  "use strict";

  var UI = {
    nl: {
      lede: "Dit is een gescript prototype van 92 Logics. Het is geen officiële chatbot van Gemeente Haacht en geen offerte. Antwoorden komen alleen uit publieke pagina’s die op 3 oktober 2026 zijn opgehaald. Wat daar niet staat, wordt geweigerd.",
      badge: "Gescript · geen live AI",
      qLabel: "Vraag",
      placeholder: "Stel een vraag over contact, openingsuren, afspraak of noodnummers…",
      send: "Verstuur",
      sideTitle: "Bronnen in dit script",
      sideNote: "Geen aanbestedingsdocument geopend. Uren gelden alleen voor de week die op de contactpagina stond.",
      you: "Jij",
      bot: "Script (geen AI)",
      welcome: "Hallo. Ik beantwoord alleen wat op de opgehaalde pagina’s van haacht.be en de raadpleegomgeving staat. Probeer een suggestie of stel zelf een vraag.",
      sourceLabel: "Bron",
      chips: ["Openingsuren onthaal", "Afspraak maken", "eID / identiteit", "Noodnummers", "E-loket", "Waar staat dit niet?"]
    },
    en: {
      lede: "This is a scripted 92 Logics prototype. It is not an official Gemeente Haacht chatbot and not a bid. Answers use only public pages fetched on 3 October 2026. Anything those pages do not state is refused.",
      badge: "Scripted · no live AI",
      qLabel: "Question",
      placeholder: "Ask about contact, opening hours, appointments, or emergency numbers…",
      send: "Send",
      sideTitle: "Sources in this script",
      sideNote: "No procurement notice was opened. Hours are only the week shown on the contact page.",
      you: "You",
      bot: "Script (not AI)",
      welcome: "Hello. I only answer from the fetched haacht.be pages and the council publication site. Try a suggestion or ask your own question.",
      sourceLabel: "Source",
      chips: ["Reception hours", "Make an appointment", "eID / identity", "Emergency numbers", "E-counter", "What will you refuse?"]
    }
  };

  var SOURCES = [
    { href: "https://www.haacht.be/", label: "Startpagina haacht.be" },
    { href: "https://www.haacht.be/contact-gemeente-en-ocmw-haacht", label: "Onthaal gemeente & OCMW" },
    { href: "https://www.haacht.be/identiteit", label: "Identiteit" },
    { href: "https://www.haacht.be/maak-een-afspraak", label: "Maak een afspraak" },
    { href: "https://www.haacht.be/eloket", label: "Digitaal loket" },
    { href: "https://www.haacht.be/hulpnummers", label: "Hulp- en infonummers" },
    { href: "https://raadpleeg-haacht.onlinesmartcities.be/zittingen/25.1104.9816.4090", label: "Gemeenteraad 21 sep 2026" }
  ];

  var KB = [
    {
      id: "hours",
      keys: ["openingsuren", "opening hours", "open", "gesloten", "closed", "onthaal", "reception", "uren", "hours", "zaterdag", "saturday", "wanneer open", "when open", "email", "e-mail", "telefoon", "phone", "adres", "address", "contact"],
      src: ["https://www.haacht.be/contact-gemeente-en-ocmw-haacht"],
      nl: [
        "Onthaal gemeente & OCMW: Wespelaarsesteenweg 85, 3150 Haacht. Tel. 016 26 94 00. E-mail onthaal@haacht.be.",
        "De contactpagina toont alleen ‘deze week’ (28 september–4 oktober 2026), geen vast weekschema:",
        "maandag 28 sep: 09:00–13:00 en 14:00–17:00, open",
        "dinsdag 29 sep: 09:00–13:00 en 17:00–19:00, open",
        "woensdag 30 sep: 09:00–13:00 en 14:00–17:00, open",
        "donderdag 1 okt: 08:00–13:00 en 14:00–17:00, open",
        "vrijdag 2 okt: 09:00–13:00, open (geen namiddagblok op de pagina)",
        "zaterdag 3 okt en zondag 4 okt: gesloten",
        "Sluitingsdagen op diezelfde pagina, onder meer: 1 nov 2026 Allerheiligen, 2 nov Allerzielen, 11 nov Wapenstilstand, 25 dec Kerstmis, 26 dec tweede kerstdag, 1 jan 2027 Nieuwjaar, 29 mrt Paasmaandag, 1 mei Dag van de Arbeid, 6 mei O.H. Hemelvaart, 7 mei brugdag, 17 mei Pinkstermaandag, 11 jul Vlaamse feestdag, 21 jul nationale feestdag, 15 aug O.L.V. Hemelvaart. Allemaal als gesloten vermeld."
      ],
      en: [
        "Reception (Onthaal gemeente & OCMW): Wespelaarsesteenweg 85, 3150 Haacht. Phone 016 26 94 00. Email onthaal@haacht.be.",
        "The contact page shows only ‘this week’ (28 September–4 October 2026), not a standing weekly timetable:",
        "Monday 28 Sep: 09:00–13:00 and 14:00–17:00, open",
        "Tuesday 29 Sep: 09:00–13:00 and 17:00–19:00, open",
        "Wednesday 30 Sep: 09:00–13:00 and 14:00–17:00, open",
        "Thursday 1 Oct: 08:00–13:00 and 14:00–17:00, open",
        "Friday 2 Oct: 09:00–13:00, open (no afternoon block on the page)",
        "Saturday 3 Oct and Sunday 4 Oct: closed",
        "Closure days listed on that page include 1 Nov 2026 All Saints, 2 Nov All Souls, 11 Nov Armistice, 25 Dec Christmas, 26 Dec Boxing Day, 1 Jan 2027 New Year, 29 Mar Easter Monday, 1 May Labour Day, 6 May Ascension, 7 May bridge day, 17 May Whit Monday, 11 Jul Flemish holiday, 21 Jul national holiday, 15 Aug Assumption. Each is marked closed."
      ]
    },
    {
      id: "social",
      keys: ["sociale dienst", "social service", "ocmw", "socialedienst", "61 91", "619111", "email sociale", "social email"],
      src: ["https://www.haacht.be/contact-gemeente-en-ocmw-haacht"],
      nl: [
        "Sociale dienst: Wespelaarsesteenweg 85, 3150 Haacht. Tel. 016 61 91 11. E-mail socialedienst@haacht.be.",
        "De opgehaalde contactpagina geeft voor de sociale dienst geen aparte openingsuren. Die staan niet in dit script."
      ],
      en: [
        "Social service: Wespelaarsesteenweg 85, 3150 Haacht. Phone 016 61 91 11. Email socialedienst@haacht.be.",
        "The fetched contact page does not list separate opening hours for the social service. They are not in this script."
      ]
    },
    {
      id: "identity",
      keys: ["identiteit", "identity", "eid", "e-id", "paspoort", "passport", "kids-id", "kids id", "pin", "puk", "burgerzaken", "bevolkingsregister", "nationaliteit", "naam", "voornaam"],
      src: ["https://www.haacht.be/identiteit"],
      nl: [
        "Burgerzaken staat op de identiteitspagina met adres Wespelaarsesteenweg 85, 3150 Haacht, tel. 016 26 94 00, e-mail burgerzaken@haacht.be.",
        "De overzichtspagina Identiteit noemt deze onderwerpen, zonder tarieven, termijnen of documentenlijsten (die subpagina’s zijn niet opgehaald): aanpassing geslachtsregistratie en akte daarvan, akte Belgische nationaliteit, akte levenloos kind, akte naamsverandering, akte voornaamsverandering, elektronische identiteitskaart (eID), elektronische verblijfskaart voor een niet-Belgisch kind tot 12 jaar, gedeeld verblijf, handtekencertificaat activeren, internationaal paspoort, Kids-ID, PIN- en PUK-code aanvragen of deblokkeren, uittreksel uit het bevolkingsregister, familienaam wijzigen naar die van ouders of adoptanten, voornaam veranderen.",
        "Wat je moet meebrengen of hoeveel het kost, staat niet op de opgehaalde pagina."
      ],
      en: [
        "Civil affairs (Burgerzaken) is listed on the identity page at Wespelaarsesteenweg 85, 3150 Haacht, phone 016 26 94 00, email burgerzaken@haacht.be.",
        "The Identiteit overview names these topics. Fees, lead times and document checklists are not on the page that was fetched (the subpages were not opened): change of sex registration and the related certificate, Belgian nationality certificate, stillbirth certificate, surname-change certificate, first-name-change certificate, electronic ID card (eID), electronic residence card for a non-Belgian child under 12, shared residence, activating a signature certificate, international passport, Kids-ID, requesting or unblocking PIN and PUK, extract from the population register, changing the family name to that of parents or adopters, changing a first name.",
        "What to bring, and the cost, are not stated on the fetched page."
      ]
    },
    {
      id: "appointment",
      keys: ["afspraak", "appointment", "loket", "counter", "woonenergieloket", "omgeving", "boeken", "book"],
      src: ["https://www.haacht.be/maak-een-afspraak"],
      nl: [
        "De pagina ‘Maak een afspraak’ laat drie loketten kiezen:",
        "Burgerzaken → https://www.haacht.be/maak-een-afspraak-bij-burgerzaken",
        "Omgeving → https://www.haacht.be/maak-een-afspraak-bij-omgeving",
        "WoonEnergieloket → https://afspraak.docleas.eu/gemeente-haacht/afspraak/smart-select",
        "Die drie vervolgpagina’s zijn niet opgehaald. Dit script zegt niets over vrije uren, wat je moet meebrengen, of of een afspraak verplicht is."
      ],
      en: [
        "The ‘Maak een afspraak’ page offers three counters:",
        "Burgerzaken → https://www.haacht.be/maak-een-afspraak-bij-burgerzaken",
        "Omgeving → https://www.haacht.be/maak-een-afspraak-bij-omgeving",
        "WoonEnergieloket → https://afspraak.docleas.eu/gemeente-haacht/afspraak/smart-select",
        "Those three follow-on pages were not fetched. This script does not state free slots, what to bring, or whether an appointment is mandatory."
      ]
    },
    {
      id: "eloket",
      keys: ["e-loket", "eloket", "digitaal loket", "formulier", "form", "online", "attest", "aangifte"],
      src: ["https://www.haacht.be/eloket", "https://www.haacht.be/"],
      nl: [
        "De startpagina linkt ‘E-loket’ naar https://www.haacht.be/eloket. Die pagina heet ‘Digitaal loket’ en zegt ‘109 formulieren gevonden’.",
        "Voorbeelden van formuliernamen op die pagina (geen uitleg over voorwaarden): Adoptie - akte (met eID); Adreswijziging (naar of binnen Haacht) - aangifte; Bevolkingsregister - uittreksel (met eID); Belgische nationaliteit - akte en attest (met eID); Afvalcontainers (aanwezig en gewenst); Buurtfeest; Bezwaar tegen gemeentebelasting.",
        "Hoe je indient, of je eID nodig hebt buiten wat de titel zelf zegt, en de andere formulieren: niet samengevat hier. Open de pagina."
      ],
      en: [
        "The homepage links ‘E-loket’ to https://www.haacht.be/eloket. That page is titled ‘Digitaal loket’ and says ‘109 formulieren gevonden’ (109 forms found).",
        "Examples of form names on that page (no conditions were copied): adoption certificate (with eID); address change into or within Haacht; population-register extract (with eID); Belgian nationality certificate and attestation (with eID); waste containers; neighbourhood party; objection to a municipal tax.",
        "How to submit, whether an eID is required beyond the title itself, and the other forms are not summarised here. Open the page."
      ]
    },
    {
      id: "emergency",
      keys: ["nood", "emergency", "112", "100", "101", "1722", "antigif", "poison", "awel", "1712", "zelfmoord", "suicide", "1813", "tele-onthaal", "106", "child focus", "116", "politie", "police", "brandweer", "fire", "docstop"],
      src: ["https://www.haacht.be/hulpnummers"],
      nl: [
        "De pagina Hulp- en infonummers vermeldt onder meer:",
        "Medische spoed / brandweer: 100 of 112. Dringende politiehulp: 101. Niet-dringende brandweer (hevige wind, regen, stormtij, onweer): 1722.",
        "Antigifcentrum: 070 245 245. Awel (kinder- en jongerentelefoon): 102. Child Focus: 116 000. Meldpunt geweld, misbruik en kindermishandeling: 1712.",
        "Tele-onthaal: 106. Zelfmoordlijn: 1813. Docstop (verlies of diefstal eID/paspoort): 00800 2123 2123. Card Stop: 070 344 344.",
        "De pagina bevat nog veel andere lijnen. Dit script geeft geen medisch advies en belt niet voor je."
      ],
      en: [
        "The help-numbers page lists, among others:",
        "Medical emergency / fire: 100 or 112. Urgent police: 101. Non-urgent fire (heavy wind, rain, storm surge, thunderstorm): 1722.",
        "Poison centre: 070 245 245. Awel (children and youth): 102. Child Focus: 116 000. Violence, abuse and child-abuse reporting line: 1712.",
        "Tele-onthaal: 106. Suicide prevention line: 1813. Docstop (lost or stolen eID/passport): 00800 2123 2123. Card Stop: 070 344 344.",
        "The page lists many more lines. This script gives no medical advice and does not call anyone."
      ]
    },
    {
      id: "home",
      keys: ["startpagina", "homepage", "melden", "melding", "klacht", "vacature", "job", "zaal", "reserveren", "werken op openbaar", "besluiten", "nieuws", "news", "dorpsdichter", "deelwagen", "samen lezen", "den breughel", "huis van het kind"],
      src: ["https://www.haacht.be/"],
      nl: [
        "Snelkoppelingen op de startpagina (alleen het label en de link; de doelpagina’s zijn niet opgehaald, behalve e-loket en afspraak):",
        "Iets melden → https://www.haacht.be/melding-klacht",
        "E-loket → https://www.haacht.be/eloket",
        "Afspraak maken → https://www.haacht.be/maak-een-afspraak",
        "Werken op openbaar domein → https://www.haacht.be/projecten?taxonomie[1]=3",
        "Besluiten van je bestuur → https://raadpleeg-haacht.onlinesmartcities.be/",
        "Vacatures → https://www.haacht.be/vacatures",
        "Zaal reserveren → https://www.haacht.be/zaalverhuur",
        "Nieuwskoppen op de startpagina, zonder artikeltekst: Samen Lezen verbindt (2 okt 2026); Nieuwe deelwagen in Haacht-station (24 sep 2026); Word jij onze nieuwe dorpsdichter? (23 sep 2026); 20 jaar plantjesverkoop in Haacht: Feest mee! (10 sep 2026).",
        "Korte teksten op de startpagina: GC Den Breughel — een voorstelling meepikken of een locatie voor een evenement. Huis van het kind — als ouder en kind terecht voor opvoeden en opgroeien. Geen adressen of uren bij die blokken op de opgehaalde startpagina."
      ],
      en: [
        "Homepage shortcuts (label and link only; the destination pages were not fetched, except the e-counter and appointments):",
        "Report something (Iets melden) → https://www.haacht.be/melding-klacht",
        "E-loket → https://www.haacht.be/eloket",
        "Make an appointment → https://www.haacht.be/maak-een-afspraak",
        "Works on public domain → https://www.haacht.be/projecten?taxonomie[1]=3",
        "Council decisions → https://raadpleeg-haacht.onlinesmartcities.be/",
        "Vacancies → https://www.haacht.be/vacatures",
        "Reserve a hall → https://www.haacht.be/zaalverhuur",
        "News headlines on the homepage, without article text: Samen Lezen verbindt (2 Oct 2026); new shared car at Haacht station (24 Sep 2026); village-poet call (23 Sep 2026); 20 years of plant sale (10 Sep 2026).",
        "Short homepage blurbs: GC Den Breughel — see a show or find a venue. Huis van het kind — parenting and growing up. No address or hours sat with those blocks on the fetched homepage."
      ]
    },
    {
      id: "procedure",
      keys: ["aanbesteding", "tender", "chatbot", "ai-assistent", "ai assistent", "procedure", "gunnen", "bestek", "deadline", "offerte", "bid", "opdracht"],
      src: [
        "https://raadpleeg-haacht.onlinesmartcities.be/zittingen/25.1104.9816.4090",
        "https://raadpleeg-haacht.onlinesmartcities.be/zittingen/25.1104.6892.8818",
        "https://raadpleeg-haacht.onlinesmartcities.be/zittingen/25.1104.4986.3394"
      ],
      nl: [
        "Dit prototype is geen offerte en geen officieel systeem.",
        "Op de geopende agenda’s staat dossier 2026.02/ICT. De gemeenteraad van 21 september 2026 (punt 2026_GR_00200) keurde lastvoorwaarden, wijze van gunnen en de start van de procedure goed. De samenvatting zegt: AI-toepassingen gefaseerd invoeren via een centraal AI-platform; AI-assistenten voor beeldschermwerkers; een chatbot op de publieke websites; toegankelijkheid van informatie verbeteren, medewerkers ondersteunen in hun dagelijkse werking, en inspelen op concrete vragen vanuit de organisatie.",
        "Het college gaf op 9 juli 2026 gunstig advies (2026_CBS_01405) met dezelfde samenvatting, en keurde op 24 september 2026 de start van de procedure en publicatie goed (2026_CBS_01940). Die laatste samenvatting voegt geen extra inhoudelijke scope toe.",
        "De volledige agendapunten zijn niet gepubliceerd (de detailpagina’s gaven een fout). Er is geen live aanbestedingsbericht geopend op TED of e-Procurement. Deadline, waarde, contactmail van de opdracht, taalvereiste en gunningswijze in detail staan niet op de geopende pagina’s. Een aggregatorsite is niet als bron gebruikt."
      ],
      en: [
        "This prototype is not a bid and not an official system.",
        "The opened agendas use file 2026.02/ICT. The council of 21 September 2026 (item 2026_GR_00200) approved the specifications, the award method, and the start of the procedure. The summary says: phased introduction of AI through a central AI platform; AI assistants for desk workers; a chatbot on the public websites; improve access to information, support staff in daily work, and respond to concrete questions from the organisation.",
        "The executive board gave a favourable opinion on 9 July 2026 (2026_CBS_01405) with the same summary, and on 24 September 2026 approved starting the procedure and publication (2026_CBS_01940). That last summary adds no further scope.",
        "The full agenda items are not published (the detail pages returned an error). No live procurement notice was opened on TED or e-Procurement. Deadline, value, buyer email for the contract, language rules and the detailed award method are not on the opened pages. An aggregator site was not used as a source."
      ]
    },
    {
      id: "refuse-demo",
      keys: ["wat weiger", "what will you refuse", "niet gevonden", "buiten scope", "weet je niet", "kan je niet", "waar staat dit niet", "wat staat hier niet"],
      src: [],
      nl: [
        "Ik weiger alles wat de opgehaalde pagina’s niet zeggen. Voorbeelden: tarieven, wachttijden, afvalophaling, recyclagepark, zwembad, omgevingsvergunning in behandeling, een indieningsdeadline of een e-mailadres voor de AI-opdracht.",
        "Voor die vragen: bel onthaal 016 26 94 00 of kijk op https://www.haacht.be/. Dit venster doet geen aanvraag en stuurt geen mail."
      ],
      en: [
        "I refuse anything the fetched pages do not say. Examples: fees, waiting times, waste collection, the recycling park, a swimming pool, a permit in progress, a submission deadline, or an email address for the AI contract.",
        "For those questions call reception on 016 26 94 00 or use https://www.haacht.be/. This window files nothing and sends no email."
      ]
    }
  ];

  var lang = "nl";
  var log = document.getElementById("log");

  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function answer(query) {
    var q = norm(query);
    if (!q) return null;
    var best = null;
    var bestScore = 0;
    KB.forEach(function (item) {
      var score = 0;
      item.keys.forEach(function (k) {
        var nk = norm(k);
        if (!nk) return;
        if (q.indexOf(nk) !== -1) score += nk.length > 4 ? 3 : 2;
        else {
          nk.split(" ").forEach(function (w) {
            if (w.length > 3 && (" " + q + " ").indexOf(" " + w + " ") !== -1) score += 1;
          });
        }
      });
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    });
    if (!best || bestScore < 2) return { refuse: true };
    return { item: best };
  }

  function addMsg(role, html) {
    var div = document.createElement("div");
    div.className = "msg " + role + (html.indexOf("data-refuse") !== -1 ? " refuse" : "");
    div.innerHTML = html;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function linkify(s) {
    return escapeHtml(s).replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" rel="noopener">$1</a>'
    );
  }

  function renderAnswer(result) {
    var t = UI[lang];
    if (result.refuse) {
      var nl = "Dat staat niet op de pagina’s die voor dit script zijn opgehaald. Ik verzin geen uren, tarieven, termijnen of een contact voor de opdracht. Onthaal: 016 26 94 00, onthaal@haacht.be, of https://www.haacht.be/.";
      var en = "That is not on the pages fetched for this script. I will not invent hours, fees, deadlines, or a contact for the contract. Reception: 016 26 94 00, onthaal@haacht.be, or https://www.haacht.be/.";
      return '<span class="who">' + t.bot + '</span><p data-refuse="1">' + linkify(lang === "nl" ? nl : en) + "</p>";
    }
    var lines = result.item[lang].map(function (line) {
      return "<p>" + linkify(line) + "</p>";
    }).join("");
    var src = "";
    if (result.item.src.length) {
      src = '<p class="src">' + t.sourceLabel + ": " + result.item.src.map(function (u) {
        return '<a href="' + u + '" rel="noopener">' + escapeHtml(u.replace("https://", "")) + "</a>";
      }).join(" · ") + "</p>";
    }
    return '<span class="who">' + t.bot + "</span>" + lines + src;
  }

  function ask(text) {
    var t = UI[lang];
    addMsg("user", '<span class="who">' + t.you + "</span><p>" + escapeHtml(text) + "</p>");
    addMsg("bot", renderAnswer(answer(text)));
  }

  function paint() {
    var t = UI[lang];
    document.documentElement.lang = lang === "nl" ? "nl" : "en";
    document.getElementById("lede").textContent = t.lede;
    document.getElementById("mode-badge").textContent = t.badge;
    document.getElementById("q-label").textContent = t.qLabel;
    document.getElementById("q").setAttribute("placeholder", t.placeholder);
    document.getElementById("send").textContent = t.send;
    document.getElementById("side-title").textContent = t.sideTitle;
    document.getElementById("side-note").textContent = t.sideNote;
    document.getElementById("lang-nl").setAttribute("aria-pressed", lang === "nl" ? "true" : "false");
    document.getElementById("lang-en").setAttribute("aria-pressed", lang === "en" ? "true" : "false");
    var chips = document.getElementById("chips");
    chips.innerHTML = "";
    t.chips.forEach(function (label) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.addEventListener("click", function () { ask(label); });
      chips.appendChild(b);
    });
    var ul = document.getElementById("sources");
    ul.innerHTML = "";
    SOURCES.forEach(function (s) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = s.href;
      a.rel = "noopener";
      a.textContent = s.label;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  document.getElementById("lang-nl").addEventListener("click", function () { lang = "nl"; paint(); });
  document.getElementById("lang-en").addEventListener("click", function () { lang = "en"; paint(); });
  document.getElementById("composer").addEventListener("submit", function (e) {
    e.preventDefault();
    var q = document.getElementById("q");
    var text = q.value.trim();
    if (!text) return;
    q.value = "";
    ask(text);
  });

  paint();
  addMsg("bot", '<span class="who">' + UI[lang].bot + "</span><p>" + UI[lang].welcome + "</p>");
})();
