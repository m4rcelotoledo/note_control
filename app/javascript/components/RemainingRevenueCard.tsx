import React from "react";

interface RemainingRevenueCardProps {
  totalRevenue: number;
  remainingRevenue: number;
  meiLimit: number;
}

const RemainingRevenueCard: React.FC<RemainingRevenueCardProps> = ({
  totalRevenue,
  remainingRevenue,
  meiLimit,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const percentage = (totalRevenue / meiLimit) * 100;
  const isExceeded = percentage > 100;
  const isWarning = percentage >= 80 && !isExceeded;
  const isDanger = percentage >= 95 && !isExceeded;
  const exceededAmount = isExceeded ? totalRevenue - meiLimit : 0;

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center ${
                isExceeded
                  ? "bg-red-200"
                  : isDanger
                  ? "bg-red-100"
                  : isWarning
                  ? "bg-yellow-100"
                  : "bg-green-100"
              }`}
            >
              <span
                className={`text-2xl ${
                  isExceeded
                    ? "text-red-700"
                    : isDanger
                    ? "text-red-600"
                    : isWarning
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {isExceeded ? "🚨" : isDanger ? "⚠️" : isWarning ? "⚡" : "✓"}
              </span>
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {isExceeded
                  ? "Limite Ultrapassado"
                  : "Faturamento Restante no Ano"}
              </dt>
              <dd className="flex items-baseline">
                <div
                  className={`text-2xl font-semibold ${
                    isExceeded ? "text-red-700" : "text-gray-900"
                  }`}
                >
                  {isExceeded
                    ? `+${formatCurrency(exceededAmount)}`
                    : formatCurrency(remainingRevenue)}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-600">
              Faturado: {formatCurrency(totalRevenue)}
            </span>
            <span className="text-gray-600">
              Limite: {formatCurrency(meiLimit)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                isExceeded
                  ? "bg-red-700"
                  : isDanger
                  ? "bg-red-600"
                  : isWarning
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {percentage.toFixed(1)}% do limite utilizado
            {isExceeded && (
              <span className="ml-2 text-red-700 font-semibold">
                🚨 ALERTA: Limite ultrapassado em{" "}
                {formatCurrency(exceededAmount)}! Você pode estar desenquadrado
                como MEI.
              </span>
            )}
            {isDanger && !isExceeded && (
              <span className="ml-2 text-red-600 font-semibold">
                ⚠️ Atenção: Próximo do limite!
              </span>
            )}
            {isWarning && !isDanger && !isExceeded && (
              <span className="ml-2 text-yellow-600 font-semibold">
                ⚡ Cuidado: Fique atento ao limite
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemainingRevenueCard;
