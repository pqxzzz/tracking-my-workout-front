export const StreakCheck = ({ isCheck }: { isCheck: boolean }) => {
  return (
    <div className="w-6 h-6 rounded-full border flex items-center justify-center">
      {isCheck && <div className="bg-zinc-400 w-4 h-4 rounded-full"></div>}
    </div>
  );
};
