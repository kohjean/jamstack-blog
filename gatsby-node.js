const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogresult = await graphql(`
    query {
      allMicrocmsBlog(sort: { order: DESC, fields: publishDate }) {
        edges {
          node {
            content
            id
            eyecatch {
              height
              url
              width
            }
            slug
          }
        }
      }
    }
  `)

  if (blogresult.errors) {
    reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`)
    return
  }

  blogresult.data.allMicrocmsBlog.edges.forEach(element => {
    console.log(element)
    createPage({
      path: `/blog/post/${element.node.slug}`,
      component: path.resolve(`./src/templates/blogpost-template.js`),
      context: {
        id: element.node.id,
      },
    })
  })
}
