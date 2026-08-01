import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'heart' | 'star' | 'petal' | 'sparkle';
  duration: number;
  delay: number;
  color: string;
}

export const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const items: Particle[] = [];
    const types: Particle['type'][] = ['heart', 'star', 'petal', 'sparkle'];
    const colors = ['#f472b6', '#fb7185', '#ec4899', '#f43f5e', '#a855f7', '#fbbf24', '#fbcfe8'];

    for (let i = 0; i < 24; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 16 + 12,
        type: types[Math.floor(Math.random() * types.length)],
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(items);
  }, []);

  const renderSymbol = (type: Particle['type']) => {
    switch (type) {
      case 'heart':
        return '💖';
      case 'star':
        return '✨';
      case 'petal':
        return '🌸';
      case 'sparkle':
        return '⭐';
      default:
        return '💕';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute opacity-60 filter drop-shadow-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
          }}
          animate={{
            y: ['0%', '-120%'],
            x: ['0%', Math.sin(p.id) * 30 + '%'],
            rotate: [0, 360],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {renderSymbol(p.type)}
        </motion.div>
      ))}
    </div>
  );
};
