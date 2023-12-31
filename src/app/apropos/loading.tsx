import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="relative h-[calc(100vh-97.5px)]">
      <Skeleton className="w-full h-full absolute inset-0 bg-zinc-500 rounded-none" />
    </main>
  );
}
