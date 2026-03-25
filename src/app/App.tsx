import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Star, Users, TrendingUp, Zap, Award, BookOpen, Video, Target, DollarSign, Rocket, Instagram, Twitter, Youtube, HelpCircle } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { ThreeBackground } from "./components/ThreeBackground";
import { CustomCursor } from "./components/CustomCursor";
import { LoadingScreen } from "./components/LoadingScreen";
import Lenis from "lenis";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (loadProgress >= 100) {
      const timer = setTimeout(() => setIsLoaded(true), 500);
      return () => clearTimeout(timer);
    }
  }, [loadProgress]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // easeOutQuart
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Expose lenis on window so Navbar clicks can use it
    (window as any).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const lenis = (window as any).__lenis;
    const element = document.getElementById(sectionId);
    if (!element) return;
    if (lenis) {
      lenis.scrollTo(element, { offset: -73, duration: 1.8 });
    } else {
      const top = element.getBoundingClientRect().top + window.scrollY - 73;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const phases = [
    {
      number: "01",
      title: "Strategic Clarity",
      duration: "Weeks 1-3",
      items: [
        "Understanding the Attention Economy",
        "Choosing a Niche",
        "Identifying the Audience",
        "Building a Personal Identity"
      ],
      output: "Brand Message + Niche",
      color: "#6656DD"
    },
    {
      number: "02",
      title: "Content System Design",
      duration: "Weeks 4-6",
      items: [
        "Content Strategy",
        "Content Pillars",
        "Idea Bank",
        "Learning Storytelling"
      ],
      output: "50 Ideas + 10 Scripts",
      color: "#3B82F6"
    },
    {
      number: "03",
      title: "Publishing Begins",
      duration: "Weeks 7-10",
      items: [
        "Video Shooting",
        "Editing Basics",
        "Publishing Short Content",
        "Learning from Results"
      ],
      output: "First 10-30 Videos",
      color: "#10B981"
    },
    {
      number: "04",
      title: "Growth Improvement",
      duration: "Ongoing",
      items: [
        "Performance Analysis",
        "Hook Improvement",
        "Packaging Improvement",
        "Building a Posting Habit"
      ],
      output: "50+ Videos + Steady Growth",
      color: "#F97316"
    },
    {
      number: "05",
      title: "Turning Content into Income",
      duration: "Advanced",
      items: [
        "Affiliate Marketing",
        "Sponsorships",
        "Digital Products",
        "Services"
      ],
      output: "First Source of Income",
      color: "#EAB308"
    },
    {
      number: "06",
      title: "Expansion",
      duration: "Mastery",
      items: [
        "Content Recycling",
        "Team Building",
        "Platform Expansion",
        "Content Project Development"
      ],
      output: "Creator Business",
      color: "#6366F1"
    }
  ];

  const features = [
    { icon: BookOpen, title: "Strategy Manual", desc: "Complete roadmap from zero to creator business" },
    { icon: Video, title: "Hook Library", desc: "Proven hooks that capture attention" },
    { icon: Target, title: "Script Templates", desc: "Ready-to-use content frameworks" },
    { icon: Award, title: "Expert Frameworks", desc: "Techniques from MrBeast, Ali Abdaal, Alex Hormozi & More" },
    { icon: Zap, title: "Content Planner", desc: "publishing system" },
    { icon: HelpCircle, title: "Interactive Quizzes", desc: "Test your knowledge and track your progress" }
  ];

  const stats = [
    { value: "6", label: "Transformation Phases" },
    { value: "50+", label: "Video Framework" },
    { value: "$300-1K", label: "Value Delivered" },
    { value: "100%", label: "Actionable Content" }
  ];

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <LoadingScreen progress={loadProgress} isFinished={isLoaded} />
        )}
      </AnimatePresence>

      <CustomCursor />
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="min-h-screen bg-white text-gray-900 overflow-x-hidden scroll-smooth md:cursor-none selection:bg-[#6656DD]/20"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <ThreeBackground onProgress={setLoadProgress} />
        <Navbar onNavClick={scrollToSection} />

        {/* Hero Section */}
        <motion.section
          id="hero"
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6656DD]/10 via-white to-[#6656DD]/5" />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundImage: "radial-gradient(circle at center, rgba(102, 86, 221, 0.12) 0%, transparent 60%)",
              backgroundSize: "200% 200%"
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6 px-4 py-2 bg-[#6656DD]/10 border border-[#6656DD]/25 rounded-full"
              >
                <span className="text-[#6656DD] font-medium">Stop overthinking - Start posting - Get paid</span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 text-gray-900"
            >
              Make Content That
              <br />
              <span className="text-[#6656DD]">
                Gets You Paid
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto"
            >
              Build your brand, post with confidence, and land your first income online
              with a clear system that makes you visible and in control.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('pricing')}
                className="group px-8 py-4 bg-[#6656DD] text-white rounded-full font-semibold text-lg flex items-center gap-2 shadow-lg shadow-[#6656DD]/30 hover:shadow-[#6656DD]/50 transition-shadow"
              >
                Start Your Journey
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('curriculum')}
                className="px-8 py-4 border border-gray-300 rounded-full font-semibold text-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View Curriculum
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#6656DD]">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Problem Section */}
        <motion.section
          id="problem"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="min-h-screen py-32 px-6 relative flex items-center bg-gray-50"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#6656DD]/5 to-white" />
          <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Stop Guessing. Start <span className="text-[#6656DD]">Building</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              Most aspiring creators fail because they lack a proven system. They post randomly,
              burn out quickly, and never see results. This program gives you the exact framework
              to build a sustainable creator business—from your first video to your first dollar.
            </motion.p>
          </div>
        </motion.section>

        {/* Curriculum Phases */}
        <section id="curriculum" className="min-h-screen py-32 px-6 relative bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Your <span className="text-[#6656DD]">Transformation</span> Roadmap
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Six carefully designed phases that take you from zero to creator business
              </p>
            </motion.div>

            <div className="space-y-12">
              {phases.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-white border border-gray-200 rounded-3xl p-8 md:p-12 hover:border-[#6656DD]/30 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden">
                    {/* Color overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: phase.color }} />

                    <div className="relative z-10 grid md:grid-cols-[200px_1fr] gap-8">
                      {/* Phase Number & Duration */}
                      <div>
                        <motion.div
                          initial={{ scale: 0.8 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-8xl font-bold bg-clip-text text-transparent mb-4"
                          style={{ backgroundImage: `linear-gradient(to bottom, ${phase.color}, ${phase.color})` }}
                        >
                          {phase.number}
                        </motion.div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">{phase.duration}</div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">{phase.title}</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          {phase.items.map((item, itemIndex) => (
                            <motion.div
                              key={itemIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.3 + itemIndex * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: phase.color }} />
                              <span className="text-gray-600">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="inline-block px-6 py-3 text-white rounded-full font-semibold text-sm"
                          style={{ backgroundColor: phase.color }}
                        >
                          ✨ Outcome: {phase.output}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section id="features" className="min-h-screen py-32 px-6 relative flex items-center bg-gray-50">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-[#6656DD]/5 to-gray-50" />
          <div className="max-w-7xl mx-auto relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Everything You Need to <span className="text-[#6656DD]">Succeed</span>
              </h2>
              <p className="text-xl text-gray-500">Not just theory. Real tools and frameworks you can use immediately.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#6656DD]/40 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[#6656DD] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section id="proof" className="min-h-screen py-32 px-6 flex items-center bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Built on <span className="text-[#6656DD]">Proven</span> Frameworks
              </h2>
              <p className="text-xl text-gray-500">Learn from the best in the creator economy</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: "MrBeast", expertise: "Viral Content Strategy", image: "/src/creators/MrBeast.jpg" },
                { name: "Ali Abdaal", expertise: "Productivity & Systems", image: "/src/creators/Ali Abdaal.jpg" },
                { name: "Alex Hormozi", expertise: "Business & Monetization", image: "/src/creators/Alex Hormozi.jpg" },
                { name: "Jenny Hoyos", expertise: "Short-Form Content", image: "/src/creators/Jenny Hoyos.jpg" }
              ].map((creator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl p-8 flex items-center gap-6 shadow-sm group hover:border-[#6656DD]/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#6656DD]/10 group-hover:border-[#6656DD]/50 transition-colors">
                    <img
                      src={creator.image}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-2xl mb-1">{creator.name}</div>
                    <div className="text-gray-500">{creator.expertise}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="min-h-screen py-32 px-6 relative flex items-center bg-gray-50">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-[#6656DD]/8 to-gray-50" />
          <div className="max-w-4xl mx-auto relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-white border border-[#6656DD]/20 rounded-3xl p-12 md:p-16 shadow-xl shadow-[#6656DD]/10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-block px-4 py-2 bg-[#6656DD] text-white rounded-full text-sm font-semibold mb-6">
                    🔥 Limited Time Offer
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-6xl font-bold mb-6"
                >
                  Invest in Your <span className="text-[#6656DD]">Future</span>
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="text-gray-400 line-through text-2xl mb-2">$400</div>
                  <div className="text-7xl font-bold text-gray-900 mb-4">
                    $250
                  </div>
                  <div className="text-gray-500">One-time payment. Lifetime access.</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-4 mb-10"
                >
                  {[
                    "Complete 6-Phase Curriculum",
                    "Hook Library & Script Templates",
                    "Content Planner & Strategy Tools",
                    "Expert Frameworks",
                    "Interactive Quizzes"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-center gap-3 text-lg">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://whop.com/make-content-that-gets-you-paid/content-that-pays/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full md:w-auto px-12 py-5 bg-[#6656DD] text-white rounded-full font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-[#6656DD]/30 hover:shadow-[#6656DD]/50 transition-shadow mx-auto"
                >
                  <Rocket className="w-6 h-6" />
                  Enroll Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.a>

              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 relative overflow-hidden bg-[#6656DD]">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#6656DD] to-[#4a3fc7]"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
            >
              Your Creator Journey <br />
              <span className="text-white/80">
                Starts Today
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl text-white/80 mb-12"
            >
              Join thousands of creators who transformed their passion into a business
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://whop.com/make-content-that-gets-you-paid/content-that-pays/"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-12 py-5 bg-white text-[#6656DD] rounded-full font-bold text-xl flex items-center gap-3 mx-auto shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow"
            >
              Get Instant Access
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p>&copy; 2026 Creator Economy Curriculum. All rights reserved.</p>
          </div>
        </footer>
      </motion.div>
    </>
  );
}
