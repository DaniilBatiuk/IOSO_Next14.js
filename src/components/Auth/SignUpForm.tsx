"use client";
import styles from "@/styles/SignIn.module.scss";
import { registerUser } from "@/utils/lib/actions/authActions";
import { SignUpFormScheme } from "@/utils/lib/scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Button from "../UI/Button/Button";

type InputType = z.infer<typeof SignUpFormScheme>;

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({ resolver: zodResolver(SignUpFormScheme), mode: "onSubmit" });

  const saveUser: SubmitHandler<InputType> = async data => {
    const { confirmPassword, ...user } = data;
    try {
      const error = await registerUser(user);
      if (error) {
        toast.error(error);
      } else {
        toast.success("The user registered successfully.");
        router.push("/SignIn");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(saveUser)} className={`${styles.form}`}>
      <div className={`${styles.form__inputs}`}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          label={errors.fullName?.message || "Insert full name"}
          {...register("fullName")}
          fullWidth
          variant="standard"
          inputProps={{ style: { fontSize: 21 } }}
          InputLabelProps={{ style: { fontSize: 21 } }}
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
          error={Boolean(errors.email?.message)}
          label={errors.email?.message || "Insert email"}
          {...register("email")}
          fullWidth
          variant="standard"
          inputProps={{ style: { fontSize: 21 } }}
          InputLabelProps={{ style: { fontSize: 21 } }}
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
          inputProps={{ style: { fontSize: 21 } }}
          InputLabelProps={{ style: { fontSize: 21 } }}
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
          error={Boolean(errors.confirmPassword?.message)}
          label={errors.confirmPassword?.message || "Confirm password"}
          {...register("confirmPassword")}
          fullWidth
          variant="standard"
          type="password"
          inputProps={{ style: { fontSize: 21 } }}
          InputLabelProps={{ style: { fontSize: 21 } }}
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
        {isSubmitting ? "Sign Up..." : "Sign Up"}
      </Button>
    </form>
  );
};
export default SignUpForm;
