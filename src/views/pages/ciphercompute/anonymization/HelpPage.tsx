import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import anonymizationHelper from "../../../../assets/md/anonymization_help.md"
import BackArrow from "../../../../stories/cosmian/BackArrow/BackArrow"
import "./help-page.less"

const HelpPage = (): JSX.Element => {
  const [helpText, setHelpText] = useState("")

  useEffect(() => {
    fetch(anonymizationHelper)
      .then((res) => res.text())
      .then((text) => setHelpText(text))
  })

  return (
    <div className="help-page" style={{ padding: 30, maxWidth: 1440, margin: "0 auto" }}>
      <BackArrow text="Back" url={-1} style={{ paddingLeft: 0 }} />
      <div className="help-box">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{helpText}</ReactMarkdown>
      </div>
    </div>
  )
}

export default HelpPage
