"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InventoryItem } from "@/lib/api";
import { createInventoryItem, updateInventoryItem } from "@/lib/api";
import { Save, Loader2, Sparkles, Zap } from "lucide-react";

interface ItemFormProps {
  item?: InventoryItem;
}

export default function ItemForm({ item }: ItemFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
    category: item?.category || "",
    quantity: item?.quantity || 0,
    price: item?.price || 0,
    rarity: item?.rarity || "common",
    image_url: item?.image_url || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.name.trim()) {
      setError("🚨 Item name is required for crafting!");
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError("🏷️ Category must be selected!");
      setLoading(false);
      return;
    }

    console.log("Submitting form data:", formData);

    try {
      if (item) {
        await updateInventoryItem(item.id, formData);
      } else {
        await createInventoryItem(formData);
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error saving item:", error);
      setError(
        error instanceof Error
          ? `💥 ${error.message}`
          : "⚠️ Failed to craft item. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-2 border-purple-500/30 backdrop-blur-xl shadow-2xl shadow-purple-500/20">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
        <CardTitle className="relative text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent flex items-center gap-3">
          {item ? (
            <>
              <Zap className="h-8 w-8 text-yellow-400" />
              Enhance Item
            </>
          ) : (
            <>
              <Sparkles className="h-8 w-8 text-purple-400" />
              Craft New Item
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-gradient-to-r from-red-900/80 to-red-800/80 border-2 border-red-500 text-red-200 px-6 py-4 rounded-xl mb-6 font-semibold shadow-lg shadow-red-500/30">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-cyan-300 font-bold text-base flex items-center gap-2"
              >
                ⚔️ Item Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-slate-800/80 border-2 border-slate-600 text-white text-lg font-semibold placeholder:text-slate-400 focus:border-cyan-400 transition-all duration-300"
                placeholder="Enter legendary item name..."
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="category"
                className="text-cyan-300 font-bold text-base flex items-center gap-2"
              >
                🏷️ Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="bg-slate-800/80 border-2 border-slate-600 text-white text-lg font-semibold focus:border-cyan-400">
                  <SelectValue placeholder="Select item category..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem
                    value="Weapons"
                    className="text-red-300 font-semibold"
                  >
                    ⚔️ Weapons
                  </SelectItem>
                  <SelectItem
                    value="Armor"
                    className="text-blue-300 font-semibold"
                  >
                    🛡️ Armor
                  </SelectItem>
                  <SelectItem
                    value="Consumables"
                    className="text-green-300 font-semibold"
                  >
                    🧪 Consumables
                  </SelectItem>
                  <SelectItem
                    value="Materials"
                    className="text-yellow-300 font-semibold"
                  >
                    🔮 Materials
                  </SelectItem>
                  <SelectItem
                    value="Accessories"
                    className="text-purple-300 font-semibold"
                  >
                    💍 Accessories
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="description"
              className="text-cyan-300 font-bold text-base flex items-center gap-2"
            >
              📜 Lore & Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-slate-800/80 border-2 border-slate-600 text-white text-base placeholder:text-slate-400 focus:border-cyan-400 transition-all duration-300"
              placeholder="Describe the mystical powers and legendary origins of this item..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label
                htmlFor="quantity"
                className="text-cyan-300 font-bold text-base flex items-center gap-2"
              >
                📦 Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: Number.parseInt(e.target.value) || 0,
                  })
                }
                required
                min="0"
                className="bg-slate-800/80 border-2 border-slate-600 text-white text-lg font-semibold focus:border-cyan-400 transition-all duration-300"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="price"
                className="text-yellow-400 font-bold text-base flex items-center gap-2"
              >
                🪙 Price (Gold)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: Number.parseFloat(e.target.value) || 0,
                  })
                }
                required
                min="0"
                className="bg-yellow-900/30 border-2 border-yellow-600 text-yellow-100 text-lg font-semibold focus:border-yellow-400 transition-all duration-300"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="rarity"
                className="text-purple-300 font-bold text-base flex items-center gap-2"
              >
                ✨ Rarity
              </Label>
              <Select
                value={formData.rarity}
                onValueChange={(value) =>
                  setFormData({ ...formData, rarity: value })
                }
              >
                <SelectTrigger className="bg-slate-800/80 border-2 border-purple-600 text-white text-lg font-semibold focus:border-purple-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-600">
                  <SelectItem value="common" className="text-gray-300">
                    ⚪ Common
                  </SelectItem>
                  <SelectItem value="uncommon" className="text-green-300">
                    🟢 Uncommon
                  </SelectItem>
                  <SelectItem value="rare" className="text-blue-300">
                    🔵 Rare
                  </SelectItem>
                  <SelectItem value="epic" className="text-purple-300">
                    🟣 Epic
                  </SelectItem>
                  <SelectItem value="legendary" className="text-yellow-300">
                    🟡 Legendary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="image_url"
              className="text-cyan-300 font-bold text-base flex items-center gap-2"
            >
              🖼️ Image URL (Optional)
            </Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              className="bg-slate-800/80 border-2 border-slate-600 text-white text-lg placeholder:text-slate-400 focus:border-cyan-400 transition-all duration-300"
              placeholder="https://example.com/legendary-item.jpg"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold py-4 text-xl shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] border border-purple-400/50"
          >
            {loading ? (
              <>
                <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                {item ? "Enhancing..." : "Crafting..."}
              </>
            ) : (
              <>
                <Save className="h-6 w-6 mr-3" />
                {item ? "🔥 Enhance Item" : "✨ Craft Item"}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
