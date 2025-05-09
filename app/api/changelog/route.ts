export const dynamic = "force-static";
export const revalidate = 60;

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'changelog.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'No se pudo cargar changelog.json' }, { status: 500 });
  }
}
