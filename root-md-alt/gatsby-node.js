/**
 * generate pages on the fly
 *
 */
const path = require("path")

/**
 * @desc use the file name to freate the slug
 * generate slugs
 */
module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // where just interested in the MarkdownRemark types
  if (node.internal.type === "MarkdownRemark") {
    // get the slug
    const slug = path.basename(node.fileAbsolutePath, ".md")

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

/**
 * @desc create a page useing the slug based on a template
 */
module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/blog.js")

  // Get path to template
  // Get markdown data
  // Create new pages

  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  res.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    })
  })
}
