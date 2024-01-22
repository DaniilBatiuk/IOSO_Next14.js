import SignInBack from "@/../public/SignInBack.png";
import SignInFront from "@/../public/SignInFront.png";
import Button from "@/components/UI/Button/Button";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
import styles from "@/styles/SignIn.module.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
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
              <form action="#" className={`${styles.form}`}>
                <div className={`${styles.form__inputs}`}>
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Remember me"
                  />
                </div>
                <Button
                  type="submit"
                  colorBorder="rgba(255, 255, 255,1)"
                  colorHover="rgba(255, 255, 255,0.3)"
                >
                  Sign In
                </Button>
              </form>
              <div className={`${styles.form__undertext}`}>
                Or don’t have an account? please register&nbsp;
                <span>
                  <Link href="/SignUp">here</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
