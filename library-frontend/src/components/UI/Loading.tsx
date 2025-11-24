export default function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
        <span className="text-gray-700 font-medium">Loading...</span>
      </div>
    </div>
  );
}
