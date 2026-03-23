interface Dolor {
  dolor: string;
  costo_mensual_usd: number | string;
  calculo: string;
}

interface Automatizacion {
  nombre: string;
  descripcion: string;
  plataformas: string[] | string;
}

interface SolucionIdeal {
  dolores_identificados: Dolor[];
  automatizaciones: Automatizacion[];
  precio_implementacion_usd: number | string;
  precio_mensual_usd: number | string;
  argumento_venta: string;
}

interface Props {
  solucionIdeal: SolucionIdeal;
  calculoUsuario: string;
  solucionUsuario: string;
  onReset: () => void;
}

const Screen3 = ({ solucionIdeal, calculoUsuario, solucionUsuario, onReset }: Props) => {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-12 pb-12 relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 pixel-grid-bg" />
      <div className="relative z-10">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-primary" style={{ textShadow: "4px 4px 0px hsl(28 100% 15%)" }}>
            Resultados
          </h1>
        </header>

        {/* User solution recap */}
        <section className="mb-12 bg-surface-container-highest p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 bg-primary text-on-primary font-black text-[10px] uppercase">Input_User</div>
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">TU SOLUCIÓN</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-2">Cálculo de Impacto</label>
              <div className="bg-background p-4 border border-outline-variant min-h-[80px]">
                <p className="text-sm font-medium">{calculoUsuario || "Sin respuesta"}</p>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-2">Solución Planteada</label>
              <div className="bg-background p-4 border border-outline-variant min-h-[80px]">
                <p className="text-sm font-medium">{solucionUsuario || "Sin respuesta"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Solution */}
        <section className="mb-12 border-4 border-primary p-8 md:p-12 relative">
          <div className="absolute -top-5 left-8 bg-primary px-4 py-1 text-on-primary font-black uppercase tracking-widest text-sm">
            SOLUCIÓN DE LA IA
          </div>

          {/* Dolores */}
          <div className="mb-12">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-on-surface-variant" /> DOLORES IDENTIFICADOS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solucionIdeal.dolores_identificados.map((d, i) => (
                <div key={i} className="bg-surface-container-high p-6 border-b-4 border-error">
                  <p className="text-xs font-bold text-error uppercase mb-2">{d.dolor}</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-black">{d.costo_mensual_usd}</span>
                    <span className="text-xs font-bold opacity-60">USD / MES</span>
                  </div>
                  <p className="text-xs text-on-surface-variant italic">{d.calculo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Automatizaciones */}
          <div className="mb-12">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-on-surface-variant" /> AUTOMATIZACIONES
            </h3>
            <div className="space-y-4">
              {solucionIdeal.automatizaciones.map((a, i) => (
                <div key={i} className="bg-background p-6 flex flex-col gap-6 border-l-4 border-tertiary">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold uppercase tracking-tight text-tertiary">{a.nombre}</h4>
                    <p className="text-sm text-on-surface-variant mt-1">{a.descripcion}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {(Array.isArray(a.plataformas) ? a.plataformas : a.plataformas.split(", ")).map((p, j) => (
                      <span key={j} className="bg-surface-container-highest px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inversión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-surface-container-highest p-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Inversión Inicial</span>
              <p className="text-4xl font-black mt-2">{solucionIdeal.precio_implementacion_usd} <span className="text-sm opacity-50"></span></p>
              <p className="text-xs text-on-surface-variant mt-2">Implementación y configuración de infraestructura.</p>
            </div>
            <div className="bg-surface-container-highest p-8 border-l-2 border-primary">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Mantenimiento Mensual</span>
              <p className="text-4xl font-black mt-2">{solucionIdeal.precio_mensual_usd} <span className="text-sm opacity-50"></span></p>
              <p className="text-xs text-on-surface-variant mt-2">Tokens de IA, licencias y soporte.</p>
            </div>
          </div>

          {/* Argumento de venta */}
          <div className="bg-primary p-8">
            <h4 className="text-on-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">SPEECH DE VENTA</h4>
            <p className="text-on-primary text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none italic">
              "{solucionIdeal.argumento_venta}"
            </p>
          </div>
        </section>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="w-full bg-primary text-on-primary h-20 flex items-center justify-center gap-4 group hover:bg-primary-container transition-colors active:translate-y-1"
        >
          <span className="text-2xl font-black uppercase tracking-tighter">NUEVA SIMULACIÓN</span>
          <span className="material-symbols-outlined text-3xl group-hover:rotate-180 transition-transform duration-500">refresh</span>
        </button>
      </div>
    </main>
  );
};

export default Screen3;
