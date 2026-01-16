import React from "react";
import { Head, router } from "@inertiajs/react";
import Layout from "../../components/Layout";
import InvoiceForm from "../../components/InvoiceForm";
import { InvoiceFormData, InvoiceErrors } from "../../types/invoice";

interface Company {
  id: number;
  name: string;
}

interface InvoicesNewProps {
  errors?: InvoiceErrors;
  invoice?: InvoiceFormData;
  companies: Company[];
}

const InvoicesNew: React.FC<InvoicesNewProps> = ({
  errors,
  invoice,
  companies,
}) => {
  const handleSubmit = (data: InvoiceFormData) => {
    router.post("/invoices", data as Record<string, any>);
  };

  return (
    <Layout>
      <Head title="Nova Nota Fiscal" />
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Nova Nota Fiscal
        </h1>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <InvoiceForm
              invoice={invoice}
              companies={companies}
              errors={errors}
              onSubmit={handleSubmit}
              submitLabel="Criar Nota Fiscal"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvoicesNew;
