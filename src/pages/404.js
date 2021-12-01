import React from "react"
import { Layout } from "../components/layout"

import { SEO } from "../components/seo"

export default () => {
  return (
    <Layout>
      <SEO pagetitle="ページが見つかりません" />
      <h1>お探しのページは見つかりませんでした</h1>
    </Layout>
  )
}
