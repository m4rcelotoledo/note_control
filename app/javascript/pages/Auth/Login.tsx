import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { AuthErrors } from "../../types/user";

interface LoginProps {
  errors?: AuthErrors;
  email?: string;
}

const Login: React.FC<LoginProps> = ({
  errors: initialErrors,
  email: initialEmail,
}) => {
  const { data, setData, post, processing, errors } = useForm({
    email: initialEmail || "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/sessions");
  };

  const displayErrors: AuthErrors = (initialErrors || errors) as AuthErrors;

  return (
    <>
      <Head title="Login" />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Controle de Notas Fiscais MEI
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Faça login na sua conta
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {displayErrors?.base && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{displayErrors.base}</div>
              </div>
            )}

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                />
                {displayErrors?.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {displayErrors.email[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                />
                {displayErrors?.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {displayErrors.password[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {processing ? "Entrando..." : "Entrar"}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/registrations/new"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Não tem uma conta? Cadastre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
