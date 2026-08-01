import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingParticles } from './components/FloatingParticles';
import { EnvelopeSection } from './components/EnvelopeSection';
import { TimeCounter } from './components/TimeCounter';
import { WhatsAppChat } from './components/WhatsAppChat';
import { PhotoGallery } from './components/PhotoGallery';
import { VirtualFlowers } from './components/VirtualFlowers';
import { soundFx } from './utils/audio';
import { Heart, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<'envelope' | 'main'>('envelope');
  // step index: 0 = Time Counter, 1 = WhatsApp Chat, 2 = Photo Gallery, 3 = Virtual Flowers
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleToggleMusic = () => {
    const isPlaying = soundFx.toggleBackgroundMusic();
    setIsMusicPlaying(isPlaying);
  };

  const handleRestart = () => {
    soundFx.playPop();
    setStage('envelope');
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 text-gray-800 font-sans relative overflow-x-hidden selection:bg-pink-200">
      {/* Floating Background Particles */}
      <FloatingParticles />

      {/* Discrete Floating Music Toggle Button (Top Right, No Header Bar) */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleToggleMusic}
          id="floating-music-toggle-btn"
          className="px-3.5 py-2 bg-white/90 hover:bg-white text-pink-600 rounded-full border border-pink-200 text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm"
        >
          {isMusicPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-pink-500 animate-pulse" />
              <span>Musik On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-gray-400" />
              <span>Musik Off</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'envelope' ? (
          /* STAGE 1: ENVELOPE & LETTER OPENING */
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <EnvelopeSection
              onComplete={() => {
                setStage('main');
                setCurrentStep(0);
              }}
              isMusicPlaying={isMusicPlaying}
              onToggleMusic={handleToggleMusic}
            />
          </motion.div>
        ) : (
          /* STAGE 2: SEQUENTIAL 1-BY-1 FLOW (NO TOP BAR) */
          <motion.div
            key="main-stage"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen py-8 px-4 relative z-10 flex flex-col justify-between"
          >
            <main className="max-w-4xl mx-auto w-full my-auto">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step-time"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TimeCounter
                      onNextStep={() => setCurrentStep(1)}
                      onPrevStep={() => handleRestart()}
                    />
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step-chat"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WhatsAppChat
                      onNextStep={() => setCurrentStep(2)}
                      onPrevStep={() => setCurrentStep(0)}
                    />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step-photos"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PhotoGallery
                      onNextStep={() => setCurrentStep(3)}
                      onPrevStep={() => setCurrentStep(1)}
                    />
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step-flowers"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VirtualFlowers
                      onPrevStep={() => setCurrentStep(2)}
                      onRestart={() => handleRestart()}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Minimalist Footer */}
            <footer className="text-center text-xs text-pink-500/80 pt-8 pb-4">
              <p className="font-semibold inline-flex items-center gap-1 bg-white/60 px-4 py-1.5 rounded-full border border-pink-200/60 shadow-2xs backdrop-blur-xs">
                <span>Khusus untuk Acaa</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                <span>• Sejak 8 Agustus 2024 (23:38)</span>
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
