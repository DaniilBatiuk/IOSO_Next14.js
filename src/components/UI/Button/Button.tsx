import React, { ButtonHTMLAttributes, ReactNode } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "@/styles/Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  type?: "button" | "submit";
  colorBorder?: string;
  colorHover?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  colorBorder,
  colorHover,
  ...props
}: ButtonProps) => {
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
        {ICONS.Button()}
      </div>
    </button>
  );
};
