import lottie from "lottie-web"
import React, { useEffect } from "react"
import myAnim from "../../assets/logo-anim-lottie.json" // TODO: import cosmian logo animation
import "./animated-logo.less"

export interface AnimatedLogoProps {
  /**
   * Is it a blank fullpage?
   */
  fullpage?: boolean
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ fullpage }) => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#animation") as Element,
      animationData: myAnim,
      renderer: "svg", // "canvas", "html"
      loop: true, // boolean
      autoplay: true, // boolean
    })
  }, [])
  const myClass = ["animated-logo"]
  if (fullpage) {
    myClass.push("fullpage")
  }
  return (
    <div className={myClass.join(" ")}>
      <div id="animation" />
    </div>
  )
}

// default propos
AnimatedLogo.defaultProps = {
  fullpage: false,
}
