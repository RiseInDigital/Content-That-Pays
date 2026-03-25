import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Snappier and slightly "faster" spring configuration
  const springConfig = { damping: 22, stiffness: 280, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, isTouchDevice]);
  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] w-12 h-12"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <div
        className="w-full h-full relative"
        style={{ 
          transform: 'translate(-20%, -20%)',
          scale: isClicked ? 0.9 : 1,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img
          src={isClicked ? "/src/Cursor/click.png" : "/src/Cursor/pointing.png"}
          alt="Custom Cursor"
          className="w-full h-full object-contain filter drop-shadow-lg"
          onLoad={() => console.log("Cursor image loaded successfully")}
          onError={(e) => {
            console.error("Cursor image failed to load, path: " + (isClicked ? "/src/Cursor/click.png" : "/src/Cursor/pointing.png"));
            (e.target as any).style.display = 'none';
          }}
        />
      </div>
    </motion.div>
  );
}
