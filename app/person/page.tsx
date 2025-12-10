"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { listPersons } from "../lib/api";

type Person = { id: string; name: string };

export default function PersonList() {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const data = await listPersons();
      setPeople(data.content || data || []);
    } catch (err) {
      console.error(err);
      setError("Falha ao carregar pessoas");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pessoas</h1>
          <Link href="/person/new" className="btn btn-primary">
            Adicionar Pessoa
          </Link>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <ul className="divide-y bg-white border border-gray-200 rounded-lg">
          {people.length === 0 && (
            <li className="py-8 text-center text-gray-400">Nenhuma pessoa cadastrada.</li>
          )}
          {people.map((p) => (
            <li key={p.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className="text-sm text-gray-500">{p.id}</p>
              </div>
              <Link href={`/person/${p.id}`} className="text-primary hover:text-primary-dark text-sm">
                Detalhes
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
