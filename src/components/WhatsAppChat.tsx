import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/audio';
import {
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Send,
  CheckCheck,
  Play,
  RotateCcw,
  Heart,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Pause
} from 'lucide-react';

interface WhatsAppChatProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

export interface ChatMessage {
  id: string;
  sender: 'acaa' | 'aam';
  text: string;
  time: string;
}

const ORIGINAL_CHAT: ChatMessage[] = [
  { id: '1', sender: 'acaa', text: 'arham?', time: '23:38' },
  { id: '2', sender: 'aam', text: 'Iya', time: '23:38' },
  { id: '3', sender: 'aam', text: 'knapa?', time: '23:38' },
  { id: '4', sender: 'acaa', text: 'jdi pindah kelas?', time: '23:39' },
  { id: '5', sender: 'aam', text: 'jadi', time: '23:39' },
  { id: '6', sender: 'acaa', text: 'knp pindah?g asik ya?', time: '23:39' },
  { id: '7', sender: 'aam', text: 'bukaaann', time: '23:40' },
  { id: '8', sender: 'aam', text: 'ga ada mapel tik', time: '23:40' },
  { id: '9', sender: 'aam', text: 'sama biologi', time: '23:40' },
  { id: '10', sender: 'acaa', text: 'ohh', time: '23:41' },
  { id: '11', sender: 'aam', text: 'oya btw ni sapa yak, gk sev', time: '23:41' },
  { id: '12', sender: 'acaa', text: 'Loh wkwkkwkw', time: '23:41' },
  { id: '13', sender: 'acaa', text: 'Raisa', time: '23:41' },
  { id: '14', sender: 'aam', text: 'ooowwhhhh', time: '23:42' },
  { id: '15', sender: 'acaa', text: 'gajdi temenan dong yak? Ga sekelas', time: '23:42' },
  { id: '16', sender: 'acaa', text: 'wkwkkw', time: '23:42' },
  { id: '17', sender: 'aam', text: 'napa nggak?', time: '23:43' },
  { id: '18', sender: 'aam', text: 'temenan aja, apa salahnya', time: '23:43' },
  { id: '19', sender: 'acaa', text: 'ohh hmm', time: '23:43' },
];

export const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ onNextStep, onPrevStep }) => {
  const [displayedIndex, setDisplayedIndex] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [reactions, setReactions] = useState<Record<string, string>>({});
  const [userReplyText, setUserReplyText] = useState('');
  const [extraMessages, setExtraMessages] = useState<ChatMessage[]>([]);
  const [activeReactionMsgId, setActiveReactionMsgId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-play chat logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && displayedIndex < ORIGINAL_CHAT.length) {
      timer = setTimeout(() => {
        setDisplayedIndex((prev) => prev + 1);
        soundFx.playPop();
      }, 1200);
    } else if (displayedIndex >= ORIGINAL_CHAT.length) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, displayedIndex]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedIndex, extraMessages]);

  const handleTogglePlay = () => {
    soundFx.playPop();
    if (displayedIndex >= ORIGINAL_CHAT.length) {
      setDisplayedIndex(1);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleShowAll = () => {
    soundFx.playPop();
    setIsPlaying(false);
    setDisplayedIndex(ORIGINAL_CHAT.length);
  };

  const handleReset = () => {
    soundFx.playPop();
    setDisplayedIndex(0);
    setIsPlaying(true);
  };

  const handleAddReaction = (msgId: string, emoji: string) => {
    soundFx.playSparkleChime();
    setReactions((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === emoji ? '' : emoji,
    }));
  };

  const handleSendCustomReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReplyText.trim()) return;
    soundFx.playPop();
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'acaa',
      text: userReplyText.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };
    setExtraMessages((prev) => [...prev, newMsg]);
    setUserReplyText('');
  };

  const currentVisibleChat = [
    ...ORIGINAL_CHAT.slice(0, displayedIndex),
    ...extraMessages,
  ];

  return (
    <div className="w-full max-w-2xl mx-auto py-4 sm:py-6 space-y-4">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-pink-500">
        <span className="bg-pink-100 px-3 py-1 rounded-full border border-pink-200 shadow-2xs">
          Langkah 2 dari 4: Chat Pertama Kita 💬
        </span>
      </div>

      {/* Intro Badge */}
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 font-serif flex items-center justify-center gap-2">
          <span>Replika Chat Pertama Acaa & Arham</span>
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin-slow" />
        </h2>
        <p className="text-xs sm:text-sm text-pink-600 font-medium">
          &ldquo;Napa nggak? Temenan aja, apa salahnya...&rdquo; 💖
        </p>
      </div>

      {/* Control Action Toolbar */}
      <div className="flex items-center justify-between bg-white/90 p-2.5 px-4 rounded-2xl border border-pink-200 shadow-2xs text-xs font-semibold">
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all cursor-pointer shadow-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>Jeda Play</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{displayedIndex >= ORIGINAL_CHAT.length ? 'Putar Ulang' : 'Putar Chat'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleShowAll}
            className="flex items-center gap-1 px-3 py-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-xl font-bold transition-all cursor-pointer"
          >
            <span>Tampilkan Semua</span>
          </button>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          title="Reset dari awal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* WhatsApp Container Replica */}
      <div className="bg-[#efeae2] rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-700/20 flex flex-col h-[520px] sm:h-[580px] relative font-sans">
        {/* WhatsApp Header */}
        <div className="bg-[#075e54] text-white px-3.5 py-2.5 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                alt="Acaa Avatar"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="%23ec4899"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
                }}
                className="w-10 h-10 rounded-full object-cover border border-white/40 shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075e54] rounded-full"></span>
            </div>

            {/* User Info */}
            <div className="leading-tight">
              <h3 className="font-bold text-sm sm:text-base tracking-wide flex items-center gap-1.5">
                <span>Acaa 💖</span>
                <span className="text-[10px] bg-emerald-800/80 text-emerald-200 px-1.5 py-0.2 rounded font-normal">
                  (Raisa)
                </span>
              </h3>
              <p className="text-[11px] text-emerald-100/90 font-light">
                {isPlaying ? 'sedang mengetik...' : 'online'}
              </p>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 text-emerald-100">
            <Video className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <Phone className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* WhatsApp Chat Body Wallpaper */}
        <div
          className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2.5 relative backdrop-brightness-95"
          style={{
            backgroundImage:
              'radial-gradient(#0000000a 1px, transparent 1px), radial-gradient(#0000000a 1px, #efeae2 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        >
          {/* WhatsApp Date Badge */}
          <div className="flex justify-center my-2">
            <span className="bg-white/80 backdrop-blur-xs text-gray-600 text-[10px] font-semibold uppercase px-3 py-1 rounded-lg shadow-2xs border border-gray-200/50">
              8 Agustus 2024 • Awal Cerita Kita ✨
            </span>
          </div>

          {/* Messages list */}
          <AnimatePresence initial={false}>
            {currentVisibleChat.map((msg) => {
              const isAam = msg.sender === 'aam';
              const reaction = reactions[msg.id];

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${isAam ? 'justify-end' : 'justify-start'} group relative`}
                >
                  <div
                    className={`max-w-[82%] sm:max-w-[75%] px-3 py-1.5 rounded-2xl relative shadow-xs text-xs sm:text-sm ${
                      isAam
                        ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none border border-emerald-200/60'
                        : 'bg-white text-gray-900 rounded-tl-none border border-gray-200/60'
                    }`}
                  >
                    {/* Sender Label for Acaa */}
                    {!isAam && (
                      <p className="text-[10px] font-bold text-pink-600 mb-0.5">
                        Acaa (Raisa)
                      </p>
                    )}

                    {/* Message Text */}
                    <p className="leading-snug break-words pr-12 font-medium">
                      {msg.text}
                    </p>

                    {/* Timestamp & Read Status */}
                    <div className="flex items-center justify-end gap-1 text-[9.5px] text-gray-500 float-right mt-1 ml-2 select-none">
                      <span>{msg.time}</span>
                      {isAam && <CheckCheck className="w-3 h-3 text-sky-500" />}
                    </div>

                    {/* Reactions Pill if present */}
                    {reaction && (
                      <div
                        className={`absolute -bottom-2.5 ${
                          isAam ? 'left-2' : 'right-2'
                        } bg-white shadow-md border border-gray-200 text-xs px-1.5 py-0.2 rounded-full flex items-center animate-bounce-short`}
                      >
                        <span>{reaction}</span>
                      </div>
                    )}

                    {/* Hover Reaction Trigger */}
                    <div
                      className={`absolute -top-7 ${
                        isAam ? 'right-0' : 'left-0'
                      } opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-white/95 px-2 py-0.5 rounded-full shadow-md border border-pink-200 z-20`}
                    >
                      <button
                        onClick={() => handleAddReaction(msg.id, '❤️')}
                        className="hover:scale-125 transition-transform"
                      >
                        ❤️
                      </button>
                      <button
                        onClick={() => handleAddReaction(msg.id, '😂')}
                        className="hover:scale-125 transition-transform"
                      >
                        😂
                      </button>
                      <button
                        onClick={() => handleAddReaction(msg.id, '🥺')}
                        className="hover:scale-125 transition-transform"
                      >
                        🥺
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator when auto-playing */}
          {isPlaying && displayedIndex < ORIGINAL_CHAT.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`flex ${
                ORIGINAL_CHAT[displayedIndex]?.sender === 'aam' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className="bg-white/90 px-3 py-1.5 rounded-2xl shadow-2xs border border-gray-200 flex items-center gap-1 text-xs text-gray-500">
                <span className="font-semibold text-pink-500">
                  {ORIGINAL_CHAT[displayedIndex]?.sender === 'aam' ? 'Arham' : 'Acaa'} sedang mengetik
                </span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            </motion.div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* WhatsApp Bottom Bar */}
        <div className="bg-[#f0f2f5] p-2 sm:p-2.5 flex items-center gap-2 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 px-1">
            <Smile className="w-5 h-5 cursor-pointer hover:text-emerald-600 transition-colors" />
            <Paperclip className="w-5 h-5 cursor-pointer hover:text-emerald-600 transition-colors" />
          </div>

          <form onSubmit={handleSendCustomReply} className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={userReplyText}
              onChange={(e) => setUserReplyText(e.target.value)}
              placeholder="Tulis balasan manis buat Acaa..."
              className="w-full bg-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden border border-gray-300 focus:border-emerald-500 shadow-2xs"
            />
            <button
              type="submit"
              disabled={!userReplyText.trim()}
              className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center disabled:opacity-50 hover:bg-[#008f6f] transition-all cursor-pointer shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <Mic className="w-5 h-5 text-gray-500 cursor-pointer hover:text-emerald-600 transition-colors" />
        </div>
      </div>

      {/* Romantic Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-2xl shadow-md border border-pink-300 text-center space-y-1.5"
      >
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-100">
          <Heart className="w-4 h-4 fill-white text-white" />
          <span>Kenangan Awal Yang Manis</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed font-medium">
          Berawal dari nanya pindah kelas & belum saling simpan kontak... sekarang kita jadi dua sejoli yang saling melengkapi dan menyayangi setiap hari! 💖✨
        </p>
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
          <span>Kembali ke Hitung Waktu</span>
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            onNextStep();
          }}
          className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md border border-pink-300"
        >
          <span>Lanjut Lihat Galeri Foto 📸</span>
          <ArrowRight className="w-4 h-4 text-white animate-pulse" />
        </button>
      </div>
    </div>
  );
};
