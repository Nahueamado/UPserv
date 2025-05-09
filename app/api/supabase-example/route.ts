import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
  // Ejemplo: obtener los primeros 10 registros de la tabla "items"
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
