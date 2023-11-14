import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

  return (
    <main>
      <div className="relative h-screen">
        <Skeleton className="w-full h-full absolute inset-0 bg-zinc-500 rounded-none" />
        <div className="absolute bottom-0 left-0 w-full flex justify-center p-14 z-10">
          <Button className="uppercase text-xl py-2 px-4">Boutique</Button>
        </div>
      </div>
    </main>
  );
}
