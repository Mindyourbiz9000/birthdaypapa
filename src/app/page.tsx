"use client";

import { useState } from "react";
import AgendaSection from "@/components/AgendaSection";
import MenuSection from "@/components/MenuSection";

export default function Home() {
  const [menuSubmitted, setMenuSubmitted] = useState(false);

  return (
    <main style={{ background: "var(--background)", minHeight: "100vh" }}>
      {/* Hero */}
      <header style={{ background: "var(--olive)", color: "white", textAlign: "center", padding: "48px 24px 40px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎂</div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontStyle: "italic", marginBottom: "12px", color: "white" }}>
          Mes 70 Printemps !
        </h1>
        <p style={{ color: "var(--gold)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>
          Week-end de Fête au cœur des Ardennes
        </p>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", letterSpacing: "0.05em" }}>✦ ✦ ✦</p>
        <div style={{ display: "inline-block", border: "1.5px solid rgba(255,255,255,0.5)", borderRadius: "20px", padding: "8px 28px", marginTop: "16px", fontSize: "0.95rem", letterSpacing: "0.05em" }}>
          13 – 17 MAI 2026
        </div>
      </header>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 16px" }}>
        {/* Camp de Base */}
        <section style={{ textAlign: "center", padding: "40px 0 32px" }}>
          <h2 style={{ color: "var(--brown)", fontSize: "1.5rem", marginBottom: "8px" }}>
            📍 Notre Camp de Base
          </h2>
          <p style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "4px" }}>Maison Ardennes-Étape</p>
          <p style={{ color: "#666", marginBottom: "12px" }}>Rue de Lonnai 10 — 6852 Our-Paliseul</p>
          <p style={{ color: "#888", fontStyle: "italic", fontSize: "0.9rem", maxWidth: "480px", margin: "0 auto" }}>
            Une magnifique maison de vacances nichée dans les Ardennes, avec piscine, sauna et tout le confort pour passer ensemble des moments inoubliables.
          </p>
          <hr style={{ border: "none", borderTop: "1px solid #e0d8c4", margin: "32px 0 0" }} />
        </section>

        <AgendaSection />

        {/* Summary Table */}
        <section style={{ marginBottom: "40px" }}>
          <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", overflow: "hidden" }}>
            <div style={{ background: "var(--brown)", color: "white", padding: "16px 24px", textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem", color: "white" }}>
                📌 En Résumé
              </h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>JOUR</th>
                    <th>THÈME</th>
                    <th>TEMPS FORT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Mer. 13/5</td><td>Arrivée &amp; Retrouvailles</td><td>Buffet charcuterie-fromage</td></tr>
                  <tr><td>Jeu. 14/5</td><td>🎂 ANNIVERSAIRE</td><td>Hiboux à Graide + Chef à domicile</td></tr>
                  <tr><td>Ven. 15/5</td><td>Aventure &amp; Gastronomie</td><td>Attelage en forêt + Restaurant panoramique</td></tr>
                  <tr><td>Sam. 16/5</td><td>Randonnée &amp; Convivialité</td><td>Grand Rôly + Pique-nique + Barbecue</td></tr>
                  <tr><td>Dim. 17/5</td><td>Détente &amp; Départ</td><td>Piscine, sauna, repas de midi &amp; farniente</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Menu Selection */}
        {!menuSubmitted ? (
          <MenuSection onSubmitted={() => setMenuSubmitted(true)} />
        ) : (
          <section style={{ background: "var(--cream)", border: "2px solid var(--cream-dark)", borderRadius: "16px", padding: "40px 32px", textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎉</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--olive)", marginBottom: "12px" }}>Merci pour votre sélection !</h2>
            <p style={{ color: "#666" }}>Votre choix de menu a bien été envoyé. À très bientôt pour ce beau week-end !</p>
          </section>
        )}

        {/* Confirmation Section */}
        <section style={{ background: "var(--cream)", border: "2px dashed var(--gold)", borderRadius: "16px", padding: "32px", textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "2rem", marginBottom: "16px" }}>📬</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--brown)", marginBottom: "16px" }}>Merci de Confirmer !</h2>
          <p style={{ color: "#555", maxWidth: "480px", margin: "0 auto 24px", fontSize: "0.95rem" }}>
            Afin de pouvoir organiser au mieux ce beau week-end (réservations, repas, nombre de places…), merci à chacune et chacun de bien vouloir me communiquer :
          </p>
          <div style={{ textAlign: "left", maxWidth: "400px", margin: "0 auto" }}>
            {[
              { icon: "📅", label: "Votre date et heure d'arrivée" },
              { icon: "🚗", label: "Votre date et heure de départ" },
              { icon: "✏️", label: "Vos éventuelles absences", sub: "durant le séjour (si vous ne pouvez pas être présent(e) à certaines activités ou certains repas)" },
              { icon: "🍽️", label: "Votre présence au repas de midi du dimanche 17/5" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "16px", padding: "12px 16px", background: "white", borderRadius: "8px" }}>
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--brown)" }}>{item.label}</p>
                  {item.sub && <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "2px" }}>{item.sub}</p>}
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "#888", fontSize: "0.85rem", fontStyle: "italic", marginTop: "16px" }}>
            Merci de me faire un retour le plus rapidement possible afin de finaliser toutes les réservations. 🙏
          </p>
        </section>
      </div>
    </main>
  );
}
