import React from "react";

const S = {
  card: { background: "white", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: "2rem" } as React.CSSProperties,
  content: { padding: "24px" } as React.CSSProperties,
  timeLabel: { color: "var(--orange)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "4px" },
  title: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.15rem", fontWeight: 700, color: "var(--brown)", marginBottom: "6px" },
  desc: { color: "#5a4a3a", fontSize: "0.9rem", lineHeight: 1.6 },
  divider: { border: "none", borderTop: "1px dashed #d4c9a8", margin: "20px 0" } as React.CSSProperties,
  callout: { background: "var(--gold-light)", borderLeft: "4px solid var(--gold)", padding: "10px 14px", borderRadius: "0 8px 8px 0", margin: "12px 0", fontSize: "0.88rem" } as React.CSSProperties,
  calloutOrange: { background: "#fde8c8", borderLeft: "4px solid var(--orange)", padding: "10px 14px", borderRadius: "0 8px 8px 0", margin: "12px 0", fontSize: "0.88rem" } as React.CSSProperties,
};

function DayHeader({ emoji, date, title, color = "var(--olive)" }: { emoji: string; date: string; title: string; color?: string }) {
  return (
    <div style={{ background: color, color: "white", padding: "16px 24px", borderRadius: "12px 12px 0 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem", color: "white", marginBottom: "2px" }}>{date}</h2>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}>{title}</p>
        </div>
      </div>
    </div>
  );
}

function Block({ time, title, children }: { time?: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      {time && <p style={S.timeLabel}>{time}</p>}
      <h3 style={S.title}>{title}</h3>
      {children}
    </div>
  );
}

export default function AgendaSection() {
  return (
    <>
      {/* Mercredi 13 mai */}
      <div style={S.card}>
        <DayHeader emoji="🌙" date="Mercredi 13 mai" title="L'Arrivée & Les Retrouvailles" />
        <div style={S.content}>
          <Block time="Dès 18h00" title="Accueil et Installation">
            <p style={S.desc}>Bienvenue à tous ! Prenez vos quartiers, choisissez votre chambre, posez vos valises et retrouvons-nous pour commencer la fête.</p>
          </Block>
          <hr style={S.divider} />
          <Block time="Soirée" title="🧀 Souper — Buffet Charcuterie & Fromage">
            <p style={S.desc}>Rien de tel qu'un généreux plateau de charcuteries et de fromages de la région, accompagné de bons pains et de bonnes bouteilles, pour se retrouver autour de la grande table et lancer ce week-end dans la convivialité !</p>
          </Block>
        </div>
      </div>

      {/* Jeudi 14 mai */}
      <div style={S.card}>
        <DayHeader emoji="🎉" date="Jeudi 14 mai" title="Le Jour J — Joyeux Anniversaire !" color="var(--brown-light)" />
        <div style={S.content}>
          <Block time="Matinée" title="🥐 Brunch Festif">
            <p style={S.desc}>On commence cette journée spéciale en douceur avec un brunch gourmand. Viennoiseries, fruits frais, œufs, pancakes… De quoi prendre des forces !</p>
          </Block>
          <hr style={S.divider} />
          <Block time="13h00 précises" title="🦉 Le Jardin des Hiboux — Graide">
            <p style={S.desc}>Découverte d'un lieu magique : le Jardin des Hiboux, un parc animalier dédié aux rapaces nocturnes et diurnes. Chouettes, hiboux, faucons… Une expérience fascinante au plus près de ces oiseaux majestueux, dans un cadre naturel enchanteur.</p>
            <div style={S.calloutOrange}>
              ⏰ Rendez-vous à 13h00 précises ! Merci d'être ponctuels.
            </div>
          </Block>
          <hr style={S.divider} />
          <Block time="Soirée — ✨ Le Moment Phare" title="🍽️ Souper d'Anniversaire — Chef à Domicile">
            <p style={S.desc}>La cheffe <strong>Marianne Donnet</strong> investit notre cuisine pour nous concocter un dîner gastronomique d'exception, servi à domicile. Un repas raffiné, préparé sous nos yeux, pour célébrer ce cap des 70 ans avec élégance et gourmandise.</p>
            <div style={S.callout}>
              🥂 Levons nos verres ! Une soirée inoubliable en perspective…
            </div>
          </Block>
        </div>
      </div>

      {/* Vendredi 15 mai */}
      <div style={S.card}>
        <DayHeader emoji="🌲" date="Vendredi 15 mai" title="Journée Grand Air & Gastronomie" color="#4a7c6a" />
        <div style={S.content}>
          <Block time="9h30 — Place Marie Howet, Rochehaut" title="🐴 Balade en Forêt avec Attelage Ardennais">
            <p style={S.desc}>Embarquez pour une balade inoubliable à travers la forêt du Cornimont, tirés par de magnifiques chevaux de trait ardennais. Au rythme lent de l'attelage, nous traverserons les sous-bois et les chemins forestiers de cette région splendide, avec une halte en pleine nature pour déguster notre collation.</p>
            <div style={S.calloutOrange}>
              🧺 Pensez à prévoir une collation — on s'arrête en forêt pour un moment de pause champêtre !
            </div>
          </Block>
          <hr style={S.divider} />
          <Block time="12h00" title="🍴 Déjeuner au Restaurant « Point de Vue »">
            <p style={{ ...S.desc, marginBottom: "6px" }}>Route de Aale 9 — 6830 Rochehaut</p>
            <p style={S.desc}>Après notre balade, direction ce restaurant au nom évocateur, perché au-dessus de la Semois. Une table réputée, un panorama à couper le souffle sur le fameux tombeau du géant et les méandres de la rivière. Un cadre exceptionnel pour un repas mémorable.</p>
          </Block>
          <hr style={S.divider} />
          <Block time="Après-midi" title="Retour tranquille à Paliseul">
            <p style={S.desc}>Temps libre pour se reposer ou profiter de la maison.</p>
          </Block>
          <hr style={S.divider} />
          <Block time="Soirée" title="🥗 Souper — Buffet Froid">
            <p style={S.desc}>Après cette journée riche en découvertes, on se retrouve autour d'un buffet froid savoureux. Simple, frais et convivial.</p>
          </Block>
        </div>
      </div>

      {/* Samedi 16 mai */}
      <div style={S.card}>
        <DayHeader emoji="🦅" date="Samedi 16 mai" title="Randonnée & Barbecue" color="var(--brown)" />
        <div style={S.content}>
          <Block time="Journée" title="🥾 Promenade du Grand Rôly — Our (Paliseul)">
            <p style={S.desc}>Un magnifique circuit balisé au départ du village d'Our. Environ 8 à 9 km (±3 heures de marche à allure tranquille) pour une immersion totale dans les paysages ardennais les plus typiques.</p>
          </Block>

          <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--brown)", margin: "20px 0 12px", fontSize: "1rem" }}>🗺️ Le parcours en détail</h4>

          {[
            { num: "🏠", label: "Départ — Le village d'Our", desc: "Nous partons directement depuis notre maison de vacances ou à proximité immédiate du village d'Our. Le sentier s'engage rapidement sur un chemin champêtre qui quitte les dernières maisons du hameau." },
            { num: "1", label: "Les prairies et la vallée", desc: "Le chemin traverse d'abord de vastes prairies bocagères, bordées de haies vives et de clôtures en bois, typiques du paysage agricole ardennais. On longe des prés où paissent souvent des vaches de race Blanc-Bleu Belge." },
            { num: "2", label: "La montée vers le plateau du Grand Rôly", desc: "Le sentier s'élève progressivement à travers un chemin forestier bordé de hêtres, de chênes et d'épicéas. La forêt, dense et majestueuse, offre une atmosphère apaisante." },
            { num: "🧺", label: "Le plateau du Grand Rôly — Pique-nique !", desc: "En débouchant sur le plateau, le paysage s'ouvre sur un vaste panorama à environ 400 mètres d'altitude. Vue dégagée sur les collines boisées, les vallons encaissés et les villages lointains. C'est ici que nous déployons nos nappes pour savourer notre pique-nique face à ce panorama grandiose !" },
            { num: "4", label: "La descente par les chemins creux", desc: "Le sentier redescend par de pittoresques chemins creux, bordés de talus recouverts de fougères, de digitales et de myrtilles. Ces chemins ancestraux, creusés par des siècles de passage, confèrent à la balade un charme intemporel." },
            { num: "5", label: "Le ruisseau et les fonds de vallée", desc: "La descente nous mène vers un ruisseau que l'on traverse sur un petit pont de bois ou à gué. Les fonds de vallée, humides et verdoyants, abritent une flore printanière : populages des marais, aulnes et saules le long de l'eau." },
            { num: "🏡", label: "Retour vers Our", desc: "Le chemin remonte légèrement avant de retrouver les premières prairies et les abords du village d'Our. Les derniers mètres se font en douceur, avec le clocher du village en point de mire." },
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "14px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--olive)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0, marginTop: "2px" }}>
                {step.num}
              </div>
              <div>
                <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: "var(--brown)", marginBottom: "3px", fontSize: "0.95rem" }}>{step.label}</h4>
                <p style={{ ...S.desc, fontSize: "0.85rem" }}>{step.desc}</p>
              </div>
            </div>
          ))}

          <div style={{ background: "var(--cream)", border: "1px solid var(--cream-dark)", borderRadius: "10px", padding: "16px", margin: "16px 0" }}>
            <p style={{ fontWeight: 700, color: "var(--brown)", marginBottom: "8px", fontSize: "0.9rem" }}>🎒 Conseils pratiques pour la rando</p>
            {["🥾 Chaussures de marche recommandées (certains passages peuvent être boueux)", "🧥 Prévoir une couche supplémentaire pour le plateau (le vent peut souffler)", "🎒 Sac à dos avec le pique-nique, de l'eau et éventuellement des jumelles", "📷 Appareil photo indispensable !"].map((tip, i) => (
              <p key={i} style={{ fontSize: "0.85rem", color: "#5a4a3a", marginBottom: "4px" }}>{tip}</p>
            ))}
          </div>

          <hr style={S.divider} />
          <Block time="Soirée" title="🔥 Grand Barbecue">
            <p style={S.desc}>Pour notre dernière soirée tous ensemble, quoi de mieux qu'un barbecue dans le jardin ! Grillades, salades, musique douce et bonne humeur. On refait le monde, on partage les souvenirs de ces jours passés ensemble, on rit, on trinque encore une fois… Un final chaleureux et convivial comme on les aime.</p>
          </Block>
        </div>
      </div>

      {/* Dimanche 17 mai */}
      <div style={S.card}>
        <DayHeader emoji="☀️" date="Dimanche 17 mai" title="Détente & Au Revoir" color="#7a8a5a" />
        <div style={S.content}>
          <Block time="Journée Libre" title="Farniente Total">
            <p style={{ ...S.desc, marginBottom: "10px" }}>La dernière journée est placée sous le signe de la détente absolue. Profitez à volonté de :</p>
            {["🏊 La piscine — pour quelques longueurs ou une baignade tranquille", "🧖 Le sauna — pour un moment de relaxation ultime", "☕ La terrasse — pour un dernier café en contemplant la nature ardennaise", "📖 Un bon livre, une partie de cartes, une dernière balade dans le jardin…"].map((item, i) => (
              <p key={i} style={{ fontSize: "0.9rem", color: "#5a4a3a", marginBottom: "4px" }}>{item}</p>
            ))}
          </Block>
          <hr style={S.divider} />
          <Block time="Midi" title="🍽️ Repas de Midi">
            <p style={S.desc}>Un repas de midi sera organisé en fonction des présences. Merci de nous indiquer si vous serez encore parmi nous !</p>
          </Block>
          <hr style={S.divider} />
          <Block time="18h00 au plus tard" title="🚗 Départ">
            <p style={S.desc}>Il sera alors temps de se dire au revoir, le cœur plein de souvenirs, les joues encore rosies par ces jours de fête, de nature et d'amitié.</p>
          </Block>
        </div>
      </div>
    </>
  );
}
