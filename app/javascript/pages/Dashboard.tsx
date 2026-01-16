import React from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "../components/Layout";
import RemainingRevenueCard from "../components/RemainingRevenueCard";
import MonthlyChart from "../components/MonthlyChart";
import CompanyChart from "../components/CompanyChart";
import { DashboardProps } from "../types/dashboard";

const Dashboard: React.FC<DashboardProps> = ({
  total_revenue,
  remaining_revenue,
  mei_limit,
  monthly_data,
  company_data,
  recent_invoices,
  current_year,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Layout>
      <Head title="Dashboard" />
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Ano {current_year}</p>
        </div>

        {/* Remaining Revenue Card */}
        <div className="mb-8">
          <RemainingRevenueCard
            totalRevenue={total_revenue}
            remainingRevenue={remaining_revenue}
            meiLimit={mei_limit}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Faturamento Mensal
            </h2>
            <MonthlyChart data={monthly_data} />
          </div>

          {/* Company Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Faturamento por Empresa
            </h2>
            {company_data.length > 0 ? (
              <CompanyChart data={company_data} />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                Nenhum dado disponível
              </div>
            )}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Notas Fiscais Recentes
            </h2>
            <Link
              href="/invoices/new"
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Nova Nota Fiscal
            </Link>
          </div>
          {recent_invoices.length === 0 ? (
            <div className="px-6 py-12 text-center">
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
            <ul className="divide-y divide-gray-200">
              {recent_invoices.map((invoice) => (
                <li key={invoice.id}>
                  <Link
                    href={`/invoices/${invoice.id}/edit`}
                    className="block px-6 py-4 hover:bg-gray-50"
                  >
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
                          <span>
                            <strong>Competência:</strong>{" "}
                            {new Date(
                              invoice.competence_month + "-01"
                            ).toLocaleDateString("pt-BR", {
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 text-sm text-gray-500">
                        {new Date(invoice.created_at).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {recent_invoices.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 text-center">
              <Link
                href="/invoices"
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                Ver todas as notas fiscais →
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
