"use client";
import SignInButton from "@/components/UI/SignInButton/SignInButton";
import { LINKS } from "@/utils/config/links";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../Header/Header.scss";

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [height, setHeight] = useState(0);

  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [linkActiveUnderLine, setLinkActiveUnderLine] = useState<number>(0);

  const pathname = usePathname();
  const { data: session } = useSession();

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
    const wrapperElement = document.getElementById("wrapper");

    if (wrapperElement !== null) {
      const height = wrapperElement.getBoundingClientRect().height + 200;
      setHeight(height);
    }
  }, []);

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
              <li className="header__item">
                <Link href="/Group/1">Group</Link>
              </li>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="svg1"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 6.001h18m-18 6h18m-18 6h18"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="svg2"
            >
              <path
                fill="currentColor"
                d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
              />
            </svg>
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
export default Header;
