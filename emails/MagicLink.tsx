/* eslint-disable react/no-unescaped-entities */
// import {
//   Body,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Link,
//   Preview,
//   Text,
// } from "@react-email/components";

// export default function MagicLinkEmail({
//   url,
//   host,
// }: {
//   url: string;
//   host: string;
// }) {
//   return (
//     <Html>
//       <Head />
//       <Preview>Log in with this magic link</Preview>
//       <Body style={main}>
//         <Container style={container}>
//           <Heading style={h1}>Log in to {host}</Heading>

//           <Link
//             href={url}
//             target="_blank"
//             style={{
//               ...link,
//               display: "block",
//               marginBottom: "16px",
//             }}
//           >
//             Click here to log in with this magic link
//           </Link>

//           <Text
//             style={{
//               ...text,
//               color: "#ababab",
//               marginTop: "14px",
//               marginBottom: "16px",
//             }}
//           >
//             If you didn&apos;t try to login, you can safely ignore this email.
//           </Text>

//           <Text style={footer}>
//             <Link
//               href="https://hamedbahram.io"
//               target="_blank"
//               style={{ ...link, color: "#898989" }}
//             >
//               hamedbahram.io
//             </Link>
//           </Text>
//         </Container>
//       </Body>
//     </Html>
//   );
// }

// const main = {
//   backgroundColor: "#ffffff",
// };

// const container = {
//   paddingLeft: "12px",
//   paddingRight: "12px",
//   margin: "0 auto",
// };

// const h1 = {
//   color: "#333",
//   fontFamily:
//     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
//   fontSize: "24px",
//   fontWeight: "bold",
//   margin: "40px 0",
//   padding: "0",
// };

// const link = {
//   color: "#2754C5",
//   fontFamily:
//     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
//   fontSize: "14px",
//   textDecoration: "underline",
// };

// const text = {
//   color: "#333",
//   fontFamily:
//     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
//   fontSize: "14px",
//   margin: "24px 0",
// };

// const footer = {
//   color: "#898989",
//   fontFamily:
//     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
//   fontSize: "12px",
//   lineHeight: "22px",
//   marginTop: "12px",
//   marginBottom: "24px",
// };

// const code = {
//   display: "inline-block",
//   padding: "16px 4.5%",
//   width: "90.5%",
//   backgroundColor: "#f4f4f4",
//   borderRadius: "5px",
//   border: "1px solid #eee",
//   color: "#333",
// };

import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const MagicLinkEmail = ({
  url,
  host,
}: {
  url: string;
  host: string;
}) => {
  const previewText = `Connectez-vous à votre compte`;
  const imageUrl = `https://ci3.googleusercontent.com/mail-sig/AIorK4wr2PyS-oVhU6lvL18w5YN7vEq_OctuBULw3az770fYF0B9t8-ekDLCQyejf9EeSdJOqalmp8k`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-40 mx-auto p-20 w-465">
            <Heading className="text-black text-24 font-normal text-center p-0 my-30 mx-0">
              {previewText}
            </Heading>
            <Text className="text-black text-14 leading-24">Bonjour,</Text>
            <Text className="text-black text-14 leading-24">
              Nous utilisons ce bouton de connexion facile pour que vous n'ayez
              pas à vous souvenir ou à taper un autre long mot de passe.
            </Text>
            <Section>
              <Row>
                <Column align="center">
                  <Img src={imageUrl} width="80" height="80" />
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-24 mb-24">
              <Button
                className="bg-[#000000] px-5 py-3 rounded text-white text-12 font-semibold no-underline text-center"
                href={url}
              >
                Se connecter
              </Button>
            </Section>
            <Text className="text-black text-14 leading-24">
              or copy and paste this URL into your browser:{" "}
              <Link href={url} className="text-blue-600 no-underline">
                {url}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLinkEmail;
