import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { AuthErrors } from "../../types/user";

interface RegisterProps {
  errors?: AuthErrors;
  user?: { email?: string };
}

const Register: React.FC<RegisterProps> = ({
  errors: initialErrors,
  user: initialUser,
}) => {
  const formData = {
    email: initialUser?.email || "",
    password: "",
    password_confirmation: "",
  };

  const { data, setData, post, processing, errors } = useForm(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/registrations", {
      data: {
        user: {
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
      },
    });
  };

  const displayErrors: AuthErrors = (initialErrors || errors) as AuthErrors;

  return (
    <>
      <Head title="Cadastro" />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Criar nova conta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Cadastre-se para começar a controlar suas notas fiscais
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {displayErrors?.base && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{displayErrors.base}</div>
              </div>
            )}

            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="seu@email.com"
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mínimo 6 caracteres"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                />
                {displayErrors?.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {displayErrors.password[0]}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmar Senha
                </label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Digite a senha novamente"
                  value={data.password_confirmation}
                  onChange={(e) =>
                    setData("password_confirmation", e.target.value)
                  }
                />
                {displayErrors?.password_confirmation && (
                  <p className="mt-1 text-sm text-red-600">
                    {displayErrors.password_confirmation[0]}
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
                {processing ? "Criando conta..." : "Criar conta"}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/sessions/new"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Já tem uma conta? Faça login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
