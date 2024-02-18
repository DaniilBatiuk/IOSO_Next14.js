import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LINKS } from "@/utils/config/links";

import styles from "@/styles/SignIn.module.scss";

import SignInBack from "@/../public/SignInBack.png";
import SignInFront from "@/../public/SignInFront.png";
import { SignInForm, ThemeWrapper } from "@/components";

export const metadata: Metadata = {
  title: "Sign in",
};

interface SignInProps {
  searchParams: {
    callbackUrl?: string;
  };
}

export default function SignIn({ searchParams }: SignInProps) {
  return (
    <ThemeWrapper>
      <div className={`${styles.signIn}`}>
        <Image
          src={SignInBack}
          alt="SignInBack"
          fill={true}
          priority={true}
          placeholder="blur"
          className={`${styles.signIn__photo}`}
        />
        <div className={`${styles.signIn__container}`}>
          <div className={`${styles.signIn__block}`}>
            <div className={`${styles.signIn__left}`}>
              <Image
                src={SignInFront}
                alt="SignInFront"
                width={1154}
                height={807}
                priority={true}
                placeholder="blur"
                className={`${styles.signIn__picture}`}
              />
            </div>
            <div className={`${styles.signIn__right}`}>
              <div className={`${styles.signIn__title}`}>Sign In</div>
              <SignInForm callbackUrl={searchParams.callbackUrl} />
              <div className={`${styles.form__undertext}`}>
                Or don’t have an account? please register&nbsp;
                <span>
                  <Link href={LINKS.SignUp}>here</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
