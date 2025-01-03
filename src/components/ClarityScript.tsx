"use client";

import { useEffect } from "react";
import { clarity } from "react-microsoft-clarity";

const ClarityScript = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      clarity.init(process.env.TRACKING_ID as string);
      console.log("Microsoft Clarity initialized in production");
    } else {
      console.log("Microsoft Clarity is disabled in development");
    }
  }, []);

  return null;
};

export default ClarityScript;