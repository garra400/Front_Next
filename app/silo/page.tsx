"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { listSilos } from "../lib/api";

type Silo = { id: string; physicalId: number };

export default function SiloList() {
  const [silos, setSilos] = useState<Silo[]>([]);
  const [propertyId, setPropertyId] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!propertyId) {
      setError("Informe propertyId para listar silos");
      setSilos([]);
      return;
    }
    setError("");
    try {
      const data = await listSilos(propertyId);
      setSilos(data.content || data || []);
    } catch (err) {
      console.error(err);
      setError("Falha ao carregar silos");
    }
  }, [propertyId]);

  useEffect(() => {
    if (propertyId) load();
  }, [load, propertyId]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Silos</h1>
            <p className="text-sm text-gray-500">Filtrar por propriedade</p>
          </div>
          <Link href="/silo/new" className="btn btn-primary">
            Novo Silo
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-col gap-3">
          <label className="text-sm font-medium">Property ID</label>
          <input
            type="text"
            className="input"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            placeholder="Informe o ID da propriedade"
          />
          <button type="button" className="btn btn-secondary w-full md:w-auto" onClick={load}>
            Buscar silos
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="bg-white border border-gray-200 rounded-lg">
          {silos.length === 0 ? (
            <p className="p-6 text-center text-gray-500">Nenhum silo encontrado</p>
          ) : (
            <ul className="divide-y">
              {silos.map((s) => (
                <li key={s.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">Silo {s.physicalId}</p>
                    <p className="text-sm text-gray-500">{s.id}</p>
                  </div>
                  <Link href={`/silo/${s.id}`} className="text-primary hover:text-primary-dark text-sm">
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
