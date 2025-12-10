"use client";

'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { listDevices } from "../lib/api";

type Device = { id: string; mac: string; ip: string };

export default function DeviceList() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [siloId, setSiloId] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const data = await listDevices(siloId || undefined);
      const content = data.content || data;
      setDevices(content?.content || content || []);
    } catch (err) {
      console.error(err);
      setError("Falha ao carregar dispositivos");
    }
  }, [siloId]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dispositivos</h1>
            <p className="text-sm text-gray-500">Opcional: filtrar por silo</p>
          </div>
          <Link href="/device/new" className="btn btn-primary">
            Adicionar Dispositivo
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-col gap-3">
          <label className="text-sm font-medium">Silo ID (opcional)</label>
          <input
            type="text"
            className="input"
            value={siloId}
            onChange={(e) => setSiloId(e.target.value)}
            placeholder="Filtrar por silo ID"
          />
          <button type="button" className="btn btn-secondary w-full md:w-auto" onClick={load}>
            Buscar dispositivos
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="bg-white border border-gray-200 rounded-lg">
          {devices.length === 0 ? (
            <p className="p-6 text-center text-gray-500">Nenhum dispositivo cadastrado.</p>
          ) : (
            <ul className="divide-y">
              {devices.map((d) => (
                <li key={d.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{d.mac}</p>
                    <p className="text-sm text-gray-500">{d.ip}</p>
                  </div>
                  <Link href={`/device/${d.id}`} className="text-primary hover:text-primary-dark text-sm">
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
