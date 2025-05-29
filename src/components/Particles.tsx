import React, { useEffect } from 'react';
import { tsParticles } from 'tsparticles-engine';

const Particles: React.FC = () => {
  useEffect(() => {
    const loadParticles = async () => {
      try {
        const { loadSlim } = await import('tsparticles-slim');
        await loadSlim(tsParticles);
        await tsParticles.load('particles-js', {
          fpsLimit: 60,
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: '#3366ff',
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: 0.5,
              random: false,
            },
            size: {
              value: 3,
              random: true,
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#3366ff',
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'grab',
              },
              onclick: {
                enable: true,
                mode: 'push',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1,
                },
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          retina_detect: true,
        });
      } catch (error) {
        console.error('Failed to load particles', error);
      }
    };

    loadParticles();
  }, []);

  return <div id="particles-js" className="fixed inset-0 z-0" />;
};

export default Particles;
