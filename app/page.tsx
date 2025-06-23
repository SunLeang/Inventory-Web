import { getInventoryItems, getInventoryStats } from "@/lib/api";
import InventoryGrid from "@/components/inventory-grid";
import { Button } from "@/components/ui/button";
import { Plus, Package, Sword, Shield } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  try {
    const [items, stats] = await Promise.all([
      getInventoryItems(),
      getInventoryStats(),
    ]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Package className="h-10 w-10 text-purple-400" />
                Legendary Inventory
              </h1>
              <p className="text-purple-200">
                Manage your epic collection of items
              </p>
            </div>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                <Plus className="h-5 w-5 mr-2" />
                Add New Item
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 p-6 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Items</p>
                  <p className="text-white text-2xl font-bold">{stats.total}</p>
                </div>
                <Package className="h-8 w-8 text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 p-6 rounded-lg shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Weapons</p>
                  <p className="text-white text-2xl font-bold">
                    {stats.weapons}
                  </p>
                </div>
                <Sword className="h-8 w-8 text-red-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 p-6 rounded-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Armor</p>
                  <p className="text-white text-2xl font-bold">{stats.armor}</p>
                </div>
                <Shield className="h-8 w-8 text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 p-6 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Consumables</p>
                  <p className="text-white text-2xl font-bold">
                    {stats.consumables}
                  </p>
                </div>
                <Package className="h-8 w-8 text-purple-200" />
              </div>
            </div>
          </div>

          {/* Inventory Grid */}
          <InventoryGrid items={items} />
        </div>
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Failed to load inventory
          </h1>
          <p className="text-purple-200">
            Make sure the backend server is running
          </p>
        </div>
      </div>
    );
  }
}
