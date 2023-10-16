import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: -2, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -10 },
};

const AnimatedContainer = ({ children, ...rest }) => {
  return (
    <motion.div
      //   initial={{scaleY: 0}}
      //   animate={{scaleY: 1}}
      //   exit={{scaleY: 0}}
      //   transition={{duration: 0.5}}
      initial="hidden"
      animate="enter"
      exit="exit"
      className="h-screen"
      variants={variants}
      transition={{ type: "linear" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
