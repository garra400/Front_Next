import Link from 'next/link';

export default function DeviceList() {
  // TODO: Buscar dispositivos da API
  const devices = [];
  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dispositivos</h1>
          <Link href="/device/new" className="bg-green-900 text-white px-4 py-2 rounded-full font-semibold">Adicionar Dispositivo</Link>
        </div>
        <ul className="divide-y">
          {devices.length === 0 && <li className="py-8 text-center text-gray-400">Nenhum dispositivo cadastrado.</li>}
          {/* Renderizar lista de dispositivos aqui */}
        </ul>
      </div>
    </main>
  );
}
