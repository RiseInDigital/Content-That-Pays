import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: 0
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
              parallax: {
                enable: true,
                force: 40,
                smooth: 10,
              },
            },
          },
          modes: {
            repulse: {
              distance: 120,
              duration: 2,
              factor: 1,
            },
          },
        },
        particles: {
          color: {
            value: ["#6656DD", "#9b8bf4", "#c8c2f8"],
          },
          links: {
            enable: false,
          },
          collisions: {
            enable: true,
            mode: "bounce",
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 60,
          },
          opacity: {
            value: { min: 0.2, max: 0.6 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
            animation: {
              enable: true,
              speed: 1.5,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
