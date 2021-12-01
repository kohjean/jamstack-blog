import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export const SEO = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
          title
          lang
        }
      }
    }
  `)

  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang} />
      <title>{data.site.siteMetadata.title}</title>
      <meta name="description" content={data.site.siteMetadata.description} />
    </Helmet>
  )
}
