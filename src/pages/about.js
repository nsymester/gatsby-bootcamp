import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

const AboutPage = () => {
  return (
    <Layout>
      <Head title="About" />
      <h1>About Me</h1>
      <h2>Bio</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolore
        saepe debitis sed itaque, rem quam amet blanditiis sapiente aspernatur
        officiis natus architecto vero quos harum in possimus porro consequatur?
      </p>
      <h2>Contact</h2>
      <p>
        <Link to="/contact">Contact Me</Link>
      </p>
    </Layout>
  )
}

export default AboutPage
