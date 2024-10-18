import { React, Suspense, useState, useTransition } from "react";
import PropTypes from "prop-types";
// import "./LoadLazy.css";

const LoadLazy = ({ children }) => {
  const [isPending, startTransition] = useTransition();
  const [showLazy, setShowLazy] = useState(false);

  // Handle the button click and lazy load the component
  const handleClick = () => {
    startTransition(() => {
      setShowLazy(true); // Set state to show the lazy component, wrapped in startTransition
    });
  };

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
LoadLazy.propTypes = {
  children: PropTypes.node.isRequired, // Fix: `PropTypes` should be capitalized
};
export default LoadLazy;
