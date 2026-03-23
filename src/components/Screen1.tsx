import { useState } from "react";

interface Props {
  onGenerate: (negocio: string, dificultad: string) => void;
  loading: boolean;
}

const negocios = [
  { id: "SPA y Salones de Belleza", icon: "spa", color: "error" },
  { id: "Consultorios Médicos y Dentales", icon: "medical_services", color: "tertiary" },
  { id: "Gimnasios y Centros de Fitness", icon: "fitness_center", color: "primary" },
];

const dificultades = ["Fácil", "Medio", "Difícil"];

const colorMap: Record<string, { border: string; bg: string; text: string; btnBg: string; btnText: string }> = {
  error: { border: "border-error", bg: "bg-error/20", text: "text-error", btnBg: "bg-error", btnText: "text-on-primary" },
  tertiary: { border: "border-tertiary", bg: "bg-tertiary/20", text: "text-tertiary", btnBg: "bg-tertiary", btnText: "text-on-tertiary" },
  primary: { border: "border-primary", bg: "bg-primary/20", text: "text-primary", btnBg: "bg-primary", btnText: "text-on-primary" },
};

const Screen1 = ({ onGenerate, loading }: Props) => {
  const [selectedNegocio, setSelectedNegocio] = useState<string | null>(null);
  const [dificultad, setDificultad] = useState("Medio");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="absolute inset-0 opacity-5 pointer-events-none pixel-dot-bg" />
        <div className="relative z-10 text-center">
          <div className="flex gap-2 justify-center mb-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-6 h-6 bg-primary animate-pixel-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-2xl font-black uppercase tracking-widest text-primary animate-pixel-blink">
            Generando caso de estudio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full py-12 px-6 md:px-12 relative bg-background min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 opacity-5 pointer-events-none pixel-dot-bg" />
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter mb-4" style={{ textShadow: "4px 4px 0px hsl(28 100% 15%)" }}>
            Simulador de Ventas
          </h1>
          <p className="text-on-surface-variant font-bold uppercase tracking-widest text-sm">
            Selecciona tu dominio comercial y comienza el desafío
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {negocios.map((n) => {
            const c = colorMap[n.color];
            const selected = selectedNegocio === n.id;
            return (
              <div
                key={n.id}
                onClick={() => setSelectedNegocio(n.id)}
                className={`group relative bg-surface-container-high p-1 border-4 ${c.border} hover:-translate-y-2 transition-transform cursor-pointer ${selected ? "-translate-y-2 ring-2 ring-offset-2 ring-offset-background ring-primary" : ""}`}
              >
                <div className="bg-background p-6 h-full flex flex-col items-center text-center">
                  <div className={`w-20 h-20 ${c.bg} flex items-center justify-center mb-6 border-b-4 ${c.border}`}>
                    <span className={`material-symbols-outlined ${c.text} text-5xl`} style={{ fontVariationSettings: "'FILL' 1" }}>{n.icon}</span>
                  </div>
                  <h3 className="text-xl font-black text-on-surface uppercase mb-3 leading-tight">{n.id}</h3>
                  <div className={`mt-auto w-full py-2 ${selected ? c.btnBg : "bg-surface-container-highest"} ${selected ? c.btnText : "text-on-surface-variant"} font-bold text-xs uppercase transition-colors`}>
                    {selected ? "✓ Seleccionado" : "Seleccionar"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <section className="max-w-2xl mx-auto mb-16">
          <h4 className="text-center font-black text-primary uppercase mb-6 tracking-widest text-sm">
            Nivel de Dificultad
          </h4>
          <div className="flex flex-col md:flex-row gap-0 border-4 border-surface-container-highest">
            {dificultades.map((d, i) => (
              <button
                key={d}
                onClick={() => setDificultad(d)}
                className={`flex-1 py-4 font-black uppercase tracking-tighter transition-colors ${
                  i < dificultades.length - 1 ? "border-b-4 md:border-b-0 md:border-r-4 border-surface-container-highest" : ""
                } ${dificultad === d ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </section>

        <footer className="flex justify-center">
          <button
            onClick={() => selectedNegocio && onGenerate(selectedNegocio, dificultad)}
            disabled={!selectedNegocio}
            className="group relative px-12 py-6 bg-primary text-on-primary text-2xl font-black uppercase tracking-tighter chunky-shadow chunky-shadow-active flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Generar Simulación
            <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">rocket_launch</span>
          </button>
        </footer>
      </div>

      <div className="fixed top-20 right-8 w-12 h-12 bg-surface-container-highest border-b-4 border-r-4 border-outline-variant opacity-20 hidden lg:block" />
      <div className="fixed bottom-20 left-8 w-16 h-16 bg-surface-container-highest border-t-4 border-l-4 border-outline-variant opacity-20 hidden lg:block" />
    </main>
  );
};

export default Screen1;
