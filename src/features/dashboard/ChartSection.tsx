import RevenueChart from "./RevenueChart";

function ChartSection() {
  return (
    <div className="grid grid-cols-1">
        <div className="grid md:grid-cols-2 gap-6">
            <RevenueChart></RevenueChart>
            <RevenueChart></RevenueChart>
        </div>
    </div>
  );
}

export default ChartSection;
