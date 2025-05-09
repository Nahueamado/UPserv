"use client";

import React, { useEffect, useState } from 'react';

interface ShoppingItem {
  id: number;
  item_name: string;
  quantity: number;
  purchased: boolean;
}

const ShoppingListPage: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch('/api/supabase-shopping-list');
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
      <h1>Lista de Compras</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.item_name} - Cantidad: {item.quantity} - {item.purchased ? 'Comprado' : 'Pendiente'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListPage;
