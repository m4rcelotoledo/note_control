import React from "react";
import { useForm } from "@inertiajs/react";
import { InvoiceFormData, InvoiceErrors } from "../types/invoice";

interface Company {
  id: number;
  name: string;
}

interface InvoiceFormProps {
  invoice?: InvoiceFormData | undefined;
  companies: Company[];
  errors?: InvoiceErrors | undefined;
  processing?: boolean;
  onSubmit: (data: InvoiceFormData) => void;
  submitLabel?: string;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  companies,
  errors: initialErrors,
  processing = false,
  onSubmit,
  submitLabel = "Salvar",
}) => {
  const { data, setData, errors } = useForm<InvoiceFormData>({
    number: invoice?.number || "",
    value: invoice?.value || "",
    company_id: invoice?.company_id || "",
    competence_month: invoice?.competence_month || "",
    cash_month: invoice?.cash_month || "",
    service_description: invoice?.service_description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  const displayErrors: InvoiceErrors = (initialErrors ||
    errors) as InvoiceErrors;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {displayErrors?.base && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{displayErrors.base}</div>
        </div>
      )}

      <div>
        <label
          htmlFor="number"
          className="block text-sm font-medium text-gray-700"
        >
          Número da Nota Fiscal *
        </label>
        <input
          type="text"
          id="number"
          name="number"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={data.number}
          onChange={(e) => setData("number", e.target.value)}
        />
        {displayErrors?.number && (
          <p className="mt-1 text-sm text-red-600">{displayErrors.number[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="value"
          className="block text-sm font-medium text-gray-700"
        >
          Valor (R$) *
        </label>
        <input
          type="number"
          id="value"
          name="value"
          step="0.01"
          min="0.01"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={data.value}
          onChange={(e) => setData("value", e.target.value)}
        />
        {displayErrors?.value && (
          <p className="mt-1 text-sm text-red-600">{displayErrors.value[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="company_id"
          className="block text-sm font-medium text-gray-700"
        >
          Empresa *
        </label>
        <select
          id="company_id"
          name="company_id"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={data.company_id}
          onChange={(e) => setData("company_id", e.target.value)}
        >
          <option value="">Selecione uma empresa</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {displayErrors?.company_id && (
          <p className="mt-1 text-sm text-red-600">
            {displayErrors.company_id[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="competence_month"
          className="block text-sm font-medium text-gray-700"
        >
          Mês de Competência *
        </label>
        <input
          type="month"
          id="competence_month"
          name="competence_month"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={data.competence_month}
          onChange={(e) => setData("competence_month", e.target.value)}
        />
        {displayErrors?.competence_month && (
          <p className="mt-1 text-sm text-red-600">
            {displayErrors.competence_month[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="cash_month"
          className="block text-sm font-medium text-gray-700"
        >
          Mês de Caixa *
        </label>
        <input
          type="month"
          id="cash_month"
          name="cash_month"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={data.cash_month}
          onChange={(e) => setData("cash_month", e.target.value)}
        />
        {displayErrors?.cash_month && (
          <p className="mt-1 text-sm text-red-600">
            {displayErrors.cash_month[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="service_description"
          className="block text-sm font-medium text-gray-700"
        >
          Descrição do Serviço *
        </label>
        <textarea
          id="service_description"
          name="service_description"
          rows={3}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={data.service_description}
          onChange={(e) => setData("service_description", e.target.value)}
        />
        {displayErrors?.service_description && (
          <p className="mt-1 text-sm text-red-600">
            {displayErrors.service_description[0]}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <a
          href="/invoices"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </a>
        <button
          type="submit"
          disabled={processing}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium disabled:opacity-50"
        >
          {processing ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
