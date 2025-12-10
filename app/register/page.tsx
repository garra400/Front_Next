'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../service/user_service";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(email, password);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Erro ao registrar usuario.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Registro</h2>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Registrar
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          Ja tem conta?{" "}
          <Link href="/login" className="text-primary font-semibold hover:text-primary-dark">
            Entrar
          </Link>
        </div>
      </div>
    </main>
  );
}
