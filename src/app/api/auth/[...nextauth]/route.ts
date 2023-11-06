import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../../../prisma/client";
import Email from "next-auth/providers/email";
import { CustomsendVerificationRequest } from "../sendEmail/route";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),

        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },

      sendVerificationRequest({ identifier, url, provider }) {
        CustomsendVerificationRequest({
          identifier,
          url,
          provider,
        });
      },
      from: process.env.EMAIL_FROM,
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
