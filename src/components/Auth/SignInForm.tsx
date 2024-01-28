"use client";
import styles from "@/styles/SignIn.module.scss";
import { SignInFormScheme } from "@/utils/lib/scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Button from "../UI/Button/Button";

interface SignInFormProps {
  callbackUrl?: string;
}

type InputType = z.infer<typeof SignInFormScheme>;

const SignInForm: React.FC<SignInFormProps> = (props: SignInFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(SignInFormScheme),
  });

  const onSubmit: SubmitHandler<InputType> = async data => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
      <div className={`${styles.form__inputs}`}>
        <TextField
          error={Boolean(errors.email?.message)}
          label={errors.email?.message || "Insert email"}
          {...register("email")}
          fullWidth
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
          error={Boolean(errors.password?.message)}
          label={errors.password?.message || "Insert password"}
          {...register("password")}
          fullWidth
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
        disabled={isSubmitting}
        colorBorder="rgba(255, 255, 255,1)"
        colorHover="rgba(255, 255, 255,0.3)"
      >
        {isSubmitting ? "Sign In..." : "Sign In"}
      </Button>
    </form>
  );
};
export default SignInForm;
