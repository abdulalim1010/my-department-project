export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-600">
        Access Denied 🚫
      </h1>
      <p className="text-gray-600 mt-3">
        You do not have admin permission.
      </p>
    </div>
  );
}
