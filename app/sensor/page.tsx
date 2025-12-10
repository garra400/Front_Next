"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { listSensors } from "../lib/api";

type Sensor = { id: string; physicalID: string; sensorType: string };

export default function SensorList() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!deviceId) {
      setError("Informe deviceId para listar sensores");
      setSensors([]);
      return;
    }
    setError("");
    try {
      const data = await listSensors(deviceId);
      setSensors(data.content || data || []);
    } catch (err) {
      console.error(err);
      setError("Falha ao carregar sensores");
    }
  }, [deviceId]);

  useEffect(() => {
    if (deviceId) load();
  }, [deviceId, load]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Sensores</h1>
            <p className="text-sm text-gray-500">Filtre por deviceId</p>
          </div>
          <Link href="/sensor/new" className="btn btn-primary">
            Adicionar Sensor
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-col gap-3">
          <label className="text-sm font-medium">Device ID</label>
          <input
            type="text"
            className="input"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            placeholder="ID do dispositivo"
          />
          <button type="button" className="btn btn-secondary w-full md:w-auto" onClick={load}>
            Buscar sensores
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="bg-white border border-gray-200 rounded-lg">
          {sensors.length === 0 ? (
            <p className="p-6 text-center text-gray-500">Nenhum sensor cadastrado.</p>
          ) : (
            <ul className="divide-y">
              {sensors.map((s) => (
                <li key={s.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{s.physicalID}</p>
                    <p className="text-sm text-gray-500">{s.sensorType}</p>
                  </div>
                  <Link href={`/sensor/${s.id}`} className="text-primary hover:text-primary-dark text-sm">
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
