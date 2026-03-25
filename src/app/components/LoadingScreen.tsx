import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  progress: number;
  isFinished: boolean;
}

export function LoadingScreen({ progress, isFinished }: LoadingScreenProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFinished]);

  if (!shouldRender) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
    >
      <div className="relative w-64 h-1 bg-gray-100 rounded-full overflow-hidden mb-8">
        <motion.div
          className="absolute inset-0 bg-[#6656DD]"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-xl font-bold text-[#6656DD] mb-2">Creator Economy</div>
        <div className="text-sm text-gray-400 font-medium tracking-widest uppercase">
          {Math.round(progress)}% Loaded
        </div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6656DD]/5 rounded-full blur-[100px]" />
      </div>
    </motion.div>
  );
}
