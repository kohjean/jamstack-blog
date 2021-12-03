import React from "react"
import { graphql, Link } from "gatsby"
import { Layout } from "../components/layout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faFolderOpen } from "@fortawesome/free-regular-svg-icons"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

import Imgix from "react-imgix"

import { Seo } from "../components/seo"
import { convert } from "html-to-text"

export default function BlogPost({ data, pageContext, location }) {
  return (
    <Layout>
      <Seo
        pagetitle={data.microcmsBlog.title}
        pagedesc={`${convert(data.microcmsBlog.content).slice(0, 70)}…`}
        pagepath={location.pathname}
      />
      <div className="eyecatch">
        <figure>
          <Imgix
            src={data.microcmsBlog.eyecatch.url}
            sizes="(max-width: 785px) 100vw, 785px"
            alt="アイキャッチ画像の説明"
          />
        </figure>
      </div>
      <article className="content">
        <div className="container">
          <h1 className="bar">{data.microcmsBlog.title}</h1>
          <aside className="info">
            <time dateTime="XXXX-XX-XX">
              <FontAwesomeIcon icon={faClock} />
              {data.microcmsBlog.publishDate}
            </time>
            <div className="cat">
              <FontAwesomeIcon icon={faFolderOpen} />
              <ul>
                {data.microcmsBlog.category.map(cat => (
                  <li className={cat.categorySlug} key={cat.id}>
                    <Link to={`/cat/${cat.categorySlug}/`}>{cat.category}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="postbody">
            <div
              dangerouslySetInnerHTML={{
                __html: `${data.microcmsBlog.content}`,
              }}
            />
          </div>
          <ul className="postlink">
            {pageContext.next && (
              <li className="prev">
                <Link to={`/blog/post/${pageContext.next.slug}/`} rel="prev">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>{pageContext.next.title}</span>
                </Link>
              </li>
            )}
            {pageContext.previous && (
              <li className="next">
                <Link to={`/blog/post/${pageContext.previous.slug}`} rel="next">
                  <span>{pageContext.previous.slug}</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    microcmsBlog(id: { eq: $id }) {
      title
      publishDate(formatString: "YYYY/MM/DD/")
      content
      category {
        category
        categorySlug
        id
      }
      eyecatch {
        url
      }
    }
  }
`
