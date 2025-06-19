import { getInventoryItem } from "@/lib/api";
import ItemDetail from "@/components/item-detail";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  try {
    const { id } = await params;
    const item = await getInventoryItem(Number.parseInt(id));

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="outline"
                className="mb-4 border-purple-500 text-purple-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white hover:border-purple-400 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Inventory
              </Button>
            </Link>
          </div>

          <ItemDetail item={item} />
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
