"use client";
import styles from "@/styles/SignIn.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../UI/Button/Button";
import { registerUser } from "@/utils/lib/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    fullName: z
      .string()
      .min(4, "Full name must be at least 4 characters")
      .max(45, "Full name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+(?: [a-zA-Z]+)*$"), "No special character allowed!"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords doesn't match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema), mode: "onSubmit" });

  const saveUser: SubmitHandler<InputType> = async data => {
    const { confirmPassword, ...user } = data;
    try {
      const error = await registerUser(user);
      if (error) {
        toast.error(error);
      } else {
        toast.success("The User Registered Successfully.");
        router.push("/SignIn");
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
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
        colorBorder="rgba(255, 255, 255,1)"
        colorHover="rgba(255, 255, 255,0.3)"
      >
        Sign Up
      </Button>
    </form>
  );
};
export default SignUpForm;
