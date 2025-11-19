import Link from 'next/link';

export default function PropertyList() {
  // TODO: Buscar propriedades da API
  const properties = [];
  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Propriedades</h1>
          <Link href="/property/new" className="bg-green-900 text-white px-4 py-2 rounded-full font-semibold">Adicionar Propriedade</Link>
        </div>
        <ul className="divide-y">
          {properties.length === 0 && <li className="py-8 text-center text-gray-400">Nenhuma propriedade cadastrada.</li>}
          {/* Renderizar lista de propriedades aqui */}
        </ul>
      </div>
    </main>
  );
}
