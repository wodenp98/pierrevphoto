import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main>
      <h1 className="flex justify-center my-6 text-4xl uppercase">Boutique</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-5/6 mx-auto mt-6">
        {[...Array(9)].map((_, index) => (
          <Skeleton
            key={index}
            className="border rounded-md shadow bg-zinc-500 h-full w-full"
          >
            <div className="h-96 w-full rounded-t-md" />
          </Skeleton>
        ))}
      </section>
    </main>
  );
}
