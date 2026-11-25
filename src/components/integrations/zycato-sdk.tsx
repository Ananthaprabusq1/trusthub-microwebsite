"use client";

import { useEffect } from "react";

const SDK_URL = "https://zycato.stakflo.io/zycato-sdk.min.js";
const API_BASE = "https://zycato.stakflo.io/api-privacy-backend-endpoint";
// const SITE_KEY: string | undefined =
//   process.env.NEXT_PUBLIC_ZYCATO_DATA_SITE_KEY;
const SITE_KEY = process.env.NEXT_PUBLIC_ZYCATO_DATA_SITE_KEY?.trim();

export function ZycatoSDK(): null {
  useEffect(() => {
    if (!SITE_KEY) {
      console.error("Zycato site key is missing");
      return;
    }

    // Prevent duplicate SDK injection
    if (document.querySelector(`script[src="${SDK_URL}"]`)) {
      return;
    }

    const script: HTMLScriptElement = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.setAttribute("data-site-key", SITE_KEY);
    script.setAttribute("data-api-base", API_BASE);

    document.head.appendChild(script);
  }, []);

  return null;
}

export default ZycatoSDK;