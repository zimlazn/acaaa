import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { Heart, Sparkles, Lock, Key, CheckCircle2, Gift, X, Star, Volume2 } from 'lucide-react';

interface SecretMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROMISES = [
  'Janji selalu dengerin cerita Acaa tanpa bosan 🎧',
  'Janji bakal selalu ada kapanpun Acaa butuh sandaran 🫂',
  'Janji beliin gelato / makanan favorit pas Acaa lagi cape 🍦',
  'Janji terus melukis kenangan indah lainnya sama Acaa ✨',
  'Janji selalu bikin Acaa merasa dicintai setiap hari 💖',
];

export const SecretMessageModal: React.FC<SecretMessageModalProps> = ({ isOpen, onClose }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [secretInput, setSecretInput] = useState('');
  const [checkedPromises, setCheckedPromises] = useState<number[]>([0, 1, 2, 3, 4]);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundFx.playSparkleChime();
    setIsUnlocked(true);

    // Flower & heart confetti burst!
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fb7185', '#a855f7', '#fbbf24', '#f43f5e', '#fff'],
      shapes: ['circle', 'square'],
      scalar: 1.3,
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0.85, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 30, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#fffdfa] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-pink-200 relative overflow-hidden cursor-default"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-pink-100 hover:bg-pink-200 rounded-full flex items-center justify-center text-pink-600 transition-colors cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {!isUnlocked ? (
            /* LOCKED SECRET MESSAGE STATE */
            <div className="text-center space-y-6 py-4">
              <motion.div
                animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl text-white border-2 border-white"
              >
                <Lock className="w-10 h-10" />
              </motion.div>

              <div>
                <span className="text-xs font-extrabold text-pink-500 uppercase tracking-widest bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
                  Rahasia Khusus Acaa 🔑
                </span>
                <h3 className="text-2xl font-bold text-gray-800 font-serif mt-2">
                  Pesan Rahasia di Balik Bunga 🌸
                </h3>
                <p className="text-xs sm:text-sm text-pink-500/90 mt-1 max-w-xs mx-auto">
                  Ada pesan manis yang tersembunyi di balik tangkai bunga ini... Tekan tombol di bawah untuk membukanya!
                </p>
              </div>

              {/* Fast Unlock Button or Passcode optional */}
              <div className="space-y-3 max-w-xs mx-auto">
                <button
                  onClick={() => handleUnlock()}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-pink-300/50 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm border border-pink-300"
                >
                  <Key className="w-4 h-4 text-amber-200 animate-bounce" />
                  <span>Buka Pesan Rahasia Sekarang ✨</span>
                </button>
              </div>
            </div>
          ) : (
            /* UNLOCKED REVEAL STATE */
            <div className="space-y-6 py-2">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 px-3.5 py-1 rounded-full text-xs font-bold border border-rose-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pesan Rahasia Terbuka! 🎉</span>
                </div>
                <h3 className="text-2xl font-bold text-pink-700 font-serif">
                  P.S. Spesial Buat Acaa Sayang 💕
                </h3>
              </div>

              {/* Secret Note Content */}
              <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-5 rounded-2xl border-2 border-pink-200 space-y-3 text-xs sm:text-sm text-pink-950 leading-relaxed shadow-inner">
                <p className="font-semibold text-pink-800 text-sm sm:text-base">
                  Hi Acaa! ✨
                </p>
                <p>
                  Kalau kamu lagi baca pesan ini, berarti bunga di depannya sudah mekar dengan sempurna—sama seperti cintaku ke Acaa yang terus bertumbuh setiap harinya.
                </p>
                <p>
                  Di balik bunga virtual ini, ada janji-janji kecil yang mau aku tanyain dan buktikan ke kamu:
                </p>
              </div>

              {/* Interactive Promises List */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-pink-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-rose-500" />
                  <span>Janji Spesialku Buat Acaa:</span>
                </h4>
                <div className="space-y-2">
                  {PROMISES.map((promise, idx) => {
                    const isChecked = checkedPromises.includes(idx);
                    return (
                      <motion.div
                        key={idx}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => togglePromise(idx)}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-pink-100/80 border-pink-300 text-pink-900 shadow-xs'
                            : 'bg-gray-50 border-gray-200 text-gray-500'
                        }`}
                      >
                        <span>{promise}</span>
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            isChecked ? 'text-rose-500 fill-rose-100' : 'text-gray-300'
                          }`}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Virtual Hug & Love */}
              <div className="bg-rose-500 text-white p-4 rounded-2xl text-center space-y-1 shadow-md">
                <span className="text-lg font-bold block font-serif">
                  Group Hug Virtual! 🤗💖
                </span>
                <p className="text-xs text-rose-100 font-medium">
                  Selamat Girlfriend Day, Acaa! I love you so much today, tomorrow, and forever! 🌸✨
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
