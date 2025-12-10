'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { listUsers } from "../lib/api";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setError("");
    try {
      const data = await listUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar usuarios");
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <main>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={loadUsers}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
              Atualizar
            </button>
            <Link
              href="/user/new"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center"
            >
              Novo
            </Link>
          </div>
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">ID</th>
                <th className="py-3 px-4 border-b text-left">Nome</th>
                <th className="py-3 px-4 border-b text-left">E-mail</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{user.id}</td>
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/" className="block mt-6 text-blue-600 underline">
          Voltar ao Home
        </Link>
      </div>
    </main>
  );
}
