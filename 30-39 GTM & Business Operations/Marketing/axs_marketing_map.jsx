import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AxsMarketingMap() {
  return (
    <div className="p-6 grid gap-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-8">AXS Marketing Map 🚀</h1>

      {/* Layer 1 - Core */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">1. Core (Estrategia + Identidad + Story)</h2>
          <ul className="list-disc ml-6 text-lg">
            <li>Propósito: “AXS redefine el ecosistema tecnológico global desde Chile”.</li>
            <li>Voz visionaria + emocional (Tony Stark + MIT + CocaCola).</li>
            <li>Manual de marca: logo, paleta, tipografía, tono, microcopy.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Layer 2 - Motor de Datos */}
      <Card className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">2. Motor de Datos</h2>
          <ul className="list-disc ml-6 text-lg">
            <li>CRM + dashboards de KPIs.</li>
            <li>IA para predicción de comportamiento.</li>
            <li>Growth loops (virales, referrals, gamificación).</li>
          </ul>
        </CardContent>
      </Card>

      {/* Layer 3 - Multicanalidad Integrada */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">3. Multicanalidad Integrada</h2>
          <ul className="list-disc ml-6 text-lg">
            <li>Online: Web, SEO, email, social, ads, funnels.</li>
            <li>Offline: PR, eventos tech, universidades, ONGs.</li>
            <li>Todo trackeado con UTM + Data Studio.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Layer 4 - Engagement + Experiencia */}
      <Card className="bg-gradient-to-r from-purple-600 to-fuchsia-700 text-white shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">4. Engagement + Experiencia</h2>
          <ul className="list-disc ml-6 text-lg">
            <li>Experiencias interactivas (VR, IA, gamificación).</li>
            <li>Contenido adaptado por región.</li>
            <li>Narrativa: “Chile como cuna tecnológica”.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Layer 5 - Impacto Cultural */}
      <Card className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">5. Impacto Cultural</h2>
          <ul className="list-disc ml-6 text-lg">
            <li>Campañas sociales y educación tecnológica.</li>
            <li>Storytelling emocional (Atacama → innovación solar).</li>
          </ul>
        </CardContent>
      </Card>

      {/* Layer 6 - Escalabilidad Global */}
      <Card className="bg-gradient-to-r from-cyan-600 to-sky-700 text-white shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">6. Escalabilidad Global</h2>
          <ul className="list-disc ml-6 text-lg">
            <li>Acciones replicables en cualquier mercado.</li>
            <li>Estrategias modulares y adaptables.</li>
            <li>Visión omnipresente: competir y superar a Big Tech.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
