# Great Gatsby Bootcamp

## Part 1

### Challenge 1

Goal: Create an about page and a contact page

1. Create an about page. Include a page title and bio.
2. Create a contact page. Include a page title and contact details.
3. Test your work!

### Challenge 2

Goal: Add a couple of Links to the site

1. On contactpage, Link to twitter profile
2. On about pge, Link to contact page
3. Test you work!

### Challenge 3

Goal: Create a shared page header

1. Setup a header component

   - include site title and links to all four pages

2. Render header at top of all site pages

3. Test your work!

### Challenge 4

Goal: Create a Layout template

1. Setup a layput component
   - move Header and Footer in there
   - call props to render children in there
2. Remove Header and Footer from other pages
3. Call Layout in all pages
4. Test your work!

### Notes 7

Install scss plugin

```bash
npm i gatsby-plugin-sass node-sass
```

## Part 2

### Gatsby Data with GraphQL

GraphiQL IDE for exploring a GraphQL api
http://localhost:8000/___graphql

GraphQL operations:

1. Queries
2. Mutations
3. Subscriptions

We'll be using Queries to access data from the external sources.

Start defining our query;

```
query {
    site {
         siteMetadata {
             title
             author
         }
    }
}
```

### Challenge 5

Goal: Run another GraphQL query

1. Use the GraphiQL to fetch the author 

2. Update the footer component to display the dynamic author value

3. Test your work!

### #9 GraphQL Playground

GraphQL Playground IDE, an alternative to exploring the GraphQL api.

Modify environment

```bash
npm i -D env-cmd
```

modify the develop script in package.json

```json
"develop": "env-cmd .env.development gatsby develop"
```

`env-cmd .env.development` loads the environment in 

`gatsby develop` runs the server

Refresh `localhost:8000/___graphql`to see a completely new interface._

### #10 Sourcing Content from the File System

Create posts.

Each post has; 

- front matter

```markdown
---
title: "The Great Gatsby Bootcamp"
date: "2019-05-23"
---
```

- content

```markdown
I just launched a new bootcamp!

## Topics Covered

1. Gatsby
2. GraphQL
3. React
```

Tell gatsby we're sourcing content from an external source.

Go over to https://www.gatsbyjs.org/plugins

and search for source-filesystem

shutdown server

```bash
npm i gatsby-source-filesystem
```

now add reference to gatsby-config.js to access raw files

```json
plugins: [
    ...,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
]
```

edges - form pagination

in playground run:

```json
query {
    allFile{
    edges{
      node{
          name
        extension
        dir
      }
    }
  }
}
```

we can see all files including the markdown files we want to transform

### #11 Working with Markdown Posts

to transform markdown install

shut down server

```bash
npm i gatsby-transformer-remark
```

remark is a standalone library for passing markdown files

we're using a gatsby plugin to run the library behind the scenes

now add reference to gatsby-config.js 

```json
plugins: [
    'gatsby-transformer-remark'
]
```

to get all markdown files.

in playground:

```json
query {
  allMarkdownRemark{
    edges{
      node{
        id
          frontmatter{
              title 
          date
        }
        html
        excerpt
      }
    }
  }
}
```

### Challenge 6

Goal: Show list of posts on blog page

1. Query the title and date for each post in blog component

   1. console.log to see structure

2. Render an ol on the PAGE

3. Render a li with a nested h2 (title) and p (date) for each post

   1. forgot how to do this? then google search "render array of objects react"

4. Test your work!

### #12 Generating Slugs for Posts

Goal 1 - Generate a slug for each post

    gatsby.md -> gatsby -> /blog/gatsby or /gatsby

Goal 2 - Generate the blog post page template

Goal 3 - Generate a new page for each plate using Goals 1 & 2



#### Goal 1 - Generate a slug for each post

Create file: `gatsby-node.js`in the root directory

Go to https://www.gatsbyjs.org/docs/api-reference

Looking for Gatsby Node APIs

Look for onCreateNode

(Node is a data structure for storing your gatsby data)

```node
module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
}
```

We need just the file name of a path.

We can use the nodejs built in module `path`

Go to: https://nodejs.org/dist/latest-v10.x/docs/api/path.html

...and we're looking for `path.basename(path[,ext])`

to do the following:

```node
path.basename('/foo/bar/baz/asdf/quux.html');
// Returns: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// Returns: 'quux'

const slug = path.basename(node.fileAbsolutePath, ".md")
```

to create the slug by creating a node field

```node
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
```

### #13 Dynamically Generating Pages

#### Goal 2 - Generate the blog post page template

create `src/templates`folder

create in there `blog.js`

add the following:

```javascript
import React from "react"

import Layout from "../components/layout"

const Blog = () => {
  return <Layout>This is the blog template</Layout>
}

export default Blog
```

#### Goal 3 - Generate a new page for each plate using Goals 1 & 2

within createPages we need to:

1. Get path to template

2. Get markdown data

3. Create new pages



### Challenge 7

Goal: Link to blog posts

1. Fetch the slug fo rthe posts

2. Use slug to generatea link to the post pages

3. Test your work!



### #14 Rendering Post Data in Blog Template

use `playground` to get data by slug

```json
query (
  $slug: String
) {
	markdownRemark (
    fields: {
      slug: {
        eq: $slug
      }
    }
  ) {
		frontmatter {
  		title
  	}
 	} 
}
```

 passing in 

```json
{
    "slug":"react"
}
```

returns

```json
{
  "data": {
    "markdownRemark": {
      "frontmatter": {
        "title": "The Great Gatsby Bootcamp"
      }
    }
  }
}
```

### #15 Adding Images to Posts

get images from `links.mead.io/grasspic`

run

```bash
npm i gatsby-plugin-sharp
```

this allows us to use the sharp library n the gatsby site

used for processing images

```bash
npm i gatsby-remark-images
```

used for processing images inside remark



```bash
npm i gatsby-remark-relative-images
```

source images relative to the markdown file



Organise 



### #16 Getting Started with Contentful



Go to [https://www.contentful.com/](https://www.contentful.com/) and open a free account

click explore content model

we're not going to use the example project

from the menu click (top left)

click `+ Create space` (a new project)

fill in the project name

and you're creating an empty space



Content model tab - 

- Create content type

  - Title - Text

  - Slug - Text

  - Published Date - Date & time

  - Body - Rict text

- Click save

We can now create content based off of the content model



Content tab - 

- Click on Content

- click on "Add Blog post"

- fill in details

- click  publish

- click content tab, you should now see it on the content page

- create another blog post



To get access to this using Gatsby we need to setup a gatsby plugin

on [https://www.gatsbyjs.org/plugins/](https://www.gatsbyjs.org/plugins/) search for `contentful`

we're looking for `gatsby-source-contentful`

for other cms's, we would look for `gatsby-source-...`.

e.g.: wordpress - `gatsby-source-wordpress`



install the plugin

```bash
npm install --save gatsby-source-contentful
```

add the new plugin into the `gatsby-config.js` file

because it's going to have options we set it up using `resolve`

```json
{
    resolve: 'gatsby-source-contentful',
    options: {
        spaceId: ''
        accessToken: ''        
    }
}
```

To get these details we go over to the Contentful Web App, click on 

`settings -> API key`



Click on the `Example Key 1` which was already created for us.

There we'll see the 

- Space ID

- Content Delivery API - access token

to stop these values sneaking into our code we'll use environment variables, setup in `.env.development`

start server

head over to `playground`to take a look at the new queries we have access to.

Click on `docs`and you'll see the new queries.

```json
query {
  allContentfulBlogPost {
    edges {
      node {
        title
        slug
        publishedDate
      }
    }
  }
}
```



### #17 Rendering Contentful Posts

Format date usung the [https://momentjs.com](https://momentjs.com) format. Go to Docs -> Display



### Challenge 8

Goal: Render Contenful Posts

1. Swap out the markdown query with the contentful query

2. Update the component to render the new data 

   1. Don't worry if the link links to a non-existant page

3. Test your work!



### #18 Dynamic Pages from Contentful

to be render rich content use the following:

```bash
npm i @contentful/rich-text-react-renderer
```

this takes json data and spits out react components



### #19 404 Pages and React Helmet

For the 404 page this will show another page.

But in production code it will show the 404 page



To work with the header of a document use `Helmet`

Go over to https://www.gatsbyjs.org/plugins

and search for `helmet`



swap out the favicon from the static directory



### #20 Deploying Your Gatsby Site


