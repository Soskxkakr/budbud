interface SummaryCardProps {
  title: string;
  value: number;
  currency?: string;
  percentChange?: number;
  icon: React.ReactNode;
  iconBgClass: string;
  iconTextClass: string;
}

const SummaryCard = ({
  title,
  value,
  currency,
  percentChange,
  icon,
  iconBgClass,
  iconTextClass,
}: SummaryCardProps) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-md ${iconBgClass}`}>
            <div className={`text-xl ${iconTextClass}`}>{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {currency || "MYR"} {value}
                </div>
                {percentChange !== undefined && (
                  <div
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      percentChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {percentChange >= 0 ? (
                      <span className="flex items-center">
                        <i className="ri-arrow-up-s-fill" />
                        {percentChange.toFixed(1)}%
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <i className="ri-arrow-down-s-fill" />
                        {Math.abs(percentChange).toFixed(1)}%
                      </span>
                    )}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-primary hover:text-primary-dark"
          >
            View details
          </a>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
