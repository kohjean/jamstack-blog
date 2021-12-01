import React from "react"

import { Header } from "./header"
import { Footer } from "./footer"

import "./layout.css"

import "@fortawesome/fontawesome-svg-core/style.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
