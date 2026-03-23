import { useState } from "react";
import Screen1 from "@/components/Screen1";
import Screen2 from "@/components/Screen2";
import Screen3 from "@/components/Screen3";

const WEBHOOK_URL = "TU_WEBHOOK_URL_AQUI";

const Index = () => {
  const [screen, setScreen] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [casoActual, setCasoActual] = useState<any>(null);
  const [calculoUsuario, setCalculoUsuario] = useState("");
  const [solucionUsuario, setSolucionUsuario] = useState("");
  const [lastRequest, setLastRequest] = useState<{ negocio: string; dificultad: string } | null>(null);

  const handleGenerate = async (negocio: string, dificultad: string) => {
    setLoading(true);
    setError(null);
    setLastRequest({ negocio, dificultad });

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo_negocio: negocio, dificultad }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const raw = await res.json();
      console.log("Webhook response:", raw);
      const data = Array.isArray(raw) ? raw[0] : raw;
      setCasoActual(data);
      setScreen(2);
    } catch (e: any) {
      setError(e.message || "Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastRequest) {
      handleGenerate(lastRequest.negocio, lastRequest.dificultad);
    }
  };

  const handleSubmitSolution = (calculo: string, solucion: string) => {
    setCalculoUsuario(calculo);
    setSolucionUsuario(solucion);
    setScreen(3);
  };

  const handleReset = () => {
    setScreen(1);
    setCasoActual(null);
    setCalculoUsuario("");
    setSolucionUsuario("");
    setError(null);
    setLastRequest(null);
  };

  // Error screen
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="absolute inset-0 opacity-5 pointer-events-none pixel-dot-bg" />
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-error/20 flex items-center justify-center mx-auto mb-6 border-b-4 border-error">
            <span className="material-symbols-outlined text-error text-5xl">error</span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-error mb-4">ERROR DE CONEXIÓN</h2>
          <p className="text-on-surface-variant font-bold uppercase text-sm mb-8">{error}</p>
          <button
            onClick={handleRetry}
            className="px-10 py-4 bg-primary text-on-primary font-black uppercase tracking-tighter text-lg chunky-shadow chunky-shadow-active flex items-center gap-3 mx-auto"
          >
            <span className="material-symbols-outlined">refresh</span>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (screen === 1) {
    return <Screen1 onGenerate={handleGenerate} loading={loading} />;
  }

  if (screen === 2 && casoActual?.negocio) {
    return <Screen2 negocio={casoActual.negocio} observaciones={casoActual.observaciones} onSubmit={handleSubmitSolution} />;
  }

  if (screen === 3 && casoActual?.solucion_ideal) {
    return (
      <Screen3
        solucionIdeal={casoActual.solucion_ideal}
        calculoUsuario={calculoUsuario}
        solucionUsuario={solucionUsuario}
        onReset={handleReset}
      />
    );
  }

  return <Screen1 onGenerate={handleGenerate} loading={loading} />;
};

export default Index;
