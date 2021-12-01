import React from "react"
import { Helmet } from "react-helmet"

export const SEO = () => {
  return (
    <Helmet>
      <html lang="ja" />
      <title>Blog</title>
      <meta name="description" content="技術ブログ" />
    </Helmet>
  )
}
