"use client";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import BackgroundPaths from "@/components/background-paths";
import { useState } from "react";
import { useRouter } from "next/navigation";
import app from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors relative overflow-hidden">
      <BackgroundPaths />
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card z-10 relative">
        <h1 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="px-4 py-2 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="px-4 py-2 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded bg-primary text-primary-foreground font-semibold ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </form>
        {/* <div className="mt-4 text-center text-sm">
          <span>¿No tienes cuenta?</span>{" "}
          <Link href="#" className="text-primary underline cursor-not-allowed opacity-60" tabIndex={-1}>
            Regístrate
          </Link>
        </div> */}
      </div>
    </main>
  );
}
