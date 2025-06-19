"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { InventoryItem } from "@/lib/api";
import { deleteInventoryItem } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Coins,
  Package,
  Calendar,
  Loader2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ItemDetailProps {
  item: InventoryItem;
}

const rarityColors = {
  common: "from-gray-600 to-gray-700 border-gray-500",
  uncommon: "from-green-600 to-green-700 border-green-500",
  rare: "from-blue-600 to-blue-700 border-blue-500",
  epic: "from-purple-600 to-purple-700 border-purple-500",
  legendary: "from-yellow-500 to-yellow-600 border-yellow-400",
};

const rarityGlow = {
  common: "shadow-lg shadow-gray-500/30",
  uncommon: "shadow-lg shadow-green-500/40",
  rare: "shadow-lg shadow-blue-500/40",
  epic: "shadow-xl shadow-purple-500/50",
  legendary: "shadow-2xl shadow-yellow-500/60 animate-pulse",
};

const rarityBorders = {
  common: "border-gray-500/50",
  uncommon: "border-green-500/50",
  rare: "border-blue-500/50",
  epic: "border-purple-500/50",
  legendary: "border-yellow-400/60",
};

export default function ItemDetail({ item }: ItemDetailProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteInventoryItem(item.id);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card
        className={`
          bg-gradient-to-br from-slate-900/90 to-slate-800/90 
          backdrop-blur-xl 
          border-2 ${rarityBorders[item.rarity as keyof typeof rarityBorders]}
          ${rarityGlow[item.rarity as keyof typeof rarityGlow]}
          transition-all duration-300 hover:scale-[1.02]
        `}
      >
        <CardHeader className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
          <div className="relative flex items-start justify-between">
            <div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-3 flex items-center gap-3">
                {item.rarity === "legendary" && (
                  <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
                )}
                {item.name}
                {item.rarity === "legendary" && (
                  <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
                )}
              </CardTitle>
              <div className="flex items-center gap-3">
                <Badge
                  className={`
                    bg-gradient-to-r ${
                      rarityColors[item.rarity as keyof typeof rarityColors]
                    } 
                    text-white font-bold px-4 py-2 text-sm uppercase tracking-wide
                    shadow-lg border-0
                  `}
                >
                  ✨ {item.rarity}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-cyan-300 border-cyan-400 bg-cyan-950/50 font-semibold px-3 py-1"
                >
                  🏷️ {item.category}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/edit/${item.id}`}>
                <Button className="game-button-success px-6 py-3">
                  <Edit className="h-5 w-5 mr-2" />
                  Enhance
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="game-button-danger px-6 py-3">
                    <Trash2 className="h-5 w-5 mr-2" />
                    Destroy
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gradient-to-br from-slate-900 to-red-950/50 border-red-500/50 backdrop-blur-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-400 text-xl flex items-center gap-2">
                      ⚠️ Confirm Destruction
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-red-200">
                      This action will permanently remove{" "}
                      <span className="font-bold text-white">
                        &ldquo;{item.name}&rdquo;
                      </span>{" "}
                      from your inventory. This cannot be undone!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-slate-700 hover:bg-slate-600 text-white border-slate-500 hover:border-slate-400 transition-all duration-300">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={deleting}
                      className="game-button-danger"
                    >
                      {deleting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Destroying...
                        </>
                      ) : (
                        <>💥 Destroy Forever</>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${
                  rarityColors[item.rarity as keyof typeof rarityColors]
                } opacity-20 blur-xl`}
              />
              <Image
                src={item.image_url || "/placeholder.svg?height=400&width=400"}
                alt={item.name}
                width={400}
                height={400}
                className={`
                  relative w-full h-96 object-cover rounded-xl 
                  border-2 ${
                    rarityBorders[item.rarity as keyof typeof rarityBorders]
                  }
                  ${rarityGlow[item.rarity as keyof typeof rarityGlow]}
                `}
              />
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-xl border border-slate-600/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2">
                  📜 Item Description
                </h3>
                <p className="text-slate-200 leading-relaxed">
                  {item.description ||
                    "A mysterious item with unknown properties..."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 p-5 rounded-xl border border-yellow-500/30">
                  <div className="flex items-center text-yellow-400 mb-3">
                    <Coins className="h-6 w-6 mr-2" />
                    <span className="font-bold">Value</span>
                  </div>
                  <p className="text-3xl font-bold text-yellow-300">
                    {item.price} 🪙
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-5 rounded-xl border border-blue-500/30">
                  <div className="flex items-center text-blue-400 mb-3">
                    <Package className="h-6 w-6 mr-2" />
                    <span className="font-bold">Stack</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-300">
                    {item.quantity} 📦
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 p-5 rounded-xl border border-purple-500/30">
                <div className="flex items-center text-purple-400 mb-3">
                  <Calendar className="h-6 w-6 mr-2" />
                  <span className="font-bold">Discovered</span>
                </div>
                <p className="text-white font-semibold">
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {item.updated_at !== item.created_at && (
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 p-5 rounded-xl border border-green-500/30">
                  <div className="flex items-center text-green-400 mb-3">
                    <Calendar className="h-6 w-6 mr-2" />
                    <span className="font-bold">Last Enhanced</span>
                  </div>
                  <p className="text-white font-semibold">
                    {new Date(item.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
