import { useState } from "react";

interface Negocio {
  nombre: string;
  ciudad: string;
  personal: string;
  ticket_promedio: string;
  ingreso_mensual: string;
  detalle_extra: string;
  observaciones: string[];
}

interface Props {
  negocio: Negocio;
  onSubmit: (calculo: string, solucion: string) => void;
}

const Screen2 = ({ negocio, onSubmit }: Props) => {
  const [calculo, setCalculo] = useState("");
  const [solucion, setSolucion] = useState("");

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12 pb-12 relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 pixel-grid-bg" />
      <div className="relative z-10">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-block bg-surface-container p-6 border-b-4 border-r-4 border-primary pixel-border-primary">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-primary leading-none mb-2">
              {negocio.nombre}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-secondary">location_on</span>
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                {negocio.ciudad}
              </p>
            </div>
          </div>
        </header>

        {/* Business Details */}
        <section className="mb-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary" /> DETALLES DEL NEGOCIO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-surface-container p-5 border-l-4 border-primary">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">Personal</p>
              <p className="text-lg font-black text-on-surface uppercase">{negocio.personal}</p>
            </div>
            <div className="bg-surface-container p-5 border-l-4 border-primary">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">Ticket Promedio</p>
              <p className="text-lg font-black text-primary">{negocio.ticket_promedio}</p>
            </div>
            <div className="bg-surface-container p-5 border-l-4 border-primary">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">Ingreso Mensual</p>
              <p className="text-lg font-black text-on-surface">{negocio.ingreso_mensual}</p>
            </div>
          </div>
          <div className="bg-surface-container p-6 border-2 border-primary border-dashed relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">
              Data Log
            </div>
            <p className="text-xs font-black text-primary uppercase mb-2">DETALLE ADICIONAL</p>
            <p className="text-sm font-medium text-on-surface leading-relaxed">{negocio.detalle_extra}</p>
          </div>
        </section>

        {/* Observations */}
        <section className="mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary" /> OBSERVACIONES DE LA SIMULACIÓN
          </h2>
          <div className="space-y-6">
            {negocio.observaciones.map((obs, i) => (
              <div
                key={i}
                className={`relative p-6 ${i % 2 === 0 ? "bg-surface-container" : "bg-surface-container-high"}`}
              >
                <div className="flex items-start gap-4">
                  <span className="bg-primary text-on-primary font-black px-2 py-1 text-sm shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-bold leading-snug">{obs}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* User Input */}
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8 flex items-center gap-2">
          <span className="w-8 h-1 bg-primary" /> TU SOLUCIÓN
        </h2>

        <section className="mb-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary" /> CÁLCULO DE IMPACTO
          </h3>
          <div className="bg-surface-container p-1 border-2 border-primary pixel-border-primary">
            <textarea
              value={calculo}
              onChange={(e) => setCalculo(e.target.value)}
              className="w-full bg-surface-container text-on-surface p-4 border-none focus:ring-2 focus:ring-primary min-h-[120px] font-body text-base placeholder:text-on-surface-variant/30 outline-none"
              placeholder="Ingrese el desglose detallado del impacto económico..."
            />
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary" /> SOLUCIÓN PLANTEADA
          </h3>
          <div className="bg-surface-container p-1 border-2 border-primary pixel-border-primary">
            <textarea
              value={solucion}
              onChange={(e) => setSolucion(e.target.value)}
              className="w-full bg-surface-container text-on-surface p-4 border-none focus:ring-2 focus:ring-primary min-h-[120px] font-body text-base placeholder:text-on-surface-variant/30 outline-none"
              placeholder="Describa qué automatizaciones propone y con qué plataformas..."
            />
          </div>
        </section>

        <footer className="flex justify-center mb-12">
          <button
            onClick={() => onSubmit(calculo, solucion)}
            className="group relative bg-primary px-10 py-5 flex items-center gap-4 transition-transform active:translate-y-1"
          >
            <div className="absolute inset-0 translate-x-2 translate-y-2 bg-primary-container -z-10" />
            <span className="material-symbols-outlined text-on-primary font-black">visibility</span>
            <span className="text-xl font-black uppercase tracking-tighter text-on-primary">
              VER RESULTADOS
            </span>
          </button>
        </footer>
      </div>
    </main>
  );
};

export default Screen2;
