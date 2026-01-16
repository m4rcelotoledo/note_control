import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import Layout from "../../components/Layout";
import { Invoice } from "../../types/invoice";

interface Company {
  id: number;
  name: string;
}

interface InvoicesIndexProps {
  invoices: Invoice[];
  companies: Company[];
}

const InvoicesIndex: React.FC<InvoicesIndexProps> = ({
  invoices,
  companies,
}) => {
  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta nota fiscal?")) {
      router.delete(`/invoices/${id}`);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatMonth = (monthStr: string | undefined) => {
    if (!monthStr) return "";
    const parts = monthStr.split("-");
    if (parts.length !== 2) return monthStr;
    const year = parseInt(parts[0] || "0", 10);
    const month = parseInt(parts[1] || "0", 10);
    if (isNaN(year) || isNaN(month)) return monthStr;
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  };

  return (
    <Layout>
      <Head title="Notas Fiscais" />
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Notas Fiscais</h1>
          <Link
            href="/invoices/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Nova Nota Fiscal
          </Link>
        </div>

        {invoices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              Nenhuma nota fiscal cadastrada ainda.
            </p>
            <Link
              href="/invoices/new"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Cadastrar primeira nota fiscal
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <li key={invoice.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-gray-900">
                            NF #{invoice.number}
                          </p>
                          <span className="ml-4 text-lg font-semibold text-indigo-600">
                            {formatCurrency(invoice.value)}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="mr-4">
                            <strong>Empresa:</strong> {invoice.company_name}
                          </span>
                          <span className="mr-4">
                            <strong>Competência:</strong>{" "}
                            {formatMonth(invoice.competence_month)}
                          </span>
                          <span>
                            <strong>Caixa:</strong>{" "}
                            {formatMonth(invoice.cash_month)}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <strong>Serviço:</strong>{" "}
                          {invoice.service_description}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/invoices/${invoice.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Excluir
                        </button>
                      </div>
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

export default InvoicesIndex;
