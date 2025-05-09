"use client";

import React, { useEffect, useState } from 'react';

interface Item {
  id: number;
  name: string;
  // Agrega aquí los campos que tenga tu tabla "items"
}

const SupabaseExamplePage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch('/api/supabase-example');
        const json = await res.json();
        if (res.ok) {
          setItems(json.data);
        } else {
          setError(json.error || 'Error al obtener datos');
        }
      } catch (err) {
        setError('Error de red');
      }
    }
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Ejemplo de datos desde Supabase</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SupabaseExamplePage;
