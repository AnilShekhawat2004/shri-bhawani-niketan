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
      className={`w-full max-w-[400px] bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center gap-4 ${className}`}
    >
      <img
        src={LineImage}
        alt="Message"
        loading="lazy"
        className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
      />

      <h2 className="text-xl font-bold font-m1 text-center">{name}</h2>
      <h3 className="text-base font-medium text-gray-700 text-center">
        {heading}
      </h3>
      <p className="text-sm text-gray-600 text-center">{text}</p>
    </motion.div>
  );
}

export default Message;
