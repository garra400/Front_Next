import Link from 'next/link';

export default function SensorList() {
  // TODO: Buscar sensores da API
  const sensors = [];
  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sensores</h1>
          <Link href="/sensor/new" className="bg-green-900 text-white px-4 py-2 rounded-full font-semibold">Adicionar Sensor</Link>
        </div>
        <ul className="divide-y">
          {sensors.length === 0 && <li className="py-8 text-center text-gray-400">Nenhum sensor cadastrado.</li>}
          {/* Renderizar lista de sensores aqui */}
        </ul>
      </div>
    </main>
  );
}
