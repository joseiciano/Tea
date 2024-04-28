import React from "react";
import { Cairo_Play, Leckerli_One } from "next/font/google";
import Link from "next/link";

const logoFont = Leckerli_One({ subsets: ["latin"], weight: "400" });

function Logo() {
  return (
    <div className={logoFont.className}>
      <Link href="/">
        <h1 className="text-2xl">Espresso</h1>
      </Link>
    </div>
  );
}

export default Logo;
