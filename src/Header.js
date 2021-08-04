import React, { useState, useEffect } from "react";

function Header() {
  const [isLinkElementLoaded, setLinkElementLoaded] = useState(false)

    useEffect(() => {
    const linkElement = document.createElement("link");
      linkElement.setAttribute("rel", "stylesheet");
      linkElement.setAttribute("type", "text/css");
      linkElement.setAttribute(
        "href",
        "https://fonts.googleapis.com/icon?family=Material+Icons"
      );
      document.head.appendChild(linkElement);
      setLinkElementLoaded(true)
    }, []);

    return (
      <>
        {isLinkElementLoaded}
      </>
    )
}

export default Header;
