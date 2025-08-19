"use client";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebaseConfig";

export default function LogoutButton() {
  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Cerrar sesión
    </button>
  );
}
