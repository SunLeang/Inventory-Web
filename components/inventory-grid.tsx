"use client";

import type { InventoryItem } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Coins, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InventoryGridProps {
  items: InventoryItem[];
}

const rarityColors = {
  common: "from-gray-600 to-gray-700 border-gray-500",
  uncommon: "from-green-600 to-green-700 border-green-500",
  rare: "from-blue-600 to-blue-700 border-blue-500",
  epic: "from-purple-600 to-purple-700 border-purple-500",
  legendary: "from-yellow-500 to-yellow-600 border-yellow-400",
};

const rarityGlow = {
  common: "shadow-lg shadow-gray-500/20",
  uncommon: "shadow-lg shadow-green-500/30",
  rare: "shadow-lg shadow-blue-500/30",
  epic: "shadow-xl shadow-purple-500/40",
  legendary: "shadow-2xl shadow-yellow-500/50",
};

const rarityBorders = {
  common: "border-gray-500/50",
  uncommon: "border-green-500/50",
  rare: "border-blue-500/50",
  epic: "border-purple-500/50",
  legendary: "border-yellow-400/60",
};

export default function InventoryGrid({ items }: InventoryGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6 animate-bounce">🎒</div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
          Your Vault is Empty
        </h3>
        <p className="text-purple-300 mb-8 text-lg">
          Begin your legendary adventure by crafting your first item!
        </p>
        <Link href="/create">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-8 py-4 text-xl shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-105">
            <Sparkles className="h-6 w-6 mr-3" />
            Craft First Item
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {items.map((item) => (
        <Card
          key={item.id}
          className={`
            bg-gradient-to-br from-slate-900/90 to-slate-800/90 
            border-2 ${rarityBorders[item.rarity as keyof typeof rarityBorders]}
            hover:border-purple-400/70 
            transition-all duration-300 hover:scale-[1.05] hover:rotate-1
            ${rarityGlow[item.rarity as keyof typeof rarityGlow]} 
            backdrop-blur-sm
            group
          `}
        >
          <CardContent className="p-6">
            <div className="relative mb-6 overflow-hidden rounded-xl">
              <Image
                src={item.image_url || "/placeholder.svg?height=200&width=200"}
                alt={item.name}
                width={200}
                height={200}
                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <Badge
                className={`
                  absolute top-3 right-3 
                  bg-gradient-to-r ${
                    rarityColors[item.rarity as keyof typeof rarityColors]
                  } 
                  text-white font-bold px-3 py-1 text-sm uppercase tracking-wide
                  shadow-lg
                `}
              >
                {item.rarity === "legendary" && (
                  <Sparkles className="h-3 w-3 mr-1" />
                )}
                {item.rarity}
              </Badge>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="font-bold text-white text-xl truncate group-hover:text-cyan-300 transition-colors">
                {item.name}
              </h3>
              <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">
                {item.description ||
                  "A mysterious item with unknown properties..."}
              </p>
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="text-cyan-300 border-cyan-400 bg-cyan-950/50 font-semibold px-3 py-1"
                >
                  {item.category}
                </Badge>
                <div className="flex items-center bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 px-3 py-1 rounded-full border border-yellow-500/30">
                  <Coins className="h-4 w-4 mr-1 text-yellow-400" />
                  <span className="font-bold text-yellow-300">
                    {item.price}
                  </span>
                </div>
              </div>
              <div className="bg-slate-700/50 px-3 py-2 rounded-lg border border-slate-600/50">
                <span className="text-slate-300 text-sm">Stack: </span>
                <span className="font-bold text-white">{item.quantity}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href={`/item/${item.id}`} className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-gradient-to-r from-cyan-900/50 to-cyan-800/50 border-cyan-500 text-cyan-300 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-cyan-700 hover:text-white hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 font-semibold transition-all duration-300"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Inspect
                </Button>
              </Link>
              <Link href={`/edit/${item.id}`} className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 border-emerald-500 text-emerald-300 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-700 hover:text-white hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30 font-semibold transition-all duration-300"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Enhance
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
