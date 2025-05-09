"use client";

import React, { useEffect, useState } from "react";

interface ChangeLogEntry {
  codigo: number;
  fecha: string;
  descripcion: string;
  agregado: string[];
  editado: string[];
  eliminado: string[];
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString; // Return original if invalid date
  }
  // Format date as DD de MMMM de YYYY, HH:mm:ss in Spanish
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }) + ", " + date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const ChangelogPage: React.FC = () => {
  const [changelog, setChangelog] = useState<ChangeLogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch changelog data from API route every 10 seconds
  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const res = await fetch("/api/changelog");
        if (!res.ok) {
          throw new Error("Error al cargar changelog.json");
        }
        const data = await res.json();
        setChangelog(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchChangelog();
    const interval = setInterval(fetchChangelog, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "1rem" }}>Historial de Cambios</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {changelog.length === 0 && !error && <p>Cargando cambios...</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {changelog.map((entry) => (
          <li
            key={entry.codigo}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#34495e", marginBottom: "0.5rem" }}>
              Código: <span style={{ color: "#e67e22", fontWeight: "bold" }}>{entry.codigo}</span> - Fecha:{" "}
              <span style={{ color: "#2980b9", fontWeight: "bold" }}>{formatDateTime(entry.fecha)}</span>
            </h2>
            <p style={{ color: "#2d3436", fontSize: "1rem", marginBottom: "1rem" }}>{entry.descripcion}</p>
            <div style={{ display: "flex", gap: "2rem" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: "#27ae60", borderBottom: "2px solid #27ae60", paddingBottom: "0.25rem" }}>Agregado</h3>
                {entry.agregado.length > 0 ? (
                  <ul style={{ paddingLeft: "1rem", color: "#2d3436" }}>
                    {entry.agregado.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontStyle: "italic", color: "#7f8c8d" }}>No hay elementos agregados.</p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: "#f39c12", borderBottom: "2px solid #f39c12", paddingBottom: "0.25rem" }}>Editado</h3>
                {entry.editado.length > 0 ? (
                  <ul style={{ paddingLeft: "1rem", color: "#2d3436" }}>
                    {entry.editado.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontStyle: "italic", color: "#7f8c8d" }}>No hay elementos editados.</p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: "#c0392b", borderBottom: "2px solid #c0392b", paddingBottom: "0.25rem" }}>Eliminado</h3>
                {entry.eliminado.length > 0 ? (
                  <ul style={{ paddingLeft: "1rem", color: "#2d3436" }}>
                    {entry.eliminado.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontStyle: "italic", color: "#7f8c8d" }}>No hay elementos eliminados.</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChangelogPage;
