import Head from "next/head";
import ContactForm from "../components/contact/contact-form";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Send me your messages" />
      </Head>
      <ContactForm />
    </>
  );
}
