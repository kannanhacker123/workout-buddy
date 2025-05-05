// src/lib/workouts.ts
import fs from 'fs';
import path from 'path';

export async function getAllWorkoutIds(): Promise<string[]> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'workouts.json');
  const fileContents = await fs.promises.readFile(filePath, 'utf-8');
  const workouts = JSON.parse(fileContents) as { id: string }[];
  return workouts.map((w) => w.id);
}
