import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../../utils/prisma/prisma";
import EmailProvider from "next-auth/providers/email";
import { CustomSendVerificationRequest } from "@/utils/sendgrid/send-verification-request";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({ identifier, url, provider }) {
        CustomSendVerificationRequest({
          identifier,
          url,
          provider,
        });
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
      };
    },
    jwt: async ({ token, user, session, trigger }) => {
      if (trigger === "update" && session?.name) {
        token.name = session.name;

        const newName = await prisma.user.update({
          where: { id: token.id as string },
          data: { name: token.name },
        });

        return { ...token, name: newName.name };
      }
      if (user) {
        return { ...token, id: user.id };
      }

      return token;
    },
  },

  pages: {
    signIn: "/connexion",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
