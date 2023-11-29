import { resend } from "@/lib/resend/resend";
import MagicLinkEmail from "../../../emails/MagicLink";
import { SendVerificationRequestParams } from "next-auth/providers/email";

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url } = params;
  const { host } = new URL(url);

  try {
    await resend.emails.send({
      from: "contact@pierrevphotographie.com",
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      react: MagicLinkEmail({ url, host }),
    });
  } catch (error) {
    throw new Error("Failed to send the verification Email.");
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Connectez-vous à ${host}\n${url}\n\n`;
}
