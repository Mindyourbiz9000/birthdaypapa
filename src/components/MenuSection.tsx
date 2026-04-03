"use client";

import { useState } from "react";

interface MenuSectionProps {
  onSubmitted: () => void;
}

const entrees = [
  { id: "croquettes_jambon", label: "Croquettes au Jambon d'Ardenne et au Fromage de Rochehaut", desc: "🌿 Salade fraîche et persil frit — 1 pièce", price: "13,00 €" },
  { id: "croquettes_orval", label: "Croquettes au Fromage d'Orval", desc: "🌿 Salade fraîche et persil frit — 1 pièce", price: "13,00 €" },
  { id: "croquettes_homard", label: "Croquettes au Homard", desc: "🦞 Salade fraîche, wakamé et persil frit — 1 pièce", price: "14,00 €" },
  { id: "croquettes_ris_veau", label: "Croquettes Ris de Veau", desc: "🌿 Salade fraîche et persil frit — 1 pièce", price: "14,00 €" },
];

const plats = [
  { id: "cote_porc", label: "La Fameuse Côte de Porc Fermier de Rochehaut façon Tomahawk (± 350gr)", desc: "Saumurée, cuite à basse température, marinade au Jack Daniel's et laquée au miel. Accompagnements au choix.", price: "29,00 €" },
  { id: "rumsteack", label: "Le Rumsteack d'Angus (± 250gr)", desc: "Légumes chauds et accompagnements au choix.", price: "26,00 €" },
  { id: "vol_au_vent", label: "Le Vol-au-Vent raffiné d'une tranche de Cœur de Ris de Veau", desc: "Coucou de Malines de l'élevage des Beaux Chênes à Noirefontaine. Accompagnements au choix.", price: "29,00 €" },
  { id: "americain", label: "L'Américain haché minute", desc: "Préparé en cuisine pour vous OU à assembler vous-même. Salade et accompagnements au choix.", price: "26,00 €" },
];

const platsEnfants = [
  { id: "pennes", label: "🍝 Pennes Bolognaise", price: "12,00 €" },
  { id: "nuggets", label: "🍗 Nuggets de Poulet, Frites", price: "12,00 €" },
  { id: "steak_hache", label: "🥩 Steak Haché, Frites", price: "12,00 €" },
];

export default function MenuSection({ onSubmitted }: MenuSectionProps) {
  const [selectedEntree, setSelectedEntree] = useState("");
  const [selectedPlat, setSelectedPlat] = useState("");
  const [wantsChildMeal, setWantsChildMeal] = useState(false);
  const [childName, setChildName] = useState("");
  const [selectedPlatEnfant, setSelectedPlatEnfant] = useState("");
  const [guestName, setGuestName] = useState("");
  const [allergies, setAllergies] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = guestName.trim() &&
    (wantsChildMeal
      ? selectedPlatEnfant && childName.trim()
      : selectedEntree && selectedPlat);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const menuSelections: Record<string, string> = {};
    if (selectedEntree) {
      const item = entrees.find(e => e.id === selectedEntree);
      if (item) menuSelections["Entrée"] = item.label;
    }
    if (selectedPlat) {
      const item = plats.find(p => p.id === selectedPlat);
      if (item) menuSelections["Plat"] = item.label;
    }
    if (wantsChildMeal && selectedPlatEnfant) {
      const item = platsEnfants.find(p => p.id === selectedPlatEnfant);
      if (item) menuSelections[`Plat Enfant (${childName})`] = item.label;
    }
    if (allergies) menuSelections["Allergies / régimes"] = allergies;
    if (remarks) menuSelections["Remarques"] = remarks;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestName, menuSelections }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      onSubmitted();
    } catch {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ marginBottom: "40px" }}>
      {/* Header */}
      <div style={{ background: "var(--olive)", borderRadius: "12px 12px 0 0", padding: "20px 24px", color: "white", textAlign: "center" }}>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>Rochehaut-sur-Semois · Route de Aale 3, 6830 Rochehaut</p>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.5)", borderRadius: "20px", padding: "8px 24px", fontWeight: 700, fontSize: "1rem" }}>
          Vendredi 15 mai 2026 — Déjeuner
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "0 0 12px 12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: "32px 24px" }}>
        <form onSubmit={handleSubmit}>

          {/* Step 1: menu type */}
          <div style={{ marginBottom: "28px" }}>
            <p style={{ textAlign: "center", fontWeight: 700, color: "var(--brown)", marginBottom: "12px", fontSize: "1rem" }}>
              Quel type de menu souhaitez-vous ?
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <label style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                border: !wantsChildMeal ? "2px solid var(--olive)" : "1.5px solid #e0d8c4",
                borderRadius: "10px", padding: "14px", cursor: "pointer",
                background: !wantsChildMeal ? "rgba(90,110,58,0.07)" : "white", transition: "all 0.15s",
                fontWeight: 700, color: !wantsChildMeal ? "var(--olive)" : "#888"
              }}>
                <input type="radio" name="menuType" checked={!wantsChildMeal}
                  onChange={() => { setWantsChildMeal(false); setSelectedPlatEnfant(""); setChildName(""); }}
                  style={{ accentColor: "var(--olive)" }} />
                🍽️ Menu adulte
              </label>
              <label style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                border: wantsChildMeal ? "2px solid var(--orange)" : "1.5px solid #e0d8c4",
                borderRadius: "10px", padding: "14px", cursor: "pointer",
                background: wantsChildMeal ? "#fff3d6" : "white", transition: "all 0.15s",
                fontWeight: 700, color: wantsChildMeal ? "var(--orange)" : "#888"
              }}>
                <input type="radio" name="menuType" checked={wantsChildMeal}
                  onChange={() => { setWantsChildMeal(true); setSelectedEntree(""); setSelectedPlat(""); }}
                  style={{ accentColor: "var(--orange)" }} />
                👶 Menu enfant
              </label>
            </div>
          </div>

          {/* Adult menu */}
          {!wantsChildMeal && (<>
            <h3 style={{ textAlign: "center", fontFamily: "'Playfair Display', Georgia, serif", color: "var(--olive)", marginBottom: "16px", fontSize: "1.3rem" }}>
              — Entrées —
            </h3>
            {entrees.map(item => (
              <label key={item.id} style={{
                display: "block", border: selectedEntree === item.id ? "2px solid var(--olive)" : "1.5px solid #e0d8c4",
                borderRadius: "10px", padding: "16px", marginBottom: "10px", cursor: "pointer",
                background: selectedEntree === item.id ? "rgba(90,110,58,0.05)" : "white", transition: "all 0.15s"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, color: "var(--brown)", marginBottom: "4px" }}>{item.label}</p>
                    <p style={{ fontSize: "0.82rem", color: "#7a6a5a" }}>{item.desc}</p>
                  </div>
                  <span style={{ color: "var(--gold)", fontWeight: 700, whiteSpace: "nowrap", fontSize: "0.95rem" }}>{item.price}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px" }}>
                  <input type="radio" name="entree" value={item.id} checked={selectedEntree === item.id} onChange={() => setSelectedEntree(item.id)} style={{ accentColor: "var(--olive)" }} />
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>Mon choix</span>
                </div>
              </label>
            ))}

            <h3 style={{ textAlign: "center", fontFamily: "'Playfair Display', Georgia, serif", color: "var(--olive)", marginBottom: "16px", fontSize: "1.3rem", marginTop: "28px" }}>
              — Plats —
            </h3>
            {plats.map(item => (
              <label key={item.id} style={{
                display: "block", border: selectedPlat === item.id ? "2px solid var(--olive)" : "1.5px solid #e0d8c4",
                borderRadius: "10px", padding: "16px", marginBottom: "10px", cursor: "pointer",
                background: selectedPlat === item.id ? "rgba(90,110,58,0.05)" : "white", transition: "all 0.15s"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, color: "var(--brown)", marginBottom: "4px" }}>{item.label}</p>
                    <p style={{ fontSize: "0.82rem", color: "#7a6a5a", fontStyle: "italic" }}>{item.desc}</p>
                  </div>
                  <span style={{ color: "var(--gold)", fontWeight: 700, whiteSpace: "nowrap", fontSize: "0.95rem" }}>{item.price}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px" }}>
                  <input type="radio" name="plat" value={item.id} checked={selectedPlat === item.id} onChange={() => setSelectedPlat(item.id)} style={{ accentColor: "var(--olive)" }} />
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>Mon choix</span>
                </div>
              </label>
            ))}
          </>)}

          {/* Children menu */}
          {wantsChildMeal && (<>
            <p style={{ textAlign: "center", color: "var(--orange)", fontStyle: "italic", fontSize: "0.88rem", marginBottom: "16px" }}>
              Menu enfant à 12,00 € — Sélectionnez le plat souhaité.
            </p>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: 700, color: "var(--brown)", marginBottom: "6px", fontSize: "0.9rem" }}>
                👶 Prénom de l'enfant *
              </label>
              <input
                type="text"
                value={childName}
                onChange={e => setChildName(e.target.value)}
                placeholder="Prénom de l'enfant"
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e0d8c4", fontSize: "0.95rem", boxSizing: "border-box" }}
              />
            </div>
            {platsEnfants.map(item => (
              <label key={item.id} style={{
                display: "block", border: selectedPlatEnfant === item.id ? "2px solid var(--orange)" : "1.5px solid #e0c880",
                borderRadius: "10px", padding: "14px", marginBottom: "8px", cursor: "pointer",
                background: selectedPlatEnfant === item.id ? "#fff3d6" : "white"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontWeight: 700, color: "var(--brown)", fontSize: "0.95rem" }}>{item.label}</p>
                  <span style={{ color: "var(--orange)", fontWeight: 700, fontSize: "0.9rem" }}>{item.price}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
                  <input type="radio" name="enfant" value={item.id} checked={selectedPlatEnfant === item.id} onChange={() => setSelectedPlatEnfant(item.id)} style={{ accentColor: "var(--orange)" }} />
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>Mon choix</span>
                </div>
              </label>
            ))}
          </>)}

          {/* Guest Info */}
          <div style={{ background: "var(--cream)", border: "1.5px solid var(--cream-dark)", borderRadius: "12px", padding: "24px", marginTop: "28px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--brown)", textAlign: "center", marginBottom: "20px", fontSize: "1.2rem" }}>
              🍽️ Votre sélection
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: 700, fontSize: "0.9rem", color: "var(--brown)", marginBottom: "6px" }}>Prénom et Nom (adulte) *</label>
              <input
                type="text"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                placeholder="Votre nom complet"
                required
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e0d8c4", fontSize: "0.95rem", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: 700, fontSize: "0.9rem", color: "var(--brown)", marginBottom: "6px" }}>Allergies ou régimes alimentaires</label>
              <textarea
                value={allergies}
                onChange={e => setAllergies(e.target.value)}
                placeholder="Indiquez ici toute allergie ou restriction alimentaire (adulte et/ou enfant)..."
                rows={3}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e0d8c4", fontSize: "0.9rem", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: 700, fontSize: "0.9rem", color: "var(--brown)", marginBottom: "6px" }}>Remarques éventuelles</label>
              <textarea
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                placeholder="Ex: arrivée prévue mercredi soir, plusieurs enfants, etc."
                rows={3}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e0d8c4", fontSize: "0.9rem", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            {error && (
              <p style={{ color: "#c0392b", background: "#fdecea", border: "1px solid #f5c6cb", borderRadius: "8px", padding: "10px 14px", marginBottom: "14px", fontSize: "0.9rem" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || loading}
              style={{
                width: "100%", background: canSubmit && !loading ? "var(--olive)" : "#a0a0a0",
                color: "white", padding: "14px", borderRadius: "8px", fontWeight: 700, fontSize: "1rem",
                border: "none", cursor: canSubmit && !loading ? "pointer" : "not-allowed", transition: "background 0.2s"
              }}
            >
              {loading ? "Envoi en cours…" : "✉️ Envoyer mes choix"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
