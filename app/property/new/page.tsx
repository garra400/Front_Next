"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "../../lib/api";

export default function PropertyNew() {
  const [name, setName] = useState("");
  const [personId, setPersonId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createProperty(personId, { name });
      router.push("/property");
    } catch (err) {
      console.error(err);
      setError("Erro ao criar propriedade");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Nova Propriedade</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Person ID"
            className="p-3 rounded border"
            value={personId}
            onChange={(e) => setPersonId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nome da Propriedade"
            className="p-3 rounded border"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-900 text-white px-6 py-2 rounded-full font-semibold mt-2">
            Salvar
          </button>
        </form>
      </div>
    </main>
  );
}
