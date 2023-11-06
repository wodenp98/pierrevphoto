import { AccordionShop } from "@/components/BoutiqueIdComponents/ShopAccordion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main>
      <section className="w-11/12 mt-6 mx-auto">
        <div className="flex flex-col md:items-center">
          <div className="lg:w-1/2  flex md:justify-center">
            <Skeleton className="object-cover bg-zinc-500 min-w-[300px] min-h-[300px] md:min-w-[500px] md:min-h-[500px]" />
          </div>

          <div className="lg:w-1/2 mt-3 lg:ml-6 h-full">
            <Skeleton className="text-3xl bg-zinc-500 w-full h-20" />
            <Skeleton className="text-sm bg-zinc-500 mt-6 text-gray-500" />
            <Skeleton className="mt-6 bg-zinc-500 w-full h-20" />
            <Skeleton className="object-cover mt-6 bg-zinc-500 h-20 w-full" />
          </div>
        </div>

        <div className="flex items-center justify-center mt-6">
          <AccordionShop />
        </div>
      </section>
    </main>
  );
}
