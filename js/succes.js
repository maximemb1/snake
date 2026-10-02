/* const SUCCES = [
	{ id: "premiere_partie", nom: "Première partie", description: "Lancer une partie.", condition: s => s.parties >= 1 },
	{ id: "premiere_pomme", nom: "À table !", description: "Manger une pomme.", condition: s => s.pommes >= 1 },
	{ id: "petit_creux", nom: "Petit creux", description: "Manger 10 pommes au total.", condition: s => s.pommes >= 10 },
	{ id: "score_5", nom: "Ça commence", description: "Atteindre 5 points.", condition: s => s.meilleurScore >= 5 },
	{ id: "score_10", nom: "Bien joué", description: "Atteindre 10 points.", condition: s => s.meilleurScore >= 10 },
	{ id: "longueur_10", nom: "Belle longueur", description: "Atteindre une longueur de 10.", condition: s => s.longueurMax >= 10 },
	{ id: "survivant", nom: "Survivant", description: "Survivre au moins une minute dans une partie.", condition: s => s.dureeMax >= 60 },
	{ id: "habitué", nom: "Habitué", description: "Jouer 5 parties.", condition: s => s.parties >= 5 },
	{ id: "score_20", nom: "As du serpent", description: "Atteindre 20 points.", condition: s => s.meilleurScore >= 20 },
	{ id: "marathon", nom: "Marathon", description: "Manger 20 pommes en une seule partie.", condition: s => s.recordPommesPartie >= 20 }
];

class SystemeSucces {
	constructor(onUnlock = () => {}) {
		this.cleStockage = "snake-succes-v1";
		this.onUnlock = onUnlock;
		this.stats = this.charger();
		this.debloques = new Set(this.stats.debloques);
		this.partieEnCours = false;
		this.pommesPartie = 0;
		this.verifier();
	}

	charger() {
		const valeursInitiales = {
			parties: 0,
			pommes: 0,
			meilleurScore: 0,
			longueurMax: 0,
			dureeMax: 0,
			recordPommesPartie: 0,
			debloques: []
		};

		try {
			const sauvegarde = JSON.parse(localStorage.getItem(this.cleStockage));
			return { ...valeursInitiales, ...(sauvegarde || {}) };
		} catch {
			return valeursInitiales;
		}
	}

	sauvegarder() {
		this.stats.debloques = [...this.debloques];
		try {
			localStorage.setItem(this.cleStockage, JSON.stringify(this.stats));
		} catch {
			// Le système reste utilisable si le stockage local est indisponible.
		}
	}

	demarrerPartie() {
		if (this.partieEnCours) return;
		this.partieEnCours = true;
		this.pommesPartie = 0;
		this.debutPartie = Date.now();
		this.stats.parties += 1;
		this.verifier();
	}

	mangerPomme({ score = 0, longueur = 0 } = {}) {
		if (!this.partieEnCours) this.demarrerPartie();
		this.stats.pommes += 1;
		this.pommesPartie += 1;
		this.stats.meilleurScore = Math.max(this.stats.meilleurScore, Number(score) || 0);
		this.stats.longueurMax = Math.max(this.stats.longueurMax, Number(longueur) || 0);
		this.verifier();
	}

	terminerPartie({ score = 0, longueur = 0, duree } = {}) {
		if (!this.partieEnCours) return;
		const secondes = Number.isFinite(duree)
			? duree
			: Math.floor((Date.now() - this.debutPartie) / 1000);
		this.stats.meilleurScore = Math.max(this.stats.meilleurScore, Number(score) || 0);
		this.stats.longueurMax = Math.max(this.stats.longueurMax, Number(longueur) || 0);
		this.stats.dureeMax = Math.max(this.stats.dureeMax, secondes);
		this.stats.recordPommesPartie = Math.max(this.stats.recordPommesPartie, this.pommesPartie);
		this.partieEnCours = false;
		this.verifier();
	}

	verifier() {
		for (const succes of SUCCES) {
			if (!this.debloques.has(succes.id) && succes.condition(this.stats)) {
				this.debloques.add(succes.id);
				this.onUnlock({ id: succes.id, nom: succes.nom, description: succes.description });
			}
		}
		this.sauvegarder();
	}

	liste() {
		return SUCCES.map(({ id, nom, description }) => ({
			id,
			nom,
			description,
			debloque: this.debloques.has(id)
		}));
	}
}

if (typeof window !== "undefined") window.SystemeSucces = SystemeSucces;
if (typeof module !== "undefined" && module.exports) module.exports = SystemeSucces;
 */