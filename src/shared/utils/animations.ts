import { Variants } from "framer-motion";

export const menuVariant: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 10,
  },
};

// export const backdropVariant: Variants = {
//   initial: {
//     opacity: 0,
//   },
//   animate: {
//     opacity: 1,
//   },
//   exit: {
//     opacity: 0,
//   },
// };
// export const modalVariant: Variants = {
//   initial: {
//     opacity: 0,
//     y: 5,
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//   },
//   exit: {
//     opacity: 0,
//     y: 5,
//   },
// };
// export const sidebarModalVariant: Variants = {
//   initial: {
//     opacity: 0,
//     x: 100,
//   },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       type: "spring",
//       damping: 15,
//       stiffness: 200,
//       mass: 0.5,
//     },
//   },
//   exit: {
//     opacity: 0,
//     x: 100,
//   },
// };
