import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  color?: "primary" | "secondary";
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${props.color === "primary" ? "bg-black text-white " : "bg-white text-black"} border-[1px] w-full hover:opacity-70 duration-500 py-2 px-4 rounded-3xl font-semibold`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
