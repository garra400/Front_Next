'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, updateUser } from "../../lib/api";

export default function UserEdit({ params }: { params: { id: string } }) {
  const { id } = params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUser(id);
        setName(data.name || "");
        setEmail(data.email || "");
      } catch (err) {
        console.error(err);
        setError("Falha ao carregar usuario");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await updateUser(id, { name, email, password: password || undefined });
      router.push("/user");
    } catch (err) {
      console.error(err);
      setError("Falha ao salvar usuario");
    }
  };

  if (loading) {
    return <main className="p-8 text-center">Carregando...</main>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Editar Usuario #{id}</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Nome"
            className="p-3 rounded border"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            className="p-3 rounded border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nova senha (opcional)"
            className="p-3 rounded border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-900 text-white px-6 py-2 rounded-full font-semibold mt-2"
          >
            Salvar
          </button>
        </form>
      </div>
    </main>
  );
}
