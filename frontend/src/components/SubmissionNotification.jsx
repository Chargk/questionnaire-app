// TODO: not using
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import styled from "styled-components";
//
// const MotionNotification = styled(motion.div)`
//   position: fixed;
//   top: 20px;
//   right: 20px;
//   background-color: #28a745;
//   color: white;
//   padding: 15px 20px;
//   border-radius: 10px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   z-index: 1000;
//   font-weight: bold;
// `;
//
// const SubmissionNotification = ({ show, message }) => {
//   return (
//     <AnimatePresence>
//       {show && (
//         <MotionNotification
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.5 }}
//         >
//           {message}
//         </MotionNotification>
//       )}
//     </AnimatePresence>
//   );
// };
//
// export default SubmissionNotification;
