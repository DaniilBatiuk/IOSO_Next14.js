"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "@/styles/Footer.module.scss";

export const Footer: React.FC = () => {
  const [displayActive, setDisplayActive] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    pathname === "/SignIn" || pathname === "/SignUp"
      ? setDisplayActive(false)
      : setDisplayActive(true);
  }, [pathname]);

  return (
    <footer className={`${styles.end__contact}`}>
      {!displayActive && (
        <style>{`
          footer {
            display:none !important;
          }

        `}</style>
      )}

      <ul className={`${styles.end__iconlist}`}>
        <li className={`${styles.end__icon}`}>
          <a href="https://github.com/DaniilBatiuk" target="_blank" rel="noreferrer">
            {ICONS.Github()}
          </a>
        </li>
      </ul>
      <div className={`${styles.end__end}`}>
        <div className={`${styles.end__year}`}>2023 IOSO</div>
        <div className={`${styles.end__creator}`}>Created by Daniil Batiuk</div>
      </div>
    </footer>
  );
};
