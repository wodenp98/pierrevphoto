"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const windowReload = () => {
    window.location.reload();
  };

  return (
    <html>
      <body>
        <main className="h-screen flex justify-center items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl uppercase text-center">
              Something went wrong!
            </h2>
            <div className="flex mt-6 space-x-4">
              <Button onClick={windowReload}>Reset</Button>
              <Link href="/">
                <Button variant={"secondary"}>Home</Button>
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
