export function StreakDays() {
  return (
    <>
      <h1>Week streak!</h1>
      <div className="flex justify-center items-center gap-5 bg-gray-800 p-5">
        <div className="w-5 h-5 rounded-sm border border-white bg-orange-600"></div>
        <div className="w-5 h-5 rounded-sm border border-white bg-orange-600"></div>
        <div className="w-5 h-5 rounded-sm border border-white"></div>
        <div className="w-5 h-5 rounded-sm border border-white"></div>
        <div className="w-5 h-5 rounded-sm border border-white bg-orange-600"></div>
        <div className="w-5 h-5 rounded-sm border border-white"></div>
        <div className="w-5 h-5 rounded-sm border border-white"></div>
      </div>
    </>
  );
}
