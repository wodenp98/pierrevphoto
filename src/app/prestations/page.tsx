import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function Prestations() {
  return (
    <main className="flex 1">
      <div className="container relative">
        <section className="flex flex-col items-center justify-center mt-8 mb-12">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="text-center text-4xl">
                Mes prestations
              </CardTitle>
              <CardDescription className="text-center">
                Pour toutes informations supplémentaires,
                <Link
                  href="/contact"
                  className="pl-1 hover:underline hover:text-primary"
                >
                  contactez-moi
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <h1 className="text-2xl font-bold mb-4">Portrait</h1>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10/12"></TableHead>

                      <TableHead>Solo</TableHead>
                      <TableHead className="text-right">Famille</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">5 photos</TableCell>

                      <TableCell>90€</TableCell>
                      <TableCell className="text-right">100€</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">10 photos</TableCell>
                      <TableCell>110€</TableCell>
                      <TableCell className="text-right">120€</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">20 photos</TableCell>
                      <TableCell>180€</TableCell>
                      <TableCell className="text-right">190€</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">30 photos</TableCell>
                      <TableCell>210€</TableCell>
                      <TableCell className="text-right">220€</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <Separator />
              <div className="flex flex-col items-center mb-6 mt-6">
                <h1 className="text-2xl font-bold mb-4">Événementiel</h1>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10/12"></TableHead>

                      <TableHead className="text-right">Prix</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Demi-journée
                      </TableCell>

                      <TableCell>500€</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Journée</TableCell>
                      <TableCell>800€</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <Separator />
              <div className="flex flex-col items-center mb-6 mt-6">
                <h1 className="text-2xl font-bold mb-4">Sport</h1>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10/12"></TableHead>

                      <TableHead className="text-right">Prix</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Demi-journée
                      </TableCell>

                      <TableCell className="text-right">800€</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Journée</TableCell>
                      <TableCell>1500€</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <div className="flex flex-col items-center mt-8">
                <p className="text-sm text-center">
                  Prix à titre indicatif, un devis sera fourni avant chaque
                  prestation
                </p>
                <span className="text-sm mt-8">Siret: 90766462700029</span>
              </div>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}
