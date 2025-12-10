"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSensor } from "../../lib/api";

const SENSOR_TYPES = [
  "TEMP_GRAIN",
  "MOISTURE_GRAIN",
  "CO2_GAS",
  "O2_GAS",
  "HUMIDITY_AIR",
  "TEMP_AIR",
  "PRESSURE_DIFF",
  "LEVEL_POINT",
  "LEVEL_CONTINUOUS",
];

export default function SensorNew() {
  const [deviceId, setDeviceId] = useState("");
  const [physicalID, setPhysicalID] = useState("");
  const [sensorType, setSensorType] = useState(SENSOR_TYPES[0]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createSensor(deviceId, { physicalID, sensorType });
      router.push("/sensor");
    } catch (err) {
      console.error(err);
      setError("Erro ao criar sensor");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Novo Sensor</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Device ID"
            className="p-3 rounded border"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Identificador fisico"
            className="p-3 rounded border"
            value={physicalID}
            onChange={(e) => setPhysicalID(e.target.value)}
            required
          />
          <select
            className="p-3 rounded border"
            value={sensorType}
            onChange={(e) => setSensorType(e.target.value)}
          >
            {SENSOR_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-green-900 text-white px-6 py-2 rounded-full font-semibold mt-2">
            Salvar
          </button>
        </form>
      </div>
    </main>
  );
}
