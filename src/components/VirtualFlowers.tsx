import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/audio';
import { Sparkles, Droplets, Heart, Gift, ArrowLeft, RefreshCw, RotateCw, CheckCircle2, Key } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VirtualFlowersProps {
  onPrevStep: () => void;
  onRestart: () => void;
}

const PROMISES = [
  'Janji selalu dengerin cerita Acaa tanpa bosan 🎧',
  'Janji bakal selalu ada kapanpun Acaa butuh sandaran 🫂',
  'Janji terus melukis kenangan indah lainnya sama Acaa ✨',
  'Janji selalu bikin Acaa merasa dicintai setiap hari 💖',
];

export const VirtualFlowers: React.FC<VirtualFlowersProps> = ({ onPrevStep, onRestart }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [waterCount, setWaterCount] = useState(0);
  const [loveCount, setLoveCount] = useState(0);
  const [isWatering, setIsWatering] = useState(false);
  const [checkedPromises, setCheckedPromises] = useState<number[]>([0, 1, 2, 3]);

  const handleFlipCard = () => {
    soundFx.playSparkleChime();
    const newFlipState = !isFlipped;
    setIsFlipped(newFlipState);

    if (newFlipState) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#fb7185', '#a855f7', '#fbbf24', '#f43f5e', '#fff'],
        shapes: ['circle', 'star'],
        scalar: 1.2,
      });
    }
  };

  const handleWaterFlowers = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playSparkleChime();
    setIsWatering(true);
    setWaterCount((prev) => prev + 1);
    setTimeout(() => setIsWatering(false), 1200);
  };

  const handleSendLove = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playPop();
    setLoveCount((prev) => prev + 1);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#fda4af', '#f43f5e'],
      shapes: ['circle'],
      scalar: 1,
    });
  };

  const togglePromise = (index: number) => {
    soundFx.playPop();
    if (checkedPromises.includes(index)) {
      setCheckedPromises(checkedPromises.filter((i) => i !== index));
    } else {
      setCheckedPromises([...checkedPromises, index]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto py-4 sm:py-6 space-y-5">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-pink-500">
        <span className="bg-pink-100/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-pink-200 shadow-2xs">
          Langkah 4 dari 4: Bunga Virtual 💐
        </span>
      </div>

      {/* Main Banner Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="text-center space-y-1.5"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md animate-pulse">
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>This is for you, Acaa! 💐✨</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-serif pt-1">
          Buket Bunga Spesial 🌸💖
        </h2>
        <p className="text-xs sm:text-sm text-pink-500 max-w-xs mx-auto font-medium">
          Sentuh / klik bunganya untuk membalik dan membaca pesan rahasia!
        </p>
      </motion.div>

      {/* 3D FLIPPING CONTAINER - NO OUTER FRAME */}
      <div className="perspective-1000 w-full min-h-[420px] sm:min-h-[460px] flex items-center justify-center relative my-2">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-sm h-full flex items-center justify-center"
        >
          {/* FRONT SIDE: FRAMELESS FLOATING BOUQUET */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="w-full flex flex-col items-center justify-center text-center space-y-4"
          >
            {/* Direct Floating Bouquet Image */}
            <motion.div
              onClick={handleFlipCard}
              whileHover={{ scale: 1.03 }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.2 },
              }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 cursor-pointer group rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-pink-300/60"
            >
              <img
                src="/src/assets/images/acaa_virtual_bouquet_1785568610937.jpg"
                alt="Buket Bunga Untuk Acaa"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isWatering ? 'scale-105 filter brightness-110' : ''
                }`}
              />

              {/* Floating Flip Hint Tag */}
              <div className="absolute top-3 right-3 bg-white/90 text-pink-700 px-3 py-1 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1.5 backdrop-blur-md border border-pink-200">
                <RotateCw className="w-3.5 h-3.5 text-pink-500 animate-spin" />
                <span>Balik Bunga 🔄</span>
              </div>

              {/* Watering Animation Overlay */}
              <AnimatePresence>
                {isWatering && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 10 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-sky-400/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none rounded-3xl"
                  >
                    <div className="text-4xl animate-bounce">💧 ✨ 💧</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Love Counter Badge */}
              {loveCount > 0 && (
                <div className="absolute top-3 left-3 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>+{loveCount} Love</span>
                </div>
              )}

              {/* Subtle bottom label on image */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 text-white px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm pointer-events-none whitespace-nowrap">
                Klik untuk pesan rahasia 💌
              </div>
            </motion.div>

            {/* Quick Action Buttons Below Bouquet */}
            <div className="flex items-center gap-2.5 w-full max-w-xs pt-1">
              <button
                onClick={handleWaterFlowers}
                className="flex-1 py-2 bg-white/90 hover:bg-white text-sky-700 font-bold rounded-xl border border-sky-200 text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs backdrop-blur-xs"
              >
                <Droplets className="w-3.5 h-3.5 text-sky-500" />
                <span>Siram 💧 ({waterCount})</span>
              </button>
              <button
                onClick={handleSendLove}
                className="flex-1 py-2 bg-white/90 hover:bg-white text-rose-700 font-bold rounded-xl border border-rose-200 text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs backdrop-blur-xs"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Cinta 💖 ({loveCount})</span>
              </button>
            </div>

            {/* Flip Button */}
            <button
              id="flip-bouquet-btn"
              onClick={handleFlipCard}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm border border-white"
            >
              <RotateCw className="w-4 h-4 text-white animate-spin" />
              <span>Balik Bunga (Pesan Rahasia) 🔑</span>
              <Sparkles className="w-4 h-4 text-yellow-200" />
            </button>
          </div>

          {/* BACK SIDE: SECRET MESSAGE CARD */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 w-full h-full bg-[#fffdfa]/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-2xl border-4 border-pink-200 flex flex-col justify-between space-y-3"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-pink-100 pb-2.5">
              <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold border border-rose-200">
                <Key className="w-3.5 h-3.5 text-rose-500" />
                <span>Pesan Rahasia Acaa 🌸</span>
              </div>
              <button
                onClick={handleFlipCard}
                className="text-xs text-pink-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Lihat Bunga</span>
              </button>
            </div>

            {/* Secret Content Scrollable */}
            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1 text-left">
              <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-3.5 rounded-2xl border border-pink-200 text-xs text-pink-950 leading-relaxed shadow-xs">
                <p className="font-bold text-pink-800 text-sm mb-1">
                  This is for you, Acaa Sayang! 💖✨
                </p>
                <p>
                  Bunga ini tidak akan pernah layu, persis seperti rasa sayang dan ketulusan hati aku yang selalu tumbuh buat Acaa setiap harinya.
                </p>
              </div>

              {/* Interactive Promises List */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-extrabold text-pink-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-rose-500" />
                  <span>Janji Spesialku Buat Acaa:</span>
                </h4>
                <div className="space-y-1.5">
                  {PROMISES.map((promise, idx) => {
                    const isChecked = checkedPromises.includes(idx);
                    return (
                      <motion.div
                        key={idx}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => togglePromise(idx)}
                        className={`p-2 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-pink-100/80 border-pink-300 text-pink-900 shadow-xs'
                            : 'bg-gray-50 border-gray-200 text-gray-500'
                        }`}
                      >
                        <span className="text-[11px] sm:text-xs">{promise}</span>
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ml-1 ${
                            isChecked ? 'text-rose-500 fill-rose-100' : 'text-gray-300'
                          }`}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Hug Banner */}
              <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-3 rounded-2xl text-center space-y-0.5 shadow-xs">
                <span className="text-xs font-bold block font-serif">
                  Big Virtual Hug! 🤗💖
                </span>
                <p className="text-[10px] text-rose-100 font-medium">
                  Love you so much, Acaa! Today, tomorrow, and forever! 🌸✨
                </p>
              </div>
            </div>

            {/* Flip Back Button */}
            <div className="pt-1">
              <button
                onClick={handleFlipCard}
                className="w-full py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold rounded-xl border border-pink-300 text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-pink-600" />
                <span>Balik Kembali Ke Buket Bunga 💐</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={() => {
            soundFx.playPop();
            onPrevStep();
          }}
          className="px-4 py-2.5 bg-white/80 hover:bg-white text-pink-600 font-bold rounded-2xl border border-pink-200 text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Foto Kita</span>
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            onRestart();
          }}
          className="px-4 py-2.5 bg-white hover:bg-pink-50 text-pink-700 font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs border border-pink-200"
        >
          <RefreshCw className="w-3.5 h-3.5 text-pink-500" />
          <span>Baca Ulang 💌</span>
        </button>
      </div>
    </div>
  );
};
