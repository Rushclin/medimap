// front/src/app/page.tsx (SUR LA BRANCHE MAIN - sera écrasé plus tard par ta landing page)
"use client"; // Nécessaire si tu as des redirections ou du client-side JS

export default function TemporaryHomePage() {
  return (
    <div>
      <h1>Page principale temporaire de la branche main</h1>
      <p>Cette page sera remplacée par la landing page.</p>
      <a href="/map">Aller à la carte</a> {/* Lien pour tester */}
    </div>
  );
}