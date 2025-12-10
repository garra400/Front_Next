'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../lib/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Usuario ou senha invalidos.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Login</h2>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario (Cognito)"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Entrar
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          Nao tem conta?{" "}
          <Link href="/register" className="text-primary font-semibold hover:text-primary-dark">
            Registre-se
          </Link>
        </div>
      </div>
    </main>
  );
}
