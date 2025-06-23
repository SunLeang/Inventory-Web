const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Keep port 3000

export interface InventoryItem {
  id: number;
  name: string;
  description: string | null;
  category: string;
  quantity: number;
  price: number;
  rarity: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface InventoryStats {
  total: number;
  weapons: number;
  armor: number;
  consumables: number;
}

export async function getInventoryItems(): Promise<InventoryItem[]> {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch inventory items");
  }

  return response.json();
}

export async function getInventoryItem(id: number): Promise<InventoryItem> {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch inventory item");
  }

  return response.json();
}

export async function getInventoryStats(): Promise<InventoryStats> {
  const response = await fetch(`${API_BASE_URL}/inventory/stats`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch inventory stats");
  }

  return response.json();
}

export async function createInventoryItem(
  item: Omit<InventoryItem, "id" | "created_at" | "updated_at">
): Promise<InventoryItem> {
  console.log("Creating item with data:", item); // Debug log

  const response = await fetch(`${API_BASE_URL}/inventory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error(`Failed to create inventory item: ${errorText}`);
  }

  return response.json();
}

export async function updateInventoryItem(
  id: number,
  item: Partial<Omit<InventoryItem, "id" | "created_at" | "updated_at">>
): Promise<InventoryItem> {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to update inventory item");
  }

  return response.json();
}

export async function deleteInventoryItem(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete inventory item");
  }
}