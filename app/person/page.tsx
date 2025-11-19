import Link from 'next/link';

export default function PersonList() {
  // TODO: Buscar pessoas da API
  const people = [];
  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pessoas</h1>
          <Link href="/person/new" className="bg-green-900 text-white px-4 py-2 rounded-full font-semibold">Adicionar Pessoa</Link>
        </div>
        <ul className="divide-y">
          {people.length === 0 && <li className="py-8 text-center text-gray-400">Nenhuma pessoa cadastrada.</li>}
          {/* Renderizar lista de pessoas aqui */}
        </ul>
      </div>
    </main>
  );
}
