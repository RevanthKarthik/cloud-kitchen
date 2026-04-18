export default function OrderTracker({ status }) {
  const steps = ["pending", "preparing", "out", "delivered"];

  return (
    <div className="flex gap-4 mt-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-6 h-6 rounded-full ${
              steps.indexOf(status) >= index
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          />
          <p className="text-xs text-white">{step}</p>
        </div>
      ))}
    </div>
  );
}