import { cn } from "@/lib/utils";
import { motion } from "motion/react"

export default function Loader({
  className
} : {
  className ? : string
}){
  return ( 
      <div className={cn("flex relative items-center justify-center w-full top-10", className)}>
        <BarLoader />
      </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-forground" />
      <motion.div variants={variants} className="h-12 w-2 bg-forground" />
      <motion.div variants={variants} className="h-12 w-2 bg-forground" />
      <motion.div variants={variants} className="h-12 w-2 bg-forground" />
      <motion.div variants={variants} className="h-12 w-2 bg-forground" />
    </motion.div>
  );
};