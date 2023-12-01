import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";

export default function Loading() {
  return (
    <section className="flex flex-col items-center mt-20">
      <Tabs defaultValue="login" className="w-11/12 lg:w-8/12">
        <TabsList className="grid w-full h-10 grid-cols-2">
          <Skeleton className="w-full h-full bg-zinc-500" />
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader className="h-20">
              <Skeleton className="w-1/3 h-full bg-zinc-500" />
            </CardHeader>
            <CardContent className="h-96">
              <Skeleton className="w-full h-full bg-zinc-500" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
