import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
}

export function Navbar({ onNavClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "problem", label: "Problem" },
    { id: "curriculum", label: "Curriculum" },
    { id: "features", label: "Features" },
    { id: "proof", label: "Proof" },
    { id: "pricing", label: "Pricing" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "problem", "curriculum", "features", "proof", "pricing"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    onNavClick(sectionId);
  };

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter: backdropBlur }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-[#6656DD]"
          >
            RiseInDigital
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-8"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative text-sm font-medium transition-colors ${activeSection === item.id ? "text-[#6656DD]" : "text-gray-500 hover:text-gray-900"
                  }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6656DD]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://whop.com/make-content-that-gets-you-paid/content-that-pays/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-[#6656DD] text-white rounded-full font-semibold text-sm shadow-lg shadow-[#6656DD]/30 hover:shadow-[#6656DD]/50 transition-shadow"
            >
              Enroll Now
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 bottom-0 w-full md:hidden z-40 bg-white/95 backdrop-blur-xl border-l border-gray-200"
      >
        <div className="p-6 space-y-4" style={{ paddingTop: 'calc(80px + env(safe-area-inset-top))' }}>
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              whileHover={{ x: 10 }}
              className={`block w-full text-left py-3 px-4 rounded-lg transition-colors ${activeSection === item.id
                ? "bg-[#6656DD]/10 text-[#6656DD] border border-[#6656DD]/20"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              {item.label}
            </motion.button>
          ))}
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://whop.com/make-content-that-gets-you-paid/content-that-pays/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 bg-[#6656DD] text-white rounded-full font-semibold shadow-lg shadow-[#6656DD]/30 mt-6 text-center block"
          >
            Enroll Now
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
