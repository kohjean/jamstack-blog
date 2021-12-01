import React from "react"
import { Layout } from "../components/layout"

import { SEO } from "../components/seo"

export default ({location}) => {
  return (
    <Layout>
      <SEO pagetitle="ページが見つかりません" 
      pagepath={location.pathname}/>
      <h1>お探しのページは見つかりませんでした</h1>
    </Layout>
  )
}
