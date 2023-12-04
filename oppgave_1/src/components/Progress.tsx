
type ProgressProps = {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  totalTasks: number;
  showNext: boolean; 
};
export default function Progress({ currentIndex, setCurrentIndex, totalTasks, showNext }: ProgressProps) {
  const next = () => {
    if (currentIndex < totalTasks - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <footer className="flex flex-col items-end space-y-2 mt-4">
      <div>
        {showNext && (
          <button
            onClick={next}
            disabled={currentIndex === totalTasks - 1}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Neste
          </button>
        )}
      </div>
      <button
        onClick={prev}
        disabled={currentIndex === 0}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Forrige
      </button>
    </footer>
  );
}
