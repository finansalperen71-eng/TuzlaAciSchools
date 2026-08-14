import { type ElementType, type ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Container({
  as: Tag = "div",
  children,
  className = "",
  narrow = false,
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-6 md:px-10 ${narrow ? "max-w-3xl" : "max-w-7xl"} ${className}`}
    >
      {children}
    </Tag>
  );
}
