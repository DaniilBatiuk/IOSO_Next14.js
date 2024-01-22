import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "@/components/UI/Button/Button.module.scss";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  type?: "button" | "submit";
  colorBorder?: string;
  colorHover?: string;
};

const Button: React.FC<ButtonProps> = ({ children, colorBorder, colorHover, ...props }: ButtonProps) => {
  return (
    <button className={`${styles.button}`} {...props} style={{ borderColor: colorBorder }}>
      <style>{`
    .${styles.button}:before {
      background-color: ${colorHover};
    }
  `}</style>
      <div className={`${styles.button_text}`}>
        <style>{`
          .${styles.button_text}:before {
            background-color: ${colorHover};
          }
        `}</style>
        {children}
      </div>
      <div className={`${styles.button_arrow}`} style={{ backgroundColor: colorHover }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
          <path fill="currentColor" d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z" />
        </svg>
      </div>
    </button>
  );
};
export default Button;
