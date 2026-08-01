import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { calculateTimeTogether } from '../utils/time';
import { TimeTogether } from '../types';
import { Calendar, Clock, Heart, Sparkles, Flame, RefreshCw, ArrowRight, ArrowLeft } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TimeCounterProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

const SWEET_QUOTES = [
  'Setiap detik sama Acaa itu rasanya kayak dapet keajaiban kecil! 💖',
  'Dari tanggal 8 bulan 8 2024 jam 11:38 malam, hatiku resmi milik Acaa. ✨',
  'Waktu berlalu cepat banget pas kita lagi seneng-seneng bareng. 🥰',
  'Terima kasih sudah jadi alasan senyumku setiap hari, Acaa! 🌸',
  'Ribuan jam sampai nanti... aku mau terus jalan bareng Acaa. 💕',
  'Kamu adalah keputusan terbaik dan paling membahagiakan dalam hidupku! 🌷',
];

export const TimeCounter: React.FC<TimeCounterProps> = ({ onNextStep, onPrevStep }) => {
  const [time, setTime] = useState<TimeTogether>(calculateTimeTogether());
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeTogether());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNextQuote = () => {
    soundFx.playPop();
    setQuoteIndex((prev) => (prev + 1) % SWEET_QUOTES.length);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6 sm:py-10 space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-pink-500">
        <span className="bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
          Langkah 1 dari 4: Waktu Kita ⏳
        </span>
      </div>

      {/* Main Time Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-pink-200 text-center relative overflow-hidden space-y-6"
      >
        <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-pink-200">
          <Calendar className="w-4 h-4 text-pink-500" />
          <span>Sejak 8 Agustus 2024 • 23:38 WIB (11:38 Malam)</span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-serif">
            Kita Sudah Menghabiskan Waktu Bersama Selama: ⏳💖
          </h2>
          <p className="text-xs sm:text-sm text-pink-500 mt-2 max-w-md mx-auto">
            Setiap momen sejak malam itu terasa begitu indah dan berharga bersama Acaa.
          </p>
        </div>

        {/* Live Counters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl p-4 shadow-sm border border-pink-300 flex flex-col items-center justify-center"
          >
            <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
              {time.days}
            </span>
            <span className="text-[11px] uppercase tracking-wider font-medium opacity-90 mt-1">
              Hari 🗓️
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-rose-400 to-pink-500 text-white rounded-2xl p-4 shadow-sm border border-pink-300 flex flex-col items-center justify-center"
          >
            <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
              {String(time.hours).padStart(2, '0')}
            </span>
            <span className="text-[11px] uppercase tracking-wider font-medium opacity-90 mt-1">
              Jam ⏰
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-pink-400 to-rose-400 text-white rounded-2xl p-4 shadow-sm border border-pink-300 flex flex-col items-center justify-center"
          >
            <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
              {String(time.minutes).padStart(2, '0')}
            </span>
            <span className="text-[11px] uppercase tracking-wider font-medium opacity-90 mt-1">
              Menit ⏱️
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl p-4 shadow-sm border border-pink-300 flex flex-col items-center justify-center relative"
          >
            <div className="flex items-center gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
                {String(time.seconds).padStart(2, '0')}
              </span>
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-white fill-white" />
              </motion.div>
            </div>
            <span className="text-[11px] uppercase tracking-wider font-medium opacity-90 mt-1">
              Detik 💓
            </span>
          </motion.div>
        </div>

        {/* Total Time Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-pink-50/70 p-3.5 rounded-2xl border border-pink-200 text-xs font-semibold text-pink-700">
          <div className="flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-pink-500" />
            <span>Total Jam: {time.totalHours.toLocaleString('id-ID')} Jam</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Total Menit: {time.totalMinutes.toLocaleString('id-ID')} Menit</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Total Detik: {time.totalSeconds.toLocaleString('id-ID')} Detik</span>
          </div>
        </div>

        {/* Quote Card */}
        <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 p-4 rounded-2xl border border-pink-200">
          <p className="text-sm font-semibold text-pink-800 italic">
            &ldquo;{SWEET_QUOTES[quoteIndex]}&rdquo;
          </p>
          <button
            onClick={handleNextQuote}
            className="mt-2.5 inline-flex items-center gap-1 px-3 py-1 bg-white text-pink-600 rounded-full text-xs font-bold border border-pink-200 hover:shadow-xs transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-pink-500" />
            <span>Ganti Ungkapan ✨</span>
          </button>
        </div>
      </motion.div>

      {/* Navigation Controls at Bottom */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => {
            soundFx.playPop();
            onPrevStep();
          }}
          className="px-4 py-2.5 bg-white/80 hover:bg-white text-pink-600 font-bold rounded-2xl border border-pink-200 text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Baca Surat Lagi</span>
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            onNextStep();
          }}
          className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md border border-pink-300"
        >
          <span>Lanjut ke Chat Pertama 💬</span>
          <ArrowRight className="w-4 h-4 text-white animate-pulse" />
        </button>
      </div>
    </div>
  );
};
