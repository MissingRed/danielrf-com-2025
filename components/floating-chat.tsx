"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Frases rotativas para el botón cerrado
const phrases = [
  "How can I help you?",
  "¿Qué quieres saber de mí?",
  "Lenguajes que más utiliza Daniel",
  "Pregúntame sobre proyectos o experiencia",
  "¿Quieres ver el CV de Daniel?",
];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);

  // Detecta si hay texto en el input para mostrar historial
  useEffect(() => {
    setShowHistory(message.trim().length > 0 || messages.length > 0);
  }, [message, messages]);

  // Rotar frases siempre, tanto abierto como cerrado
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`w-[42rem] max-w-full bg-white/0.5 backdrop-blur-md rounded-2xl shadow-xl p-4 flex flex-col gap-2 border border-neutral-200 transition-all duration-300 ${
              showHistory ? "h-96" : "h-auto"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {/* Ícono de robot */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v2m6 2a2 2 0 012 2v6a8 8 0 11-16 0V6a2 2 0 012-2h12zm-9 10h.01M15 14h.01"
                  />
                </svg>
                <span className="font-semibold">Asistente IA</span>
              </div>
              <button
                className="text-neutral-400 hover:text-neutral-600 transition"
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
              >
                ×
              </button>
            </div>
            <div className="-mt-2 mb-1 text-xs text-neutral-500 text-left pl-1 select-none">
              Powered by IA
            </div>
            {/* Aquí irían los mensajes del chat si se implementa backend */}
            {showHistory && (
              <div className="flex-1 overflow-y-auto mb-2 flex flex-col gap-2 pr-2">
                {messages.length === 0 && (
                  <div className="text-sm text-center select-none mt-8">
                    Hola!, mi nombre es NexIA una creación de Daniel. Estoy aquí
                    para ayudarte.
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="self-end bg-black text-white rounded-2xl px-4 py-2 max-w-[70%] text-sm shadow"
                  >
                    {msg}
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-white backdrop-blur placeholder:text-neutral-400 text-neutral-800"
                type="text"
                placeholder={phrases[phraseIdx]}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setShowHistory(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message.trim()) {
                    setMessages((prev) => [...prev, message]);
                    setMessage("");
                  }
                }}
              />
              <button
                className="bg-black hover:bg-neutral-800 text-white rounded-full w-10 h-10 flex items-center justify-center transition disabled:opacity-50"
                onClick={() => {
                  if (message.trim()) {
                    setMessages((prev) => [...prev, message]);
                    setMessage("");
                  }
                }}
                aria-label="Enviar mensaje"
                disabled={!message.trim()}
              >
                {/* Ícono de enviar tipo WhatsApp */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12L21.75 3.75l-8.25 19.5-2.25-7.5-7.5-2.25z"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {!open && (
        <button
          className="bg-white/80 backdrop-blur-md border border-neutral-200 shadow-lg px-6 py-3 rounded-full text-neutral-800 font-medium hover:bg-white/90 transition flex items-center gap-2"
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v2m6 2a2 2 0 012 2v6a8 8 0 11-16 0V6a2 2 0 012-2h12zm-9 10h.01M15 14h.01"
            />
          </svg>
          <AnimatePresence mode="wait">
            <motion.span
              key={phraseIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="transition-all duration-500 block"
            >
              {phrases[phraseIdx]}
            </motion.span>
          </AnimatePresence>
        </button>
      )}
    </div>
  );
}
