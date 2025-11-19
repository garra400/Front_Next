
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-white">
      <section className="flex-1 flex flex-col items-center justify-center w-full">
        <h1 className="text-5xl font-serif font-bold text-center mt-16 mb-8">Dashboard</h1>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/silo" className="bg-gray-100 hover:bg-green-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition">
            <span className="text-3xl font-bold mb-2">Silos</span>
            <span className="text-gray-500">Gerencie os silos cadastrados</span>
          </Link>
          <Link href="/sensor" className="bg-gray-100 hover:bg-green-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition">
            <span className="text-3xl font-bold mb-2">Sensores</span>
            <span className="text-gray-500">Gerencie sensores de monitoramento</span>
          </Link>
          <Link href="/device" className="bg-gray-100 hover:bg-green-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition">
            <span className="text-3xl font-bold mb-2">Dispositivos</span>
            <span className="text-gray-500">Gerencie dispositivos IoT</span>
          </Link>
          <Link href="/property" className="bg-gray-100 hover:bg-green-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition">
            <span className="text-3xl font-bold mb-2">Propriedades</span>
            <span className="text-gray-500">Gerencie propriedades rurais</span>
          </Link>
          <Link href="/person" className="bg-gray-100 hover:bg-green-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition">
            <span className="text-3xl font-bold mb-2">Pessoas</span>
            <span className="text-gray-500">Gerencie pessoas do sistema</span>
          </Link>
          <Link href="/user" className="bg-gray-100 hover:bg-green-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition">
            <span className="text-3xl font-bold mb-2">Usuários</span>
            <span className="text-gray-500">Gerencie usuários e permissões</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
