"use client";

"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '../service/user_service';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded border"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded border"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-green-900 text-white px-6 py-2 rounded-full font-semibold mt-2">Entrar</button>
        </form>
        <div className="mt-4 text-sm">
          Não tem conta? <Link href="/register" className="text-green-900 font-semibold">Registre-se</Link>
        </div>
      </div>
    </main>
  );
}
