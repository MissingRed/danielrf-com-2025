"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';

interface Message {
  role: string;
  text: string;
}

interface Chat {
  id: string;
  createdAt?: any;
  messages: Message[];
}

export default function Chats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [input, setInput] = useState('');

  // Escuchar los chats en tiempo real (nueva estructura)
  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsData: Chat[] = snapshot.docs.map((docSnap) => {
        const chatId = docSnap.id;
        const chatData = docSnap.data();
        return {
          id: chatId,
          createdAt: chatData.createdAt,
          messages: Array.isArray(chatData.messages) ? chatData.messages : [],
        };
      });
      setChats(chatsData);
      if (!selectedChatId && chatsData.length > 0) {
        setSelectedChatId(chatsData[0].id);
      }
    });
    return () => unsubscribe();
  }, [selectedChatId]);

  // Actualizar el chat seleccionado cuando cambie selectedChatId o chats
  useEffect(() => {
    if (!selectedChatId) {
      setSelectedChat(null);
      return;
    }
    const chat = chats.find((c) => c.id === selectedChatId) || null;
    setSelectedChat(chat);
  }, [selectedChatId, chats]);

  // Agregar mensaje al arreglo de mensajes del chat seleccionado
  const handleSend = async () => {
    if (!input.trim() || !selectedChat) return;
    const chatDocRef = doc(db, 'chats', selectedChat.id);
    // Obtener mensajes actuales
    const chatDocSnap = await getDoc(chatDocRef);
    const chatData = chatDocSnap.data();
    const currentMessages = Array.isArray(chatData?.messages) ? chatData.messages : [];
    const newMessages = [
      ...currentMessages,
      {
        role: 'ia',
        text: input,
      },
    ];
    await updateDoc(chatDocRef, { messages: newMessages });
    setInput('');
  };

  return (
    <div className="flex bg-card rounded-lg shadow-lg overflow-hidden h-[500px]">
      <aside className="w-1/3 border-r bg-muted p-4">
        <h2 className="font-semibold mb-4">Chats</h2>
        <div className="overflow-y-auto max-h-[420px]">
          <ul>
            {chats
              .filter((chat) => chat.messages.length > 0)
              .map((chat) => {
                // Formatear la fecha de creación
                let createdAtStr = '';
                if (chat.createdAt && chat.createdAt.seconds) {
                  const date = new Date(chat.createdAt.seconds * 1000);
                  createdAtStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }
                return (
                  <li
                    key={chat.id}
                    className={`p-2 rounded cursor-pointer mb-2 ${selectedChatId === chat.id ? 'bg-primary text-primary-foreground' : ''}`}
                    onClick={() => setSelectedChatId(chat.id)}
                  >
                    <div className="font-medium flex justify-between items-center">
                      <span>Chat {chat.id}</span>
                      {createdAtStr && (
                        <span className="ml-2 text-xs text-muted-foreground">{createdAtStr}</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : ''}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </aside>
      <section className="flex-1 flex flex-col justify-between p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg">Chat {selectedChat?.id}</h3>
        </div>
        <div className="flex-1 overflow-y-auto mb-2">
          {selectedChat?.messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded px-2 py-1 bg-background text-foreground"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled
          />
          <button
            className="bg-primary text-primary-foreground px-4 py-1 rounded opacity-50 cursor-not-allowed"
            onClick={handleSend}
            disabled
          >
            Enviar
          </button>
        </div>
      </section>
    </div>
  );
}
// ...existing code...
