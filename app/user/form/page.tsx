'use client';

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createUser } from "../../lib/api";

type MensagemEstado = {
  tipo: "sucesso" | "erro" | "";
  texto: string;
};

export default function UserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState<MensagemEstado>({ tipo: "", texto: "" });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const payload = {
        name: `${firstName} ${lastName}`.trim(),
        email,
        password: crypto.randomUUID(), // senha dummy, backend exige campo
      };
      const data = await createUser(payload);
      setMensagem({
        tipo: "sucesso",
        texto: `Usuario criado (id: ${data.id ?? "novo"})`,
      });

      setLastName("");
      setFirstName("");
      setEmail("");
    } catch (error) {
      console.error(error);
      setMensagem({ tipo: "erro", texto: "Nao foi possivel concluir o cadastro." });
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Usuarios</p>
          <h1 className="text-2xl font-bold text-gray-900">Cadastro de usuario</h1>
        </div>
        <Link href="/user" className="text-sm font-medium text-primary hover:text-primary-dark">
          Voltar para lista
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        {mensagem.texto && (
          <div
            className={`mb-4 p-3 rounded ${
              mensagem.tipo === "sucesso"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {mensagem.texto}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block font-medium mb-1">
              Nome
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block font-medium mb-1">
              Sobrenome
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full md:w-auto"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
