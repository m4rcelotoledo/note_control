import React, { useEffect, useRef } from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "../../components/Layout";
import { CompanyErrors } from "../../types/company";
import { useCNPJMask } from "../../hooks/useCNPJMask";

interface Company {
  id: number;
  name: string;
  cnpj?: string;
}

interface CompaniesEditProps {
  errors?: CompanyErrors;
  company: Company;
}

const CompaniesEdit: React.FC<CompaniesEditProps> = ({
  errors: initialErrors,
  company,
}) => {
  const initialCNPJ = company.cnpj || "";
  const cnpjMask = useCNPJMask(initialCNPJ);
  const cnpjMaskRef = useRef(cnpjMask);

  // Keep ref updated with current mask value
  useEffect(() => {
    cnpjMaskRef.current = cnpjMask;
  }, [cnpjMask]);

  // Update mask when company changes
  useEffect(() => {
    cnpjMask.setValue(company.cnpj || "");
  }, [company.cnpj, cnpjMask.setValue]);

  const form = useForm({
    name: company.name,
    cnpj: cnpjMask.displayValue,
  });

  const { data, setData, put, processing, errors } = form;

  // Transform the data before sending (remove formatting of the CNPJ)
  // Configure transform only once using useEffect
  // Using ref to access current mask value without adding it as dependency
  useEffect(() => {
    form.transform((data) => ({
      ...data,
      cnpj: cnpjMaskRef.current.getUnformattedValue(),
    }));
    // form.transform is stable and should only be called once on mount
    // cnpjMaskRef is a ref (stable reference) and we want to access current value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = cnpjMask.handleChange(e);
    setData("cnpj", formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/companies/${company.id}`);
  };

  const displayErrors: CompanyErrors = (initialErrors ||
    errors) as CompanyErrors;

  return (
    <Layout>
      <Head title="Editar Empresa" />
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Editar Empresa
        </h1>

        <div className="bg-white shadow sm:rounded-lg">
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            {displayErrors?.base && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{displayErrors.base}</div>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome da Empresa *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              {displayErrors?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {displayErrors.name[0]}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="cnpj"
                className="block text-sm font-medium text-gray-700"
              >
                CNPJ (opcional)
              </label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                placeholder="00.000.000/0000-00"
                maxLength={18}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={cnpjMask.displayValue}
                onChange={handleCNPJChange}
              />
              {displayErrors?.cnpj && (
                <p className="mt-1 text-sm text-red-600">
                  {displayErrors.cnpj[0]}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <a
                href="/companies"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </a>
              <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium disabled:opacity-50"
              >
                {processing ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CompaniesEdit;
