import styles from "@/styles/SignIn.module.scss";
import Image from "next/image";
import SignUpBack from "@/../public/SignUpBack.png";
import SignUpFront from "@/../public/SignUpFront.png";
import Button from "@/components/UI/Button/Button";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
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
              <form action="#" className={`${styles.form}`}>
                <div className={`${styles.form__inputs}`}>
                  <TextField
                    fullWidth
                    label="Insert full name"
                    variant="standard"
                    inputProps={{ style: { fontSize: 25 } }}
                    InputLabelProps={{ style: { fontSize: 25 } }}
                    sx={{
                      "& label.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                      },
                      "& .MuiInput-root:before": {
                        borderBottomColor: "white",
                      },
                      "& .MuiInput-root:after": {
                        borderBottomColor: "white",
                      },
                      ".MuiInput-root:hover:not(.Mui-disabled):before": {
                        borderBottomColor: "white",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Insert email"
                    variant="standard"
                    inputProps={{ style: { fontSize: 25 } }}
                    InputLabelProps={{ style: { fontSize: 25 } }}
                    sx={{
                      "& label.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                      },
                      "& .MuiInput-root:before": {
                        borderBottomColor: "white",
                      },
                      "& .MuiInput-root:after": {
                        borderBottomColor: "white",
                      },
                      ".MuiInput-root:hover:not(.Mui-disabled):before": {
                        borderBottomColor: "white",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Insert password"
                    variant="standard"
                    type="password"
                    inputProps={{ style: { fontSize: 25 } }}
                    InputLabelProps={{ style: { fontSize: 25 } }}
                    sx={{
                      "& label.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                      },
                      "& .MuiInput-root:before": {
                        borderBottomColor: "white",
                      },
                      "& .MuiInput-root:after": {
                        borderBottomColor: "white",
                      },
                      ".MuiInput-root:hover:not(.Mui-disabled):before": {
                        borderBottomColor: "white",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Confirm password"
                    variant="standard"
                    type="password"
                    inputProps={{ style: { fontSize: 25 } }}
                    InputLabelProps={{ style: { fontSize: 25 } }}
                    sx={{
                      "& label.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                      },
                      "& .MuiInput-root:before": {
                        borderBottomColor: "white",
                      },
                      "& .MuiInput-root:after": {
                        borderBottomColor: "white",
                      },
                      ".MuiInput-root:hover:not(.Mui-disabled):before": {
                        borderBottomColor: "white",
                      },
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  colorBorder="rgba(255, 255, 255,1)"
                  colorHover="rgba(255, 255, 255,0.3)"
                >
                  Sign Up
                </Button>
              </form>
              <div className={`${styles.form__undertext}`}>
                Or do have an account? please register&nbsp;
                <span>
                  <Link href="/SignIn" style={{ color: "rgba(255, 244, 84, 1)" }}>
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
