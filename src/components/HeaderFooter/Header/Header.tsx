"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { ICONS } from "@/utils/config/icons";
import { LINKS } from "@/utils/config/links";

import "@/styles/Header.scss";

import { SignInButton } from "@/components";
import { updateQuizStatusEnded } from "@/utils/lib/actions";

export const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [height, setHeight] = useState(0);

  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [linkActiveUnderLine, setLinkActiveUnderLine] = useState<number>(0);

  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    updateQuizStatusEnded();
  }, []);

  useEffect(() => {
    setIsVisible(pathname === "/");

    if (
      (!pathname.includes("Profile") && linkActiveUnderLine === 1) ||
      (pathname !== "/Trends" && linkActiveUnderLine === 2) ||
      (pathname !== "/SignIn" && linkActiveUnderLine === 3)
    ) {
      setLinkActiveUnderLine(0);
    }
  }, [pathname]);

  useEffect(() => {
    if (isVisible) {
      const wrapperElement = document.getElementById("wrapper");

      if (wrapperElement !== null) {
        const height = wrapperElement.getBoundingClientRect().height;
        setHeight(height);
      }
    }
  }, [isVisible]);

  const menuOpen = () => {
    document.documentElement.classList.toggle("menu-open");
    setMenuActive(prev => !prev);
  };

  return (
    <div className="header">
      {menuActive && (
        <div className="header__dark" onClick={() => setMenuActive(prev => !prev)}></div>
      )}
      {!isVisible && (
        <style>{`
          .header:after {
            border-bottom: none;
          }
          .header{
            background-color:rgba(255, 255, 255, 0.1);
            padding-bottom:9px;
          }
        `}</style>
      )}

      <div className="header__container">
        <a href="/" className="header__logo">
          IOSO
        </a>
        <nav className="header__nav">
          <div className="header__body">
            <ul className="header__list">
              <li
                className={
                  linkActiveUnderLine === 2 && menuActive === false
                    ? "header__item__active"
                    : "header__item"
                }
              >
                <Link
                  href={LINKS.Trends}
                  onClick={() => {
                    setLinkActiveUnderLine(2);
                    if (menuActive) {
                      menuOpen();
                    }
                  }}
                >
                  Trends
                </Link>
              </li>
              <SignInButton
                menuOpen={menuOpen}
                menuActive={menuActive}
                linkActiveUnderLine={linkActiveUnderLine}
                setLinkActiveUnderLine={setLinkActiveUnderLine}
                session={session}
              />
            </ul>
          </div>
        </nav>
        <div className="header__item__block-min">
          {!session?.user.id && (
            <div className="header__item__sign-up-min">
              <Link href={LINKS.SignUp}>Sign Up</Link>
            </div>
          )}
          <button className="icon-menu" type="button" onClick={menuOpen}>
            {ICONS.MenuOpen()}
            {ICONS.close2({ className: "svg2" })}
          </button>
        </div>
        {isVisible && (
          <div className="lines">
            <div className="lines__line-1" style={{ height: `${height}px` }}></div>
            <div className="lines__line-2" style={{ height: `${height}px` }}></div>
            <div className="lines__line-3" style={{ height: `${height}px` }}></div>
            <div className="lines__line-4" style={{ height: `${height}px` }}></div>
            <div className="lines__line-5" style={{ height: `${height}px` }}></div>
          </div>
        )}
      </div>
    </div>
  );
};
