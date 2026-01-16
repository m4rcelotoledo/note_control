import React from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "../../components/Layout";

interface SettingsIndexProps {
  mei_annual_limit: number;
  errors?: {
    mei_annual_limit?: string[];
  };
}

const SettingsIndex: React.FC<SettingsIndexProps> = ({
  mei_annual_limit: initialLimit,
  errors: initialErrors,
}) => {
  const { data, setData, put, processing, errors } = useForm({
    mei_annual_limit: initialLimit.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put("/settings");
  };

  const displayErrors = initialErrors || errors;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Layout>
      <Head title="Configurações" />
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Configurações</h1>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Limite Anual do MEI
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Configure o limite máximo de faturamento anual permitido para MEI.
              Este valor é usado para calcular quanto você ainda pode faturar no
              ano corrente.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {displayErrors?.mei_annual_limit && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">
                    {displayErrors.mei_annual_limit[0]}
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="mei_annual_limit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Limite Anual (R$)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">R$</span>
                  </div>
                  <input
                    type="number"
                    id="mei_annual_limit"
                    name="mei_annual_limit"
                    step="0.01"
                    min="0.01"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="81000.00"
                    value={data.mei_annual_limit}
                    onChange={(e) =>
                      setData("mei_annual_limit", e.target.value)
                    }
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Valor atual: <strong>{formatCurrency(initialLimit)}</strong>
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {processing ? "Salvando..." : "Salvar Configuração"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsIndex;
