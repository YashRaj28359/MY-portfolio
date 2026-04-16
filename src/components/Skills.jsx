import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';

const allSkills = [
  { name: 'React', type: 'light' },
  { name: 'Tailwind CSS', type: 'light' },
  { name: 'Framer Motion', type: 'dark' },
  { name: 'Node.js', type: 'dark' },
  { name: 'Express', type: 'dark' },
  { name: 'MongoDB', type: 'dark' },
  { name: 'Figma', type: 'light' },
  { name: 'Git', type: 'light' },
  { name: 'Photo Editing', type: 'dark' },
  { name: 'Video Editing', type: 'light' },
  { name: 'Marketing Design', type: 'dark' },
  { name: 'C++', type: 'dark' }
];

const Skills = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const [bodies, setBodies] = useState([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    
    // Normal gravity setup so they fall like gumballs
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 1.5; // Slight heavier gravity to settle faster

    // Fallback to window dimensions if clientWidth is 0 during early mount cycle
    let width = sceneRef.current.clientWidth;
    if (width === 0) width = sceneRef.current.parentElement ? sceneRef.current.parentElement.clientWidth : window.innerWidth;
    const height = sceneRef.current.clientHeight || (window.innerWidth < 768 ? 500 : 600);

    // Create skill bodies
    const radius = window.innerWidth < 640 ? 40 : 56;
    const skillBodies = allSkills.map((skill, index) => {
      // Spawn them already placed low inside the bowl in a rough grid so they don't fall from far up
      // and they don't explode from initial overlap
      const cols = window.innerWidth < 640 ? 4 : 5;
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      const startX = width / 2 - ((cols * radius) * 0.8) + (col * radius * 1.8);
      const startY = height - 200 - (row * radius * 1.8); // Stack them near the bottom
      
      const body = Bodies.circle(startX, startY, radius, {
        restitution: 0.2,     // Lower bounce so they settle smoothly
        friction: 0.3,
        density: 0.05,
        sleepThreshold: 15,
        label: skill.name,
      });

      return { body, skill, id: `skill-${index}` };
    });

    setBodies(skillBodies);

    // Walls (including angled walls at the bottom to create a "bowl" funnel)
    const wallOptions = { isStatic: true, restitution: 0.2, render: { visible: false } };
    const walls = [
      Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions), // Bottom floor
      Bodies.rectangle(-50, height / 2, 100, height * 3, wallOptions), // Left wall
      Bodies.rectangle(width + 50, height / 2, 100, height * 3, wallOptions), // Right wall
      
      // Angled blocks to form a bowl / funnel at the bottom corners
      Bodies.rectangle(30, height, Math.max(300, width * 0.4), 100, { ...wallOptions, angle: Math.PI / 5 }),
      Bodies.rectangle(width - 30, height, Math.max(300, width * 0.4), 100, { ...wallOptions, angle: -Math.PI / 5 })
    ];

    World.add(engine.world, [...skillBodies.map(sb => sb.body), ...walls]);

    // Add mouse control allowing manual interaction only
    const mouse = Mouse.create(sceneRef.current);
    
    // Prevent Matter.js from aggressively blocking the page scroll
    mouse.element.removeEventListener("wheel", mouse.mousewheel); // Required for modern Chrome/Edge/Firefox
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    // touchmove listener NOT removed to allow native mobile dragging

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    World.add(engine.world, mouseConstraint);

    // Create a headless runner 
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Synchronize DOM elements manually via requestAnimationFrame
    let animationFrame;
    const syncDOM = () => {
      skillBodies.forEach((item) => {
        const domElement = document.getElementById(item.id);
        if (domElement) {
          const { x, y } = item.body.position;
          const angle = item.body.angle;
          domElement.style.transform = `translate(${x - radius}px, ${y - radius}px) rotate(${angle}rad)`;
        }
      });
      animationFrame = requestAnimationFrame(syncDOM);
    };

    syncDOM();

    return () => {
      cancelAnimationFrame(animationFrame);
      Render.stop(engine);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(engine.world);
    };
  }, []);

  return (
    <section id="skills" className="py-24 bg-dark-bg relative border-b border-border-subtle overflow-hidden">
      {/* Ambient Background Glow (Middle Right) */}
      <div className="absolute top-1/2 right-0 w-[60vw] h-[60vh] bg-gray-500/30 rounded-full blur-[140px] pointer-events-none translate-x-1/4 -translate-y-1/2 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 items-center relative z-10">
        
        <div className="md:w-1/3 relative z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-[f6] mb-6 text-white">Expertise.</h2>
            <p className="text-gray-400 font-[f3] leading-relaxed mb-8">
              I specialize in full-stack web development with a strong emphasis on frontend aesthetics and performance. 
              <br/><br/>
              <span className="text-gray-200 uppercase tracking-widest text-xs border border-gray-600 px-3 py-1 rounded-full">Skill Bowl</span>
            </p>
          </motion.div>
        </div>

        {/* Matter.js zero gravity container */}
        <div
          className="md:w-2/3 w-full h-[500px] md:h-[600px] border border-border-subtle rounded-t-3xl rounded-b-[6rem] bg-black/30 shadow-inner overflow-hidden relative select-none touch-none"
          ref={sceneRef}
        >
          {bodies.map(({ skill, id }) => {
            const isLight = skill.type === 'light';
            
            const ballStyle = isLight
              ? {
                  background: 'radial-gradient(circle at 30% 30%, #ffffff, #d4d4d4, #737373)',
                  boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.3), 5px 5px 15px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.8)',
                  color: '#000'
                }
              : {
                  background: 'radial-gradient(circle at 30% 30%, #3a3a3a, #151515, #000000)',
                  boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.9), 5px 5px 15px rgba(0,0,0,0.5)',
                  color: '#fff'
                };

            return (
              <div
                key={id}
                id={id}
                className="absolute top-0 left-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-center p-3 font-[f1] text-[10px] sm:text-xs z-10 shrink-0 tracking-widest uppercase border border-white/10 opacity-0 animate-fade-in"
                style={{ ...ballStyle, animationDelay: `${Math.random() * 0.5}s`, animationFillMode: 'forwards' }}
              >
                <span className="select-none pointer-events-none drop-shadow-md font-semibold">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
