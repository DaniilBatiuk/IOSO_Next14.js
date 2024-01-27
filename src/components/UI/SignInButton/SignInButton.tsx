"use client";

import { LINKS } from "@/utils/config/links";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

type SignInButtonProp = {
  setLinkActiveUnderLine: React.Dispatch<React.SetStateAction<number>>;
  linkActiveUnderLine: number;
  menuActive: boolean;
  menuOpen: () => void;
};

const SignInButton: React.FC<SignInButtonProp> = ({
  setLinkActiveUnderLine,
  linkActiveUnderLine,
  menuActive,
  menuOpen,
}: SignInButtonProp) => {
  const { data: session } = useSession();

  return (
    <>
      {session && session.user ? (
        <>
          <li
            className={
              linkActiveUnderLine === 1 && menuActive === false
                ? "header__item__active"
                : "header__item"
            }
          >
            <Link
              href={`/Profile/${session?.user.id}`}
              onClick={() => {
                setLinkActiveUnderLine(1);
                if (menuActive) {
                  menuOpen();
                }
              }}
            >
              Profile
            </Link>
          </li>
          <li
            className="header__item__sign-up"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </li>
        </>
      ) : (
        <>
          <li
            className={
              linkActiveUnderLine === 3 && menuActive === false
                ? "header__item__active"
                : "header__item"
            }
          >
            <Link
              href={LINKS.SignIn}
              onClick={() => {
                setLinkActiveUnderLine(3);
                if (menuActive) {
                  menuOpen();
                }
              }}
            >
              Sign In
            </Link>
          </li>
          <li className="header__item__sign-up">
            <Link href={LINKS.SignUp}>Sign Up</Link>
          </li>
        </>
      )}
    </>
  );
};

export default SignInButton;
