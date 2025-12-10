"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SiloEdit({ params }: { params: { id: string } }) {
  const { id } = params;
  const [name, setName] = useState(''); // TODO: Buscar nome do silo pela API
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Chamar API para editar silo
    router.push('/silo');
  };

  const handleDelete = async () => {
    // TODO: Chamar API para deletar silo
    setShowConfirm(false);
    router.push('/silo');
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Editar Silo #{id}</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Nome do Silo"
            className="p-3 rounded border"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-900 text-white px-6 py-2 rounded-full font-semibold mt-2">Salvar</button>
        </form>
        <button onClick={() => setShowConfirm(true)} className="mt-6 text-red-600 font-semibold">Excluir Silo</button>
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded shadow-lg flex flex-col items-center">
              <p className="mb-4">Tem certeza que deseja excluir este silo?</p>
              <div className="flex gap-4">
                <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Sim, excluir</button>
                <button onClick={() => setShowConfirm(false)} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
