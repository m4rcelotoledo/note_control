import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import Layout from "../../components/Layout";
import { formatCNPJ } from "../../utils/cnpj";

interface Company {
  id: number;
  name: string;
  cnpj?: string;
  invoices_count: number;
  created_at: string;
}

interface CompaniesIndexProps {
  companies: Company[];
}

const CompaniesIndex: React.FC<CompaniesIndexProps> = ({ companies }) => {
  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta empresa?")) {
      router.delete(`/companies/${id}`);
    }
  };

  return (
    <Layout>
      <Head title="Empresas" />
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Empresas</h1>
          <Link
            href="/companies/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Nova Empresa
          </Link>
        </div>

        {companies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              Nenhuma empresa cadastrada ainda.
            </p>
            <Link
              href="/companies/new"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Cadastrar primeira empresa
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {companies.map((company) => (
                <li key={company.id}>
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="text-lg font-medium text-gray-900">
                          {company.name}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        {company.cnpj && (
                          <span className="mr-4">
                            CNPJ: {formatCNPJ(company.cnpj)}
                          </span>
                        )}
                        <span>{company.invoices_count} nota(s) fiscal(is)</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/companies/${company.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(company.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompaniesIndex;
