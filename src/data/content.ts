/* ------------------------------------------------------------------ */
/*  Comptalia — contenu pédagogique                                    */
/* ------------------------------------------------------------------ */

export type Lesson = {
  id: string;
  title: string;
  duration: number; // minutes
  intro: string;
  sections: { h: string; p: string }[];
  points: string[];
};

export type Module = {
  id: string;
  code: string;
  title: string;
  description: string;
  color: string;
  soft: string;
  lessons: Lesson[];
};

export const MODULES: Module[] = [
  {
    id: "fondamentaux",
    code: "MOD 01",
    title: "Fondamentaux & Plan Comptable",
    description:
      "Les principes qui gouvernent la comptabilité française et le maniement du PCG, socle de tout le reste.",
    color: "#0e5a3c",
    soft: "#e0eae0",
    lessons: [
      {
        id: "f1",
        title: "Les principes comptables",
        duration: 12,
        intro:
          "La comptabilité n'est pas une simple saisie : c'est un langage encadré par des principes qui garantissent une image fidèle de l'entreprise.",
        sections: [
          {
            h: "Pourquoi des principes ?",
            p: "Le Code de commerce impose que les comptes annuels soient réguliers, sincères et donnent une image fidèle du patrimoine, de la situation financière et du résultat. Les principes comptables rendent les états financiers comparables dans le temps et d'une entreprise à l'autre : c'est ce qui permet à un banquier, un investisseur ou l'administration fiscale de les lire avec confiance.",
          },
          {
            h: "Les incontournables",
            p: "Prudence : on enregistre une perte probable dès qu'elle est connue, jamais un gain tant qu'il n'est pas certain. Continuité d'exploitation : on établit les comptes en supposant que l'entreprise poursuivra son activité. Indépendance des exercices : chaque charge et chaque produit est rattaché à l'exercice qu'il concerne, d'où les écritures de cut-off. Permanence des méthodes : on conserve les mêmes règles d'un exercice à l'autre pour rester comparable.",
          },
        ],
        points: [
          "Image fidèle, régularité, sincérité : le trio exigé par le Code de commerce",
          "Prudence = provisions pour risques, jamais de profit anticipé",
          "Indépendance des exercices = fondement du cut-off (CCA, PCA, FNP, FAE)",
          "Changer de méthode exige une justification et une information en annexe",
        ],
      },
      {
        id: "f2",
        title: "Le PCG en 7 classes",
        duration: 15,
        intro:
          "Le Plan Comptable Général classe chaque opération dans un compte numéroté. Maîtriser la logique des classes, c'est savoir où ranger n'importe quelle écriture.",
        sections: [
          {
            h: "Comptes de bilan : classes 1 à 5",
            p: "Classe 1 : capitaux (capital, réserves, résultat, emprunts). Classe 2 : immobilisations (incorporelles, corporelles, financières) et leurs amortissements en 28. Classe 3 : stocks et en-cours. Classe 4 : tiers — clients (411), fournisseurs (401), État et TVA (445), personnel (421), organismes sociaux (431, 437). Classe 5 : comptes financiers, trésorerie (512 Banque, 530 Caisse) et concours bancaires courants (519).",
          },
          {
            h: "Comptes de gestion : classes 6 et 7",
            p: "Classe 6 : charges — achats (60), services extérieurs (61/62), impôts (63), charges de personnel (64), charges financières (66), dotations aux amortissements et provisions (68). Classe 7 : produits — ventes (70), production stockée (71), subventions (74), produits financiers (76), reprises (78). Astuce : 6 commence comme « six » pour les sorties, 7 comme « sept »… ciel pour les entrées !",
          },
        ],
        points: [
          "1-2-3-4-5 = bilan ; 6 = charges ; 7 = produits",
          "Les comptes en 28 et 39 sont des comptes soustractifs (amortissements, dépréciations)",
          "445 = État, TVA : 44566 déductible, 44571 collectée, 44551 à décaisser",
          "Le numéro de compte guide l'écriture : même racine, même famille",
        ],
      },
      {
        id: "f3",
        title: "L'organisation comptable",
        duration: 10,
        intro:
          "De la pièce justificative à la liasse fiscale : comprendre la chaîne documentaire permet de sécuriser la saisie et de préparer les contrôles.",
        sections: [
          {
            h: "La chaîne de traitement",
            p: "Tout commence par une pièce justificative (facture, relevé, bulletin). Les opérations sont enregistrées chronologiquement dans des journaux spécialisés — achats (ACH), ventes (VTE), banque (BQ), opérations diverses (OD). Le grand livre regroupe ensuite les écritures compte par compte, et la balance vérifie l'égalité des totaux débits/crédits et des soldes.",
          },
          {
            h: "Conservation et preuve",
            p: "Les livres comptables et les pièces justificatives doivent être conservés 10 ans (6 ans pour le droit fiscal en pratique de contrôle, 10 ans au titre commercial). La numérisation est admise sous conditions de fidélité et d'intégrité. Cette traçabilité est votre meilleure défense en cas de contrôle.",
          },
        ],
        points: [
          "Pas d'écriture sans pièce justificative datée",
          "Journaux spécialisés : ACH, VTE, BQ, OD (et paie)",
          "Balance : total débits = total crédits, sinon erreur de saisie",
          "Conservation des pièces : 10 ans",
        ],
      },
    ],
  },
  {
    id: "ecritures",
    code: "MOD 02",
    title: "Écritures & partie double",
    description:
      "Débit, crédit, lettrage, cut-off : la mécanique quotidienne du comptable, des écritures courantes jusqu'à la clôture.",
    color: "#17677a",
    soft: "#ddeae9",
    lessons: [
      {
        id: "e1",
        title: "Débit / Crédit sans se tromper",
        duration: 14,
        intro:
          "Le blocage n°1 des débutants disparaît quand on comprend la logique emploi/ressource plutôt que d'apprendre par cœur.",
        sections: [
          {
            h: "La partie double",
            p: "Chaque opération a une origine (la ressource, créditée) et une destination (l'emploi, débité). Le total des débits est toujours égal au total des crédits : c'est l'équation fondamentale qui permet à la balance de « cadrer ». Une écriture comporte donc au minimum deux lignes.",
          },
          {
            h: "Qui augmente où ?",
            p: "Un compte d'actif ou de charge augmente au débit, diminue au crédit. Un compte de passif, de capitaux propres ou de produit augmente au crédit, diminue au débit. Exemple : je règle un fournisseur par banque — la dette (401, passif) diminue : débit ; la banque (512, actif) diminue : crédit.",
          },
        ],
        points: [
          "Emploi = débit / Ressource = crédit",
          "Actif et charges : augmentent au débit",
          "Passif, capitaux propres et produits : augmentent au crédit",
          "Total débits = total crédits, sur chaque écriture et sur la balance",
        ],
      },
      {
        id: "e2",
        title: "Les écritures courantes",
        duration: 18,
        intro:
          "Achats, ventes, encaissements, paiements : 80 % du travail comptable tient dans une poignée de schémas d'écritures.",
        sections: [
          {
            h: "Achats et ventes",
            p: "Facture d'achat de marchandises 1 000 € HT, TVA 20 % : débit 607 (1 000) et 44566 TVA déductible (200), crédit 401 Fournisseur (1 200). Facture de vente : débit 411 Client (1 200), crédit 706 ou 707 (1 000) et 44571 TVA collectée (200). L'escompte de règlement s'enregistre en 665 (obtenu) ou 765 (accordé), base de TVA réduite.",
          },
          {
            h: "Banque et lettrage",
            p: "Le journal de banque enregistre encaissements (débit 512) et décaissements (crédit 512). Le lettrage consiste à associer chaque facture à son règlement (lettres A, B, C…) : ce qui n'est pas lettré reste dû ou à identifier. Le rapprochement bancaire compare le 512 au relevé pour expliquer les écarts (frais, chèques non encaissés…).",
          },
        ],
        points: [
          "Achat : 60x + 44566 au débit, 401 au crédit TTC",
          "Vente : 411 au débit TTC, 70x + 44571 au crédit",
          "Lettrage = associer facture et règlement, ligne à ligne",
          "Rapprochement bancaire : justifier chaque écart 512 / relevé",
        ],
      },
      {
        id: "e3",
        title: "Les travaux de clôture",
        duration: 20,
        intro:
          "Amortissements, provisions, cut-off : c'est à la clôture que la comptabilité devient de l'analyse. Le résultat se construit ici.",
        sections: [
          {
            h: "Amortissements et provisions",
            p: "L'amortissement constate la perte de valeur irréversible d'une immobilisation : débit 6811 Dotations aux amortissements, crédit 281 Amortissements. La provision anticipe une perte probable : risques et charges (151), dépréciations de créances (491) ou de stocks (391). On les reprend (781) quand le risque disparaît.",
          },
          {
            h: "Le cut-off",
            p: "Rattacher chaque flux au bon exercice : charges constatées d'avance (486) pour un loyer payé d'avance, produits constatés d'avance (487) pour une facturation anticipée, factures non parvenues (408) pour une livraison reçue sans facture, factures à établir (418) pour une prestation réalisée non facturée, charges à payer (428/438/448) et produits à recevoir.",
          },
        ],
        points: [
          "Amortissement : 681 / 281 — dépréciation irréversible",
          "Provision : perte probable, reprise en 78 quand le risque tombe",
          "CCA 486 / PCA 487 : décaler charges et produits déjà comptabilisés",
          "FNP 408 / FAE 418 : enregistrer ce qui est réalisé mais non facturé",
        ],
      },
    ],
  },
  {
    id: "tva",
    code: "MOD 03",
    title: "TVA & déclarations",
    description:
      "Collectée, déductible, à décaisser : la logique du mécanisme, l'exigibilité, les régimes de déclaration et les cas particuliers.",
    color: "#c08a24",
    soft: "#f4e6c4",
    lessons: [
      {
        id: "t1",
        title: "Le mécanisme de la TVA",
        duration: 13,
        intro:
          "La TVA est payée par le consommateur final ; l'entreprise n'est qu'un collecteur neutre. Comprendre ce circuit évite la moitié des erreurs.",
        sections: [
          {
            h: "Collectée, déductible, à payer",
            p: "Sur chaque vente, l'entreprise facture de la TVA collectée (compte 4457). Sur chaque achat, elle paie de la TVA déductible (44566 sur biens et services, 44562 sur immobilisations). Chaque période, elle reverse la différence : TVA à décaisser = collectée − déductible (44551). Si la déductible excède la collectée, naît un crédit de TVA, reportable ou remboursable.",
          },
          {
            h: "Les taux",
            p: "Taux normal : 20 % (majorité des biens et services). Taux intermédiaire : 10 % (restauration, transports, travaux de rénovation). Taux réduit : 5,5 % (produits de première nécessité, rénovation énergétique). Taux particulier : 2,1 % (médicaments remboursables, presse). Le taux dépend de la nature de l'opération, pas du client.",
          },
        ],
        points: [
          "TVA à décaisser = collectée (4457) − déductible (4456)",
          "L'entreprise est neutre : c'est le client final qui supporte la TVA",
          "20 / 10 / 5,5 / 2,1 : les quatre taux métropolitains",
          "Crédit de TVA : reportable, ou remboursable sous conditions",
        ],
      },
      {
        id: "t2",
        title: "Exigibilité & déclarations",
        duration: 15,
        intro:
          "Quand la TVA devient-elle due ? Et sur quel formulaire ? Deux questions qui conditionnent le calendrier de vos déclarations.",
        sections: [
          {
            h: "Le fait générateur et l'exigibilité",
            p: "Pour les livraisons de biens, la TVA est exigible à la livraison (transfert de propriété). Pour les prestations de services, à l'encaissement du prix, sauf option pour les débits. Les acomptes sur prestations sont taxés dès leur encaissement. Retenir : biens = livraison, services = encaissement.",
          },
          {
            h: "Les régimes de déclaration",
            p: "Le réel normal déclare en CA3, mensuellement (ou trimestriellement si la TVA annuelle est faible). Le réel simplifié déclare en CA12 annuelle avec deux acomptes semestriels. Le délai de détection : le droit à déduction s'exerce sur la déclaration de la période d'exigibilité, avec régularisation possible jusqu'au 31 décembre de la deuxième année suivante.",
          },
        ],
        points: [
          "Biens : exigibilité à la livraison — Services : à l'encaissement",
          "CA3 mensuelle (réel normal) / CA12 annuelle (réel simplifié)",
          "Acomptes sur prestations taxés dès encaissement",
          "Droit à déduction : régularisation possible jusqu'au 31/12 de N+2",
        ],
      },
      {
        id: "t3",
        title: "Cas particuliers : intracom & franchise",
        duration: 14,
        intro:
          "Opérations européennes, franchise en base, autoliquidation : les situations qui sortent du schéma classique et piègent aux examens.",
        sections: [
          {
            h: "L'autoliquidation intracommunautaire",
            p: "Pour un achat de biens auprès d'un fournisseur UE (avec numéro de TVA intracommunautaire), l'opération est exonérée chez le fournisseur : c'est l'acheteur français qui autoliquide la TVA. Il déclare simultanément la TVA collectée (4452) et la TVA déductible (445662) : l'opération est neutre en trésorerie mais obligatoire en déclaration (EMEBI/état récapitulatif).",
          },
          {
            h: "La franchise en base de TVA",
            p: "Sous certains seuils de chiffre d'affaires (85 000 € pour la vente, 37 500 € pour les services, seuils de référence), l'entreprise ne facture pas de TVA (« TVA non applicable, art. 293 B du CGI ») et n'en déduit pas. Au-delà, passage obligatoire au réel. Attention : la franchise ne dispense ni de comptabilité, ni des obligations d'e-reporting à venir.",
          },
        ],
        points: [
          "Intracom : le client français autoliquide (4452 / 445662)",
          "Franchise en base : pas de TVA facturée, pas de déduction",
          "Mention obligatoire sur facture : « TVA non applicable, art. 293 B du CGI »",
          "Seuils : 85 000 € (ventes) / 37 500 € (services) — à vérifier chaque année",
        ],
      },
    ],
  },
  {
    id: "paie",
    code: "MOD 04",
    title: "Paie & charges sociales",
    description:
      "Du brut au net social, la DSN, et la comptabilisation complète du bulletin : le pont entre le social et la compta.",
    color: "#9c4a6c",
    soft: "#efdfe6",
    lessons: [
      {
        id: "p1",
        title: "Du brut au net",
        duration: 16,
        intro:
          "Le bulletin de paie est une cascade : chaque ligne retranche ou ajoute quelque chose. Savoir la lire ligne à ligne est indispensable.",
        sections: [
          {
            h: "La cascade du bulletin",
            p: "Salaire brut (salaire de base + heures sup + primes) → cotisations salariales (retraite, chômage ex-salarié, retraite complémentaire) → CSG déductible et non déductible sur 98,25 % du brut → net avant impôt → prélèvement à la source (PAS) selon le taux personnalisé transmis par la DGFiP → net payé. Le montant net social figure obligatoirement sur le bulletin.",
          },
          {
            h: "Les masses à connaître",
            p: "Le PASS (plafond annuel de la sécurité sociale) sert de base à la plupart des cotisations et plafonnements. Le salaire minimum (SMIC) est revalorisé régulièrement. Certaines primes bénéficient d'exonérations (épargne salariale, partage de la valeur) — toujours vérifier les plafonds d'exonération avant de les paramétrer.",
          },
        ],
        points: [
          "Brut − cotisations salariales − CSG/CRDS = net avant impôt",
          "PAS : taux personnalisé transmis via la DSN (compte 4421)",
          "Le montant net social est une mention obligatoire du bulletin",
          "PASS et SMIC : deux paramètres à mettre à jour chaque année",
        ],
      },
      {
        id: "p2",
        title: "Charges patronales & DSN",
        duration: 12,
        intro:
          "Le coût réel d'un salarié dépasse largement le brut. Et depuis la DSN, paie et déclarations sociales ne font plus qu'un flux.",
        sections: [
          {
            h: "Le coût employeur",
            p: "Aux charges salariales s'ajoutent les cotisations patronales : sécurité sociale, retraite complémentaire, chômage, prévoyance, formation, taxe d'apprentissage. L'ensemble représente globalement 25 à 42 % du brut selon le niveau de salaire, avec allègements généraux sur les bas salaires (réduction Fillon). Coût total = brut + charges patronales.",
          },
          {
            h: "La DSN",
            p: "La Déclaration Sociale Nominative transmet chaque mois, en un seul flux, la paie et l'essentiel des déclarations sociales (URSSAF, retraite, Pôle emploi). Elle remplace les déclarations isolées et alimente les droits des salariés en quasi temps réel. Sa fiabilité dépend directement de la qualité du paramétrage de paie.",
          },
        ],
        points: [
          "Coût employeur = brut + cotisations patronales (≈ +25 à 42 %)",
          "Allègements généraux sur les bas salaires : à recalculer chaque année",
          "DSN mensuelle : un flux unique vers tous les organismes",
          "DSN erronée = droits sociaux erronés : double enjeu compta/social",
        ],
      },
      {
        id: "p3",
        title: "Comptabiliser la paie",
        duration: 14,
        intro:
          "Quatre écritures suffisent pour boucler le cycle mensuel de paie : constatation, PAS, charges patronales et paiement.",
        sections: [
          {
            h: "Les écritures types",
            p: "Constatation du brut : débit 641 Rémunérations, crédit 431 Sécurité sociale (part salariale), 437 Retraite complémentaire, 4421 PAS, et 421 Personnel pour le net à payer. Charges patronales : débit 645, crédit 431/437/438. Paiement des salaires : débit 421, crédit 512. Paiement des organismes : débit 431/437/4421, crédit 512.",
          },
          {
            h: "Points de vigilance",
            p: "Le compte 421 doit être soldé après paiement — un solde résiduel signale une retenue ou une erreur. Provisions pour congés payés (12) et charges associées : à comptabiliser en clôture, y compris les charges patronales correspondantes et l'incidence des jours de fractionnement.",
          },
        ],
        points: [
          "641 au débit du brut ; 421 crédité du net à payer",
          "4421 = PAS reversé à la DGFiP",
          "645 = charges patronales ; 421 soldé après paiement",
          "En clôture : provision congés payés + charges patronales afférentes",
        ],
      },
    ],
  },
  {
    id: "etats",
    code: "MOD 05",
    title: "États financiers & analyse",
    description:
      "Bilan, compte de résultat, SIG et ratios : transformer la saisie en lecture économique de l'entreprise.",
    color: "#5b6472",
    soft: "#e3e6e9",
    lessons: [
      {
        id: "s1",
        title: "Lire un bilan",
        duration: 15,
        intro:
          "Le bilan est une photographie : ce que l'entreprise possède (actif) et ce qu'elle doit (passif), toujours en équilibre.",
        sections: [
          {
            h: "Actif / Passif",
            p: "À l'actif : immobilisations (long terme), stocks, créances clients, trésorerie. Au passif : capitaux propres (capital, réserves, résultat) puis dettes — financières, fiscales et sociales, fournisseurs. Équation de base : Actif = Passif. Le fonds de roulement net global (FRNG) = capitaux permanents − actifs immobilisés : il finance le cycle d'exploitation.",
          },
          {
            h: "L'équilibre financier",
            p: "La règle d'or : les emplois longs sont financés par des ressources longues. FRNG positif − BFR = trésorerie nette. Si le BFR (stocks + créances − dettes fournisseurs et fiscales) absorbe plus que le FRNG, la trésorerie devient négative : c'est le signal classique des crises de croissance.",
          },
        ],
        points: [
          "Actif = Passif, toujours",
          "FRNG = ressources stables − emplois stables",
          "Trésorerie nette = FRNG − BFR",
          "Un BFR qui gonfle plus vite que le CA assèche la trésorerie",
        ],
      },
      {
        id: "s2",
        title: "Compte de résultat & SIG",
        duration: 16,
        intro:
          "Le compte de résultat raconte l'année : produits contre charges. Les SIG le découpent en étapes pour révéler où se crée la valeur.",
        sections: [
          {
            h: "Les trois niveaux",
            p: "Résultat d'exploitation : l'activité courante (produits et charges d'exploitation). Résultat financier : coût de l'endettement, placements, changes. Résultat exceptionnel : cessions d'immobilisations, pénalités, événements inhabituels. Résultat net = exploitation + financier + exceptionnel − participation − impôt sur les bénéfices.",
          },
          {
            h: "Les soldes intermédiaires de gestion",
            p: "Marge commerciale (707 − 607 ± variation de stocks 37) pour le négoce ; valeur ajoutée = marge + production − consommations en provenance des tiers ; excédent brut d'exploitation (EBE) = VA + subventions d'exploitation + impôts et taxes (hors IS) − charges de personnel ; résultat d'exploitation = EBE + reprises − dotations. La CAF ≈ résultat net + dotations (68) − reprises (78) ± valeurs nettes comptables de cessions.",
          },
        ],
        points: [
          "EBE : la richesse brute créée par l'exploitation, avant amortissements",
          "Marge commerciale = ventes de marchandises − coût d'achat",
          "CAF = capacité à générer de la trésorerie interne",
          "Résultat net ≠ trésorerie : les décalages s'expliquent par le BFR",
        ],
      },
      {
        id: "s3",
        title: "Les ratios qui comptent",
        duration: 12,
        intro:
          "Cinq ratios suffisent à poser un diagnostic rapide de solvabilité, de rentabilité et de gestion — ceux que les banques regardent en premier.",
        sections: [
          {
            h: "Structure et solvabilité",
            p: "Autonomie financière = capitaux propres / total bilan (viser > 20-30 %). Capacité de remboursement = dettes financières / CAF (au-delà de 3-4 ans, tension). Liquidité générale = actif circulant / passif circulant (≥ 1 : l'entreprise couvre ses dettes court terme).",
          },
          {
            h: "Gestion et rentabilité",
            p: "DSO (délai de paiement clients) = créances clients TTC / CA TTC × 360 : chaque jour de retard client coûte de la trésorerie. Rotation des stocks = achats / stock moyen. Seuil de rentabilité = charges fixes / taux de marge sur coûts variables : le chiffre d'affaires à partir duquel l'entreprise couvre tous ses coûts.",
          },
        ],
        points: [
          "Autonomie financière : capitaux propres / total bilan",
          "Dettes financières / CAF : le baromètre bancaire du remboursement",
          "DSO clients : un jour gagné = de la trésorerie libérée",
          "Seuil de rentabilité = charges fixes / taux de marge variable",
        ],
      },
    ],
  },
  {
    id: "fiscal",
    code: "MOD 06",
    title: "Fiscalité & conformité",
    description:
      "IS, taxes locales, FEC et facturation électronique : le cadre fiscal de l'entreprise et les obligations qui évoluent vite.",
    color: "#557a3b",
    soft: "#e4ebd9",
    lessons: [
      {
        id: "i1",
        title: "L'impôt sur les sociétés",
        duration: 15,
        intro:
          "Du résultat comptable au résultat fiscal : réintégrations, déductions, taux et acomptes. Le cœur de la liasse fiscale.",
        sections: [
          {
            h: "Du comptable au fiscal",
            p: "Le résultat fiscal part du résultat comptable, puis retraité : réintégrations (amortissements excédentaires, charges non déductibles comme certaines amendes, fraction de taxe sur les véhicules de société), déductions (produits déjà imposés, reports déficitaires). Les déficits sont reportables en avant sans limite de temps, avec un plafond d'imputation de 1 M€ + 50 % du bénéfice excédent.",
          },
          {
            h: "Taux et paiement",
            p: "Taux normal : 25 %. Taux réduit de 15 % sur la fraction de bénéfice jusqu'à 42 500 € pour les PME dont le chiffre d'affaires reste sous 10 M€ (capital détenu à 75 % au moins par des personnes physiques). L'IS se règle par quatre acomptes (15 mars, 15 juin, 15 septembre, 15 décembre) calculés sur l'IS de l'exercice précédent, avec régularisation au solde (relevé 2572).",
          },
        ],
        points: [
          "Résultat fiscal = résultat comptable ± retraitements extra-comptables",
          "IS : 25 % de droit commun, 15 % (PME) jusqu'à 42 500 € de bénéfice",
          "4 acomptes + solde via le relevé 2572",
          "Déficits reportables en avant : 1 M€ + 50 % du bénéfice au-delà",
        ],
      },
      {
        id: "i2",
        title: "Taxes locales et sectorielles",
        duration: 10,
        intro:
          "CFE, CVAE, taxe d'apprentissage : des taxes qui survivent aux réformes et restent à budgéter chaque année.",
        sections: [
          {
            h: "La contribution économique territoriale",
            p: "La CFE est due par toute entreprise dans chaque commune où elle dispose de locaux ou de terrains : base = valeur locative foncière, avec cotisation minimum. La CVAE, sa composante calculée sur la valeur ajoutée, a été engagée dans une trajectoire de suppression progressive — vérifier chaque loi de finances le taux applicable avant de la provisionner.",
          },
          {
            h: "Autres taxes à provisionner",
            p: "Taxe d'apprentissage (0,68 % de la masse salariale, dont une part fléchée vers la formation), contribution à la formation professionnelle continue, TASCOM pour les grandes surfaces, taxes foncières sur les locaux possédés. La règle comptable : les provisions se comptabilisent à la clôture (63 / 448), pas à l'appel d'acompte.",
          },
        ],
        points: [
          "CFE : due commune par commune, sur la valeur locative",
          "CVAE : en extinction progressive — taux à confirmer chaque année",
          "Taxe d'apprentissage ≈ 0,68 % de la masse salariale",
          "Provisionner les taxes en clôture : 63 / 448",
        ],
      },
      {
        id: "i3",
        title: "FEC, e-facturation, contrôles",
        duration: 13,
        intro:
          "La comptabilité devient un flux de données auditable en continu. FEC et facturation électronique changent le quotidien du comptable.",
        sections: [
          {
            h: "Le FEC",
            p: "Le Fichier des Écritures Comptables doit être produit dès l'ouverture d'un contrôle, sous peine d'amende (5 000 € minimum). Il contient toutes les écritures avec date, pièce, libellé, comptes, montants. Sa conformité se teste en amont : numérotation continue, dates cohérentes, libellés présents, pas d'écriture modifiable après validation.",
          },
          {
            h: "La facturation électronique",
            p: "La réforme impose la réception de factures électroniques structurées (Factur-X et formats qualifiés) via des plateformes immatriculées, avec un calendrier progressif selon la taille de l'entreprise, puis l'obligation d'émission et l'e-reporting des opérations non couvertes (B2C, export). Conséquence comptable : cycle purchase-to-pay digitalisé, rapprochement automatique et piste d'audit fiable à documenter.",
          },
        ],
        points: [
          "FEC : obligatoire dès l'ouverture du contrôle, amendé sinon",
          "Écritures non modifiables après validation — traçabilité maximale",
          "E-facturation : réception obligatoire progressive, puis émission et e-reporting",
          "Piste d'audit fiable : documenter le contrôle interne du cycle facturation",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz                                                               */
/* ------------------------------------------------------------------ */

export type QuizQ = {
  id: string;
  module: string; // module id
  q: string;
  options: string[];
  answer: number;
  explain: string;
  level: 1 | 2 | 3;
};

export const QUIZ: QuizQ[] = [
  {
    id: "q1",
    module: "fondamentaux",
    q: "Dans le Plan Comptable Général, la classe 6 regroupe…",
    options: ["Les immobilisations", "Les charges", "Les produits", "Les comptes de tiers"],
    answer: 1,
    explain:
      "Classe 6 = charges, classe 7 = produits. Les classes 1 à 5 couvrent le bilan (capitaux, immobilisations, stocks, tiers, financier).",
    level: 1,
  },
  {
    id: "q2",
    module: "fondamentaux",
    q: "Une provision pour litige probable relève de quel principe ?",
    options: ["La permanence des méthodes", "L'indépendance des exercices", "La prudence", "L'intangibilité du bilan d'ouverture"],
    answer: 2,
    explain:
      "La prudence impose d'enregistrer une perte probable dès qu'elle est identifiée, sans attendre sa réalisation — sans jamais comptabiliser un gain incertain.",
    level: 1,
  },
  {
    id: "q3",
    module: "ecritures",
    q: "Règlement d'un fournisseur par virement : quelle écriture ?",
    options: ["Débit 512 / Crédit 401", "Débit 401 / Crédit 512", "Débit 401 / Crédit 411", "Débit 512 / Crédit 707"],
    answer: 1,
    explain:
      "La dette fournisseur (passif) diminue : débit 401. La banque (actif) diminue : crédit 512. Montant TTC, celui effectivement payé.",
    level: 1,
  },
  {
    id: "q4",
    module: "ecritures",
    q: "L'achat de marchandises 1 000 € HT avec TVA 20 % à crédit fournisseur s'enregistre…",
    options: [
      "D 607 1 000 / D 44566 200 / C 401 1 200",
      "D 607 1 200 / C 401 1 200",
      "D 607 1 000 / C 401 1 000",
      "D 401 1 200 / C 607 1 000 / C 44571 200",
    ],
    answer: 0,
    explain:
      "Charge 607 au HT, TVA déductible 44566 (200), et dette fournisseur 401 au TTC (1 200). La TVA collectée 44571 concerne les ventes.",
    level: 2,
  },
  {
    id: "q5",
    module: "ecritures",
    q: "L'écriture d'amortissement d'un matériel passe par…",
    options: ["Débit 2154 / Crédit 512", "Débit 6811 / Crédit 2815", "Débit 481 / Crédit 6811", "Débit 606 / Crédit 401"],
    answer: 1,
    explain:
      "Dotations aux amortissements (6811) au débit, amortissements des immobilisations corporelles (2815) au crédit. Le 281 est un compte soustractif d'actif.",
    level: 2,
  },
  {
    id: "q6",
    module: "ecritures",
    q: "Qu'est-ce que le lettrage ?",
    options: [
      "Associer chaque facture à son règlement dans un compte de tiers",
      "Classer les pièces par ordre alphabétique",
      "Numéroter les écritures du journal",
      "Corriger une erreur d'imputation",
    ],
    answer: 0,
    explain:
      "Le lettrage marque (lettres A, B, C…) les lignes qui se compensent : facture et règlement. Ce qui reste non lettré correspond aux encours dus.",
    level: 1,
  },
  {
    id: "q7",
    module: "tva",
    q: "La TVA à décaisser se calcule ainsi :",
    options: [
      "TVA déductible − TVA collectée",
      "TVA collectée − TVA déductible",
      "CA HT × 20 %",
      "TVA collectée + TVA déductible",
    ],
    answer: 1,
    explain:
      "Collectée (4457) sur les ventes moins déductible (4456) sur les achats = le solde reversé à l'État (44551). Un résultat négatif crée un crédit de TVA.",
    level: 1,
  },
  {
    id: "q8",
    module: "tva",
    q: "Pour une prestation de services, la TVA est en principe exigible…",
    options: ["À la facturation", "À l'encaissement du prix", "À la livraison", "À la signature du devis"],
    answer: 1,
    explain:
      "Services : exigibilité à l'encaissement (sauf option pour les débits). Biens : à la livraison. La date de facture ne commande pas l'exigibilité.",
    level: 2,
  },
  {
    id: "q9",
    module: "tva",
    q: "Un achat intracommunautaire de biens par une entreprise française entraîne…",
    options: [
      "Une TVA payée au fournisseur étranger",
      "Une autoliquidation : TVA collectée et déductible déclarées simultanément",
      "Aucune obligation de TVA",
      "Une TVA au taux de 0 % définitif",
    ],
    answer: 1,
    explain:
      "L'acheteur autoliquide : il déclare la TVA due (4452) et la déduit (445662) sur la même déclaration. Opération neutre en trésorerie mais déclarative.",
    level: 3,
  },
  {
    id: "q10",
    module: "paie",
    q: "Le prélèvement à la source (PAS) est comptabilisé au compte…",
    options: ["431 Sécurité sociale", "421 Personnel", "4421 État — PAS", "641 Rémunérations"],
    answer: 2,
    explain:
      "Le brut est débité en 641 ; le PAS retenu sur le net est crédité en 4421 puis reversé à la DGFiP. Le 431 accueille les cotisations sociales.",
    level: 2,
  },
  {
    id: "q11",
    module: "paie",
    q: "La DSN (Déclaration Sociale Nominative) permet de…",
    options: [
      "Déclarer la TVA mensuellement",
      "Transmettre la paie et les données sociales en un flux unique",
      "Éditer les bulletins de paie",
      "Calculer l'impôt sur les sociétés",
    ],
    answer: 1,
    explain:
      "La DSN mensualise et unifie l'essentiel des déclarations sociales (URSSAF, retraite, France Travail…) à partir des données de paie.",
    level: 1,
  },
  {
    id: "q12",
    module: "etats",
    q: "L'égalité fondamentale du bilan est :",
    options: ["Actif = Capitaux propres", "Actif = Passif", "Charges = Produits", "Trésorerie = BFR"],
    answer: 1,
    explain:
      "Tout ce que l'entreprise possède (actif) est financé par des capitaux propres ou des dettes (passif). La balance doit toujours cadrer.",
    level: 1,
  },
  {
    id: "q13",
    module: "etats",
    q: "Le BFR (besoin en fonds de roulement) correspond à…",
    options: [
      "Stocks + créances d'exploitation − dettes d'exploitation",
      "Immobilisations − capitaux propres",
      "Trésorerie active − trésorerie passive",
      "Charges fixes − charges variables",
    ],
    answer: 0,
    explain:
      "Le BFR mesure le financement immobilisé par le cycle d'exploitation : stocks et créances, diminués des dettes fournisseurs, fiscales et sociales.",
    level: 2,
  },
  {
    id: "q14",
    module: "etats",
    q: "L'EBE (excédent brut d'exploitation) se calcule à partir…",
    options: [
      "Du résultat net + dotations",
      "De la valeur ajoutée + subventions d'exploitation − impôts et taxes − charges de personnel",
      "De la marge commerciale − frais financiers",
      "Du chiffre d'affaires − tous les charges",
    ],
    answer: 1,
    explain:
      "EBE = valeur ajoutée + subventions d'exploitation − impôts, taxes et versements assimilés − charges de personnel. C'est la richesse brute d'exploitation, avant amortissements.",
    level: 3,
  },
  {
    id: "q15",
    module: "fiscal",
    q: "Le taux normal de l'impôt sur les sociétés est de…",
    options: ["15 %", "25 %", "28 %", "33,1/3 %"],
    answer: 1,
    explain:
      "25 % depuis 2022. Le taux réduit de 15 % s'applique aux PME éligibles sur la fraction de bénéfice jusqu'à 42 500 €.",
    level: 1,
  },
  {
    id: "q16",
    module: "fiscal",
    q: "Le FEC (Fichier des Écritures Comptables) doit être remis…",
    options: [
      "Chaque année avec la liasse fiscale",
      "Dès l'ouverture d'un contrôle fiscal",
      "Uniquement en cas de contrôle URSSAF",
      "À la demande du commissaire aux comptes seulement",
    ],
    answer: 1,
    explain:
      "Le FEC est exigé dès l'ouverture du contrôle fiscal, sous peine d'une amende de 5 000 € minimum. Sa conformité se vérifie bien en amont.",
    level: 2,
  },
];

/* ------------------------------------------------------------------ */
/*  Flashcards                                                         */
/* ------------------------------------------------------------------ */

export type Card = {
  id: string;
  cat: "Comptes" | "Mécanismes" | "Fiscal & social";
  front: string;
  back: string;
};

export const CARDS: Card[] = [
  { id: "c1", cat: "Comptes", front: "512 — Banque", back: "Compte financier de l'entreprise en banque. Augmente au débit (encaissements), diminue au crédit (paiements). Se justifie par le rapprochement bancaire." },
  { id: "c2", cat: "Comptes", front: "411 — Clients", back: "Créances sur les clients pour les ventes facturées non encore encaissées. Se débite à la facturation (TTC), se crédite à l'encaissement. À déprécier (491) si risque d'impayé." },
  { id: "c3", cat: "Comptes", front: "401 — Fournisseurs", back: "Dettes envers les fournisseurs d'exploitation. Se crédite à la réception de facture (TTC), se débite au règlement. Les FNP (408) complètent les factures non parvenues." },
  { id: "c4", cat: "Comptes", front: "44551 — TVA à décaisser", back: "Solde de TVA dû à l'État : collectée (4457) − déductible (4456). Comptabilisé lors de la déclaration CA3, puis réglé à l'échéance." },
  { id: "c5", cat: "Comptes", front: "607 — Achats de marchandises", back: "Compte de charge des achats destinés à la revente en l'état. La marge commerciale = 707 − 607 ± variation de stock (37)." },
  { id: "c6", cat: "Comptes", front: "706 — Prestations de services", back: "Compte de produit des ventes de services. Toujours crédité du montant HT ; la TVA collectée (44571) complète l'écriture au crédit." },
  { id: "c7", cat: "Mécanismes", front: "Partie double", back: "Chaque écriture comporte au moins un débit et un crédit d'égal montant : tout emploi a une ressource. Total débits = total crédits, sur l'écriture comme sur la balance." },
  { id: "c8", cat: "Mécanismes", front: "Cut-off", back: "Rattachement des charges et produits au bon exercice : CCA (486), PCA (487), FNP (408), FAE (418), charges à payer et produits à recevoir." },
  { id: "c9", cat: "Mécanismes", front: "Rapprochement bancaire", back: "Comparaison du compte 512 avec le relevé bancaire pour justifier chaque écart : frais, intérêts, chèques émis non encaissés, remises en attente…" },
  { id: "c10", cat: "Mécanismes", front: "Provision", back: "Constatation d'une perte probable (litige, créance douteuse, stock déprécié). Comptes 15 (risques et charges), 39, 49, 59 — reprise en 78 quand le risque disparaît." },
  { id: "c11", cat: "Mécanismes", front: "CAF", back: "Capacité d'autofinancement : flux de trésorerie potentiel généré par l'activité. ≈ Résultat net + dotations (68) − reprises (78) ± résultat de cession d'immobilisations." },
  { id: "c12", cat: "Mécanismes", front: "Seuil de rentabilité", back: "Chiffre d'affaires à partir duquel l'entreprise couvre toutes ses charges : charges fixes ÷ taux de marge sur coûts variables. En dessous : perte ; au-dessus : profit." },
  { id: "c13", cat: "Fiscal & social", front: "Autoliquidation", back: "Mécanisme où le redevable déclare lui-même la TVA due et la déduit simultanément (achats intracommunautaires, sous-traitance BTP, etc.). Opération neutre en trésorerie." },
  { id: "c14", cat: "Fiscal & social", front: "DSN", back: "Déclaration Sociale Nominative : flux mensuel unique issu de la paie, transmis aux organismes (URSSAF, retraite, France Travail). Elle alimente les droits sociaux en quasi temps réel." },
  { id: "c15", cat: "Fiscal & social", front: "Liasse fiscale", back: "Ensemble des déclarations fiscales annuelles : bilan, compte de résultat, annexes (tableaux 2033/2050…). Dématérialisée, elle nourrit le contrôle fiscal et les statistiques." },
];

/* ------------------------------------------------------------------ */
/*  Exercices d'écritures                                              */
/* ------------------------------------------------------------------ */

export type ExerciseRow = {
  account: string;
  label: string;
  d?: number;
  c?: number;
};

export type Exercise = {
  id: string;
  title: string;
  event: string;
  hint: string;
  rows: ExerciseRow[];
};

export const EXERCISES: Exercise[] = [
  {
    id: "x1",
    title: "Achat de marchandises à crédit",
    event:
      "Facture fournisseur DUPONT Négoce : achat de marchandises pour 1 200 € HT, TVA 20 %, règlement à 30 jours.",
    hint: "Charge au HT (607), TVA déductible (44566), dette fournisseur au TTC (401).",
    rows: [
      { account: "607", label: "Achats de marchandises", d: 1200 },
      { account: "44566", label: "TVA déductible sur autres biens et services", d: 240 },
      { account: "401", label: "Fournisseurs DUPONT Négoce", c: 1440 },
    ],
  },
  {
    id: "x2",
    title: "Vente de prestations encaissée",
    event:
      "Facture client SARL BÂTI+ : prestations de services 2 500 € HT, TVA 20 %, règlement reçu par virement le jour même.",
    hint: "La banque encaisse le TTC au débit (512) ; produit HT (706) et TVA collectée (44571) au crédit.",
    rows: [
      { account: "512", label: "Banque", d: 3000 },
      { account: "706", label: "Prestations de services", c: 2500 },
      { account: "44571", label: "TVA collectée", c: 500 },
    ],
  },
  {
    id: "x3",
    title: "Règlement du fournisseur",
    event:
      "30 jours plus tard, vous réglez la facture DUPONT Négoce de 1 440 € TTC par virement bancaire.",
    hint: "La dette (401) disparaît : débit. La banque (512) sort : crédit. Même montant des deux côtés.",
    rows: [
      { account: "401", label: "Fournisseurs DUPONT Négoce", d: 1440 },
      { account: "512", label: "Banque", c: 1440 },
    ],
  },
  {
    id: "x4",
    title: "Encaissement d'une facture client",
    event:
      "Virement reçu de la SARL BÂTI+ : règlement de votre facture de 3 000 € TTC.",
    hint: "La créance client (411) diminue au crédit ; la trésorerie (512) augmente au débit.",
    rows: [
      { account: "512", label: "Banque", d: 3000 },
      { account: "411", label: "Clients SARL BÂTI+", c: 3000 },
    ],
  },
  {
    id: "x5",
    title: "Amortissement du matériel",
    event:
      "En clôture, vous constatez l'amortissement annuel d'un matériel industriel : 800 €.",
    hint: "Dotation aux amortissements (68112) au débit, amortissement cumulé du matériel (28154) au crédit.",
    rows: [
      { account: "68112", label: "Dotations aux amortissements des immobilisations corporelles", d: 800 },
      { account: "28154", label: "Amortissements du matériel industriel", c: 800 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Mises à jour réglementaires                                        */
/* ------------------------------------------------------------------ */

export type NewsItem = {
  id: string;
  date: string;
  tag: "Facturation" | "Fiscal" | "Social" | "Normes" | "Contrôle";
  title: string;
  body: string;
  verify?: boolean;
};

export const NEWS: NewsItem[] = [
  {
    id: "n1",
    date: "1ᵉʳ sept. 2026",
    tag: "Facturation",
    title: "Réception de factures électroniques obligatoire pour toutes les entreprises",
    body: "À compter du 1ᵉʳ septembre 2026, toutes les entreprises assujetties françaises doivent être en capacité de recevoir des factures électroniques structurées (Factur-X et formats qualifiés) via une plateforme immatriculée — quelle que soit leur taille. C'est le premier jalon dur de la réforme : vérifiez dès maintenant la plateforme choisie (PA/PDP) et le format supporté par vos fournisseurs.",
  },
  {
    id: "n2",
    date: "2026 – 2027",
    tag: "Facturation",
    title: "E-invoicing & e-reporting : l'émission devient obligatoire par vagues",
    body: "L'obligation d'émission de factures électroniques entre assujettis (e-invoicing) et la transmission des données de transactions non couvertes (e-reporting : B2C, export, intracom) montent en charge selon la taille des entreprises, entre septembre 2026 et septembre 2027. Conséquence métier : la piste d'audit fiable se dématérialise et le rapprochement commande-facture-paiement devient automatisable.",
  },
  {
    id: "n3",
    date: "Exercices ouverts dès 2024",
    tag: "Normes",
    title: "CSRD : le reporting de durabilité élargit le périmètre comptable",
    body: "La directive CSRD étend progressivement l'obligation de rapport de durabilité (ESRS) aux grandes entreprises, puis aux PME cotées. Pour les cabinets et les directions financières, de nouvelles données extra-financières s'articulent avec la liasse : double matérialité, chaîne de valeur, et contrôle de l'information publiée. La comptabilité environnementale devient un sujet d'annexe.",
  },
  {
    id: "n4",
    date: "Chaque 1ᵉʳ janvier",
    tag: "Social",
    title: "PASS, SMIC et barèmes sociaux : le rituel de la revalorisation",
    body: "Plafond annuel de la sécurité sociale, SMIC, tranches de cotisations, taux de versement mobilité : chaque début d'année impose une mise à jour des paramètres de paie. Un paramétrage obsolète fausse les bulletins et la DSN — mettez en place une revue systématique des constantes sociales avant la première paie de l'année.",
    verify: true,
  },
  {
    id: "n5",
    date: "Lois de finances successives",
    tag: "Fiscal",
    title: "CVAE : une extinction à confirmer exercice par exercice",
    body: "La trajectoire de suppression progressive de la CVAE a été plusieurs fois décalée par les lois de finances. Avant de provisionner ou de budgéter la CET, vérifiez le taux applicable à l'exercice clos et l'état de la trajectoire votée : la CFE, elle, demeure et suit l'évolution des bases locatives.",
    verify: true,
  },
  {
    id: "n6",
    date: "Contrôles en cours",
    tag: "Contrôle",
    title: "FEC et data-mining : l'administration croise vos écritures",
    body: "Le fichier des écritures comptables alimente des traitements automatisés de ciblage : cohérence des journaux, chronologie des pièces, lettrages résiduels, écarts de TVA déclarée/comptabilisée. La qualité du FEC n'est plus seulement une obligation formelle : c'est la première impression que l'entreprise donne au vérificateur, avant même son arrivée.",
  },
];

/* ------------------------------------------------------------------ */
/*  Divers dashboard                                                   */
/* ------------------------------------------------------------------ */

export const TICKER = [
  "Total débits = Total crédits",
  "Actif = Passif",
  "44571 TVA collectée",
  "44566 TVA déductible",
  "6811 Dotations aux amortissements",
  "Classe 5 = Trésorerie",
  "EBE = VA + subventions − impôts − personnel",
  "BFR = stocks + créances − dettes d'exploitation",
  "CAF ≈ résultat net + dotations − reprises",
  "IS : taux normal 25 %",
  "FEC requis dès l'ouverture du contrôle",
  "Cut-off : rattacher au bon exercice",
];

export const FACTS = [
  { n: "7", t: "classes de comptes structurent l'intégralité du Plan Comptable Général." },
  { n: "1494", t: "le livre-journal et le livre d'inventaire sont exigés depuis l'ordonnance de Colbert… au XVIIᵉ siècle déjà." },
  { n: "20 %", t: "taux normal de TVA en France, appliqué à la majorité des biens et services." },
  { n: "10 ans", t: "durée légale de conservation des livres comptables et pièces justificatives." },
  { n: "17,7 %", t: "environ du PIB français prélevé sous forme de cotisations sociales, l'un des niveaux les plus élevés de l'OCDE." },
  { n: "4", t: "acomptes d'IS versés chaque année : 15 mars, 15 juin, 15 septembre, 15 décembre." },
  { n: "42 500 €", t: "seuil de bénéfice soumis au taux réduit d'IS de 15 % pour les PME éligibles." },
  { n: "0", t: "tolérance de la balance : le moindre écart débit/crédit bloque la clôture." },
  { n: "85 000 €", t: "seuil de référence de la franchise en base de TVA pour les activités de vente." },
  { n: "360", t: "jours : la base de calcul conventionnelle des ratios (DSO, DPO, rotation)." },
];

export const LEVELS = [
  { name: "Apprenti·e du Grand Livre", min: 0 },
  { name: "Assistant·e comptable", min: 150 },
  { name: "Collaborateur·rice confirmé·e", min: 400 },
  { name: "Chef·fe comptable", min: 800 },
  { name: "Directeur·rice financier·ère", min: 1400 },
  { name: "Expert·e-comptable", min: 2200 },
];

export const XP = {
  lesson: 40,
  quizCorrect: 10,
  card: 5,
  exercise: 60,
  daily: 15,
  news: 10,
};

export function levelFor(xp: number) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].min) idx = i;
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1] ?? null;
  const pct = next ? Math.min(1, (xp - cur.min) / (next.min - cur.min)) : 1;
  return { idx, name: cur.name, next, pct, remaining: next ? next.min - xp : 0 };
}

export const fmtEUR = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

export const fmtNum = (n: number) => new Intl.NumberFormat("fr-FR").format(n);
