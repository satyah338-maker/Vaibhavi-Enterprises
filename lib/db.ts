import { promises as fs } from "fs";
import path from "path";

const DB_DIR = path.join(process.cwd(), "data", "db");

export type DbCollection =
  | "products"
  | "clients"
  | "enquiries"
  | "quotes"
  | "settings"
  | "certificates";

export interface DbItem {
  id: string;
  createdAt: string;
  updatedAt: string;
}

type SettingsItem = { key: string; value: string } & DbItem;

async function ensureDir() {
  await fs.mkdir(DB_DIR, { recursive: true });
}

function filePath(name: DbCollection) {
  return path.join(DB_DIR, `${name}.json`);
}

export async function readCollection<T extends DbItem>(
  name: DbCollection,
): Promise<T[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(filePath(name), "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function writeCollection<T extends DbItem>(
  name: DbCollection,
  items: T[],
): Promise<void> {
  await ensureDir();
  await fs.writeFile(filePath(name), JSON.stringify(items, null, 2), "utf8");
}

export async function findById<T extends DbItem>(
  name: DbCollection,
  id: string,
): Promise<T | undefined> {
  const items = await readCollection<T>(name);
  return items.find((item) => item.id === id);
}

export async function insertItem<T extends DbItem>(
  name: DbCollection,
  item: Omit<T, "id" | "createdAt" | "updatedAt"> & { id?: string },
): Promise<T> {
  const items = await readCollection<T>(name);
  const id = item.id || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const now = new Date().toISOString();
  const newItem = { ...item, id, createdAt: now, updatedAt: now } as T;
  items.push(newItem);
  await writeCollection(name, items);
  return newItem;
}

export async function updateItem<T extends DbItem>(
  name: DbCollection,
  id: string,
  patch: Partial<T>,
): Promise<T | null> {
  const items = await readCollection<T>(name);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const now = new Date().toISOString();
  items[index] = { ...items[index], ...patch, updatedAt: now } as T;
  await writeCollection(name, items);
  return items[index];
}

export async function deleteItem(name: DbCollection, id: string): Promise<boolean> {
  const items = await readCollection<DbItem>(name);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  await writeCollection(name, filtered as DbItem[]);
  return true;
}

export async function getSetting(key: string): Promise<string | null> {
  const settings = await readCollection<SettingsItem>("settings");
  const s = settings.find((item) => item.key === key);
  return s ? s.value : null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const settings = await readCollection<SettingsItem>("settings");
  const index = settings.findIndex((item) => item.key === key);
  const now = new Date().toISOString();
  const entry: SettingsItem = { key, value, createdAt: now, updatedAt: now };
  if (index === -1) {
    settings.push(entry);
  } else {
    settings[index] = entry;
  }
  await writeCollection("settings", settings);
}
