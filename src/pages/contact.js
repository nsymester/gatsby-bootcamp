import React from "react"

import Layout from "../components/layout"
import Head from "../components/head"

const ContactPage = () => {
  return (
    <Layout>
      <Head title="Contact" />
      <h1>Contact Me</h1>
      <h2>Details</h2>
      <p>Phone: 1234567890</p>
      <p>Email: abc@defg.com</p>
      <a
        href="http://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
    </Layout>
  )
}

export default ContactPage
