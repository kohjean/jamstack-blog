import React from "react"
import { Layout } from "../components/layout"

import { Seo } from "../components/seo"

export default function NotFound({ location }) {
  return (
    <Layout>
      <Seo pagetitle="ページが見つかりません" pagepath={location.pathname} />
      <h1>お探しのページは見つかりませんでした</h1>
    </Layout>
  )
}
