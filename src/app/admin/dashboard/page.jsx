export default function AdminDashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Total Users</h2>
        <p className="text-3xl mt-2 font-bold text-blue-600">120</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Articles</h2>
        <p className="text-3xl mt-2 font-bold text-green-600">45</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Pending</h2>
        <p className="text-3xl mt-2 font-bold text-red-600">6</p>
      </div>
    </div>
  );
}
