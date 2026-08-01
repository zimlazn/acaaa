import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { Heart, Sparkles, Send, Mail, ArrowRight, HeartHandshake } from 'lucide-react';

interface EnvelopeSectionProps {
  onComplete: () => void;
}

export const EnvelopeSection: React.FC<EnvelopeSectionProps> = ({
  onComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    soundFx.playPop();
    soundFx.playSparkleChime();
    setIsOpen(true);

    // Heart and petal confetti burst
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#fda4af', '#f43f5e', '#ec4899', '#fff'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 select-none">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* JUMPING ENVELOPE STAGE */
          <motion.div
            key="envelope-closed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center justify-center max-w-md w-full"
          >
            {/* Cute speech bubble */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/95 text-pink-600 px-5 py-3 rounded-2xl shadow-xl border-2 border-pink-200 mb-6 relative text-center"
            >
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Ada surat spesial buat Acaa! 💌</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce" />
              </div>
              <p className="text-xs text-pink-400 mt-1 font-medium">
                Ketuk suratnya untuk membuka yaa ✨
              </p>
              {/* Triangle pointer */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white"></div>
            </motion.div>

            {/* Jumping Envelope Wrapper */}
            <motion.div
              id="jumping-envelope-card"
              onClick={handleOpenEnvelope}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={{
                y: [0, -18, 0],
                rotate: [0, -2, 2, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-80 sm:w-96 h-56 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300 rounded-2xl shadow-2xl p-4 cursor-pointer border-4 border-white flex flex-col justify-between overflow-hidden group"
            >
              {/* Envelope Texture/Flap Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#f472b6_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

              {/* Envelope Flap visual */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-rose-200 to-pink-100 [clip-path:polygon(0_0,100%_0,50%_100%)] border-b-2 border-pink-300 shadow-sm transition-transform duration-300 group-hover:-translate-y-1"></div>

              {/* Stamp on top right */}
              <div className="absolute top-4 right-4 bg-white p-1.5 rounded-lg shadow-md border border-pink-300 transform rotate-6 flex flex-col items-center">
                <div className="text-[10px] font-bold text-pink-500 tracking-wider">ACAA</div>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mt-0.5" />
                <div className="text-[8px] text-pink-400">08.08.24</div>
              </div>

              {/* Heart Seal in Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
                  className="w-14 h-14 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-white"
                >
                  <Heart className="w-7 h-7 fill-white text-white" />
                </motion.div>
              </div>

              {/* Front Label */}
              <div className="mt-auto relative z-10 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-pink-200 text-center">
                <span className="text-lg font-bold text-pink-700 tracking-wide font-serif">
                  Untuk Acaa 🌸
                </span>
              </div>
            </motion.div>

            <p className="text-xs text-pink-500/80 mt-6 font-medium animate-pulse">
              ✨ Dikirim khusus untuk Girlfriend Day ✨
            </p>
          </motion.div>
        ) : (
          /* LETTER OUT ANIMATION & CONTENT */
          <motion.div
            key="letter-opened"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="max-w-xl w-full my-6"
          >
            {/* Paper Container */}
            <div className="bg-[#fffdfa] rounded-3xl shadow-2xl p-6 sm:p-10 border-4 border-pink-200 relative overflow-hidden">
              {/* Subtle grid line paper texture */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#fce7f3_1px,transparent_1px),linear-gradient(to_bottom,#fce7f3_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

              {/* Header Stamp & Hearts */}
              <div className="relative z-10 flex items-center justify-between border-b-2 border-pink-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-6 h-6 text-rose-500" />
                  <div>
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-widest block">
                      Spesial Girlfriend Day
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-pink-700 font-serif">
                      Surat Cinta Untuk Acaa 💌
                    </h2>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-pink-400 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200">
                    08.08.2024 ✨
                  </span>
                </div>
              </div>

              {/* Letter Content */}
              <div className="relative z-10 text-gray-700 space-y-4 text-sm sm:text-base leading-relaxed font-sans">
                <p className="font-semibold text-pink-600 text-base sm:text-lg">
                  Halo Acaa Sayang, 🌸
                </p>

                <p>
                  Selamat Hari Girlfriend Day untuk perempuan terpaling manis, terlucu, dan paling berharga di hidup aku!
                </p>

                <p>
                  Terima kasih yaa sudah hadir dan mewarnai hari-hariku dengan tawa, kehangatan, dan senyuman kamu yang selalu bisa bikin suasana jadi adem. Sejak pertama kali kita melangkah bersama, setiap detik rasa-rasanya selalu punya cerita manis tersendiri.
                </p>

                <p>
                  Kamu itu bukan cuma pacar buat aku, tapi juga rumah, tempat pulang paling nyaman, dan sahabat terbaik yang selalu bikin hari-hari terasa jauh lebih indah. Aku bersyukur banget bisa punya Acaa! 💕
                </p>

                <div className="p-4 bg-pink-50/80 rounded-2xl border border-pink-200 text-pink-800 text-sm italic shadow-inner">
                  &ldquo;Terima kasih sudah selalu sabar, penyayang, dan menjadi versi terbaik dari diri kamu. I love you so much, Acaa! Today and always.&rdquo; 💖✨
                </div>

                <div className="pt-2 text-right">
                  <span className="block text-xs text-pink-400 font-medium">Dari yang selalu menyayangimu,</span>
                  <span className="font-serif font-bold text-lg text-pink-700 mt-1 block">
                    Untuk Acaa 💌
                  </span>
                </div>
              </div>

              {/* Decorative Flower Petals */}
              <div className="absolute bottom-3 left-4 text-xl opacity-80 pointer-events-none">
                🌸 💖 🌷
              </div>

              {/* NEXT BUTTON: "Sudah selesai membaca? Lanjut yuk." */}
              <div className="relative z-10 mt-8 pt-6 border-t-2 border-pink-100 flex flex-col items-center">
                <motion.button
                  id="continue-to-main-btn"
                  onClick={() => {
                    soundFx.playPop();
                    onComplete();
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-pink-300/50 transition-all flex items-center justify-center gap-3 cursor-pointer text-sm sm:text-base border border-pink-300"
                >
                  <span>Sudah selesai membaca? Lanjut yuk!</span>
                  <ArrowRight className="w-5 h-5 text-white animate-pulse" />
                </motion.button>
                <p className="text-[11px] text-pink-400 mt-2 font-medium">
                  Masih banyak kejutan manis menantimu di dalam ✨
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
