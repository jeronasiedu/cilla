import { motion } from "framer-motion";

const ModalWrapper = ({
  children,
  maxWidth,
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className={
        "bg-black/20 fixed inset-0 flex items-center justify-center min-h-dvh z-30"
      }
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 10,
        }}
        style={{
          width: `min(95%, ${maxWidth || "40rem"})`,
        }}
        className={
          "absolute overflow-y-auto max-h-[75vh]  bg-white z-20  rounded-xl w-full max-w-xl shadow-sm"
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ModalWrapper;
