import React, { ReactNode } from "react";

type SignPlaceholderProps = {
  x: number;
  y: number;
  children?: ReactNode;
};

export const SignPlaceholder: React.FC<SignPlaceholderProps> = ({
  x,
  y,
  children,
}) => {
  return (
    <div
      style={{
        width: "150px",
        height: "75px",
        position: "absolute",
        top: `${y - 32.5}px`,
        left: `${x - 75}px`,
        border: "1px solid red",
      }}
    >
      {children}
    </div>
  );
};
