import Link from 'next/link';

export default function SiloList() {
  // TODO: Buscar silos da API
  const silos = [];
  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Silos</h1>
          <Link href="/silo/new" className="bg-green-900 text-white px-4 py-2 rounded-full font-semibold">Adicionar Silo</Link>
        </div>
        <ul className="divide-y">
          {silos.length === 0 && <li className="py-8 text-center text-gray-400">Nenhum silo cadastrado.</li>}
          {/* Renderizar lista de silos aqui */}
        </ul>
      </div>
    </main>
  );
}
