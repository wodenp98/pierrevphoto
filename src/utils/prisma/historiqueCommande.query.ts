// export const ordersWithArticles = await prisma.order.findMany({
//   where: {
//     userId: session?.user.id,
//   },
//   include: {
//     articles: {
//       select: {
//         id: true,
//         name: true,
//         price: true,
//         imageUrl: true,
//         description: true,
//       },
//     },
//   },
//   orderBy: {
//     orderedAt: "desc",
//   },
// });
