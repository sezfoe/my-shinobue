import React from "react";
import { motion } from "motion/react";

interface HomeViewProps {
  scoreList: string[];
  onSelect: (scoreKey: string) => void;
  onGoToBlank: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ scoreList, onSelect }) => {
  return (
    <div 
      id="home-view-container"
      className="min-h-screen bg-[#f5f5f0] pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] flex flex-col gap-6 items-center justify-center"
    >
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {scoreList.map((scoreName) => (
          <motion.button
            key={scoreName}
            id={`score-btn-${scoreName}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(scoreName)}
            className="px-6 py-4 bg-white text-black border border-stone-300 rounded-xl shadow-sm hover:bg-stone-50 transition-all text-base font-medium tracking-widest uppercase text-center"
          >
            {scoreName}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default HomeView;

