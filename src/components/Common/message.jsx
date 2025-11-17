import { motion } from "framer-motion";

function Message({
  LineImage,
  heading,
  name,
  text,
  className = "",
  delay = 0, // add delay for staggered effect
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`w-full xl:max-w-[400px] lg:max-w-[400px] max-w-[300px] border border-gray-200 bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center gap-4 ${className}`}
    >
      <img
        src={LineImage}
        alt="Message"
        loading="lazy"
        className="xl:w-32 lg:w-32 w-28 xl:h-32 lg:h-32 h-28 object-cover rounded-full border-4 border-gray-300"
      />

      <h2 className="xl:text-xl lg:text-xl text-lg font-bold font-m1 text-center">{name}</h2>
      <h3 className="xl:text-base lg:text-base text-sm font-medium text-gray-700 text-center">
        {heading}
      </h3>
      <p className="xl:text-sm lg:text-sm text-xs text-gray-600 text-center">{text}</p>
    </motion.div>
  );
}

export default Message;
