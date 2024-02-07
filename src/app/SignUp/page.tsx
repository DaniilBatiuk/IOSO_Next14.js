import SignUpBack from "@/../public/SignUpBack.png";
import SignUpFront from "@/../public/SignUpFront.png";
import { SignUpForm, ThemeWrapper } from "@/components";
import styles from "@/styles/SignIn.module.scss";
import { LINKS } from "@/utils/config/links";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <ThemeWrapper>
      <div className={`${styles.signIn}`}>
        <Image
          src={SignUpBack}
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
                src={SignUpFront}
                alt="SignInFront"
                width={1154}
                height={807}
                priority={true}
                placeholder="blur"
                className={`${styles.signIn__picture}`}
                style={{ filter: "brightness(80%)" }}
              />
            </div>
            <div className={`${styles.signIn__right}`}>
              <div className={`${styles.signIn__title}`}>Sign Up</div>
              <SignUpForm />
              <div className={`${styles.form__undertext}`}>
                Or do have an account? please register&nbsp;
                <span>
                  <Link href={LINKS.SignIn} style={{ color: "rgba(255, 244, 84, 1)" }}>
                    here
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
