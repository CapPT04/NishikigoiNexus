import { React, Suspense } from "react";
import "./LoadLazy.css";

const LoadLazy = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="fixed flex justify-center items-center text-9xl top-0 bottom-0 left-0 right-0">
          Loading...
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
export default LoadLazy;
