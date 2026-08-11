"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { CHATBOT_KB, DEFAULT_CHATBOT_REPLY } from "../lib/mock-data";

function findAnswer(text) {
  const lower = text.toLowerCase();
  const match = CHATBOT_KB.find((entry) => entry.keywords.some((k) => lower.includes(k)));
  return match ? match.answer : DEFAULT_CHATBOT_REPLY;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hola 👋 ¿Tienes dudas sobre el diagnóstico o la protección de celulares de tu empresa?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply = findAnswer(text);
    setMessages((prev) => [...prev, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-20">
      {open && (
        <div className="mb-3 w-72 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600">
            <span className="text-sm font-medium text-white">Asistente HONOR</span>
            <X onClick={() => setOpen(false)} className="w-4 h-4 text-white cursor-pointer" />
          </div>
          <div className="flex-1 max-h-72 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${
                  m.role === "bot" ? "bg-slate-100 text-slate-700" : "bg-blue-600 text-white ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 border-t border-slate-100 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Escribe tu pregunta..."
              className="flex-1 text-sm px-2.5 py-2 border border-slate-200 rounded-lg"
            />
            <button onClick={send} className="bg-blue-600 text-white p-2 rounded-lg shrink-0">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </div>
  );
}
