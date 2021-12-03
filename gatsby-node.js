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
          next {
            slug
            title
          }
          previous {
            slug
            title
          }
        }
        group(field: category___categorySlug) {
          fieldValue
          totalCount
        }
      }
      allMicrocmsCategory {
        nodes {
          category
          categoryId
          categorySlug
        }
      }
    }
  `)

  if (blogresult.errors) {
    reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`)
    return
  }

  blogresult.data.allMicrocmsBlog.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `/blog/post/${node.slug}`,
      component: path.resolve(`./src/templates/blogpost-template.js`),
      context: {
        id: node.id,
        next,
        previous,
      },
    })
  })

  const blogPostsPerPage = 6
  const blogPosts = blogresult.data.allMicrocmsBlog.edges.length
  const blogPages = Math.ceil(blogPosts / blogPostsPerPage)

  Array.from({ length: blogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: path.resolve(`./src/templates/blog-template.js`),
      context: {
        skip: blogPostsPerPage * i,
        limit: blogPostsPerPage,
        currentPage: i + 1,
        isFirst: i + 1 === 1,
        isLast: i + 1 === blogPages,
      },
    })
  })

  blogresult.data.allMicrocmsBlog.group.forEach(node => {
    const catPostsPerPage = 6
    const catPosts = node.totalCount
    const catPages = Math.ceil(catPosts / catPostsPerPage)

    Array.from({ length: catPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/cat/${node.fieldValue}/`
            : `/cat/${node.fieldValue}/${i + 1}`,
        component: path.resolve(`./src/templates/cat-template.js`),
        context: {
          catid: blogresult.data.allMicrocmsCategory.nodes.find(
            n => n.categorySlug === node.fieldValue
          ).categoryId,
          catname: blogresult.data.allMicrocmsCategory.nodes.find(
            n => n.categorySlug === node.fieldValue
          ).category,
          catslug: node.fieldValue,
          skip: catPostsPerPage * i,
          limit: catPostsPerPage,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === catPages,
        },
      })
    })
  })
}
