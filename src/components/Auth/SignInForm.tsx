"use client";
import { TextField } from "@mui/material";
import Button from "../UI/Button/Button";
import styles from "@/styles/SignIn.module.scss";
import { z } from "zod";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface SignInFormProps {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const SignInForm: React.FC<SignInFormProps> = (props: SignInFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data, event) => {
    event?.preventDefault();
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
