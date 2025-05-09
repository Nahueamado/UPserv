"use client";

import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function PruebaLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("register");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await supabase
        .from("users")
        .insert([{ email, password }]);
      if (error) {
        setMessage("Error al registrar: " + error.message);
      } else {
        setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
        setMode("login");
      }
    } catch (err) {
      setMessage("Error inesperado al registrar.");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();
      if (error || !data) {
        setMessage("Credenciales incorrectas o usuario no registrado.");
      } else {
        setMessage(null);
        router.push("/prueba-login/inicio");
      }
    } catch (err) {
      setMessage("Error inesperado al iniciar sesión.");
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>{mode === "register" ? "Registro" : "Iniciar Sesión"}</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "0.5rem", fontSize: "1rem" }}>
          {loading ? "Procesando..." : mode === "register" ? "Registrarse" : "Iniciar Sesión"}
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem", color: "red" }}>{message}</p>}
      <p style={{ marginTop: "1rem" }}>
        {mode === "register" ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <button
          onClick={() => {
            setMessage(null);
            setMode(mode === "register" ? "login" : "register");
          }}
          style={{ color: "blue", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
        >
          {mode === "register" ? "Inicia sesión" : "Regístrate"}
        </button>
      </p>
    </div>
  );
}
