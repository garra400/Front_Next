"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authFetch } from '../../service/user_service';

export default function UserNew() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await authFetch('http://localhost:8080/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error('Erro ao criar usuário');
      router.push('/user');
    } catch {
      setError('Erro ao criar usuário');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Novo Usuário</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do Usuário"
            className="p-3 rounded border"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            className="p-3 rounded border"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="p-3 rounded border"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-900 text-white px-6 py-2 rounded-full font-semibold mt-2">Salvar</button>
        </form>
      </div>
    </main>
  );
}
