"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { listProperties } from "../lib/api";

type Property = { id: string; name: string };

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [personId, setPersonId] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!personId) {
      setError("Informe o personId para listar propriedades");
      setProperties([]);
      return;
    }
    setError("");
    try {
      const data = await listProperties(personId);
      setProperties(data.content || data || []);
    } catch (err) {
      console.error(err);
      setError("Falha ao carregar propriedades");
    }
  }, [personId]);

  useEffect(() => {
    if (personId) load();
  }, [load, personId]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Propriedades</h1>
            <p className="text-sm text-gray-500">Use o ID da pessoa para filtrar</p>
          </div>
          <div className="flex gap-3">
            <Link href="/property/new" className="btn btn-primary">
              Nova Propriedade
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-col gap-3">
          <label className="text-sm font-medium">Person ID</label>
          <input
            type="text"
            className="input"
            value={personId}
            onChange={(e) => setPersonId(e.target.value)}
            placeholder="Informe o ID da pessoa proprietaria"
          />
          <button type="button" className="btn btn-secondary w-full md:w-auto" onClick={load}>
            Buscar propriedades
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="bg-white border border-gray-200 rounded-lg">
          {properties.length === 0 ? (
            <p className="p-6 text-center text-gray-500">Nenhuma propriedade encontrada</p>
          ) : (
            <ul className="divide-y">
              {properties.map((p) => (
                <li key={p.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.id}</p>
                  </div>
                  <Link href={`/property/${p.id}`} className="text-primary hover:text-primary-dark text-sm">
                    Detalhes
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
