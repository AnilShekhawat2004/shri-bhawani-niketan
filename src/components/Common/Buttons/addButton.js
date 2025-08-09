export default function AddButton({
  text,
  onClick,
  children,
  disabled,
  type,
  className,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`bg-[linear-gradient(135deg,_#FDB714,_#c23b52)]
       h-[50px] flex flex-row justify-center items-center gap-2 rounded-lg ${className}`} // Width, height, etc. handled from outside
    >
      <span className="text-white font-bold text-[22px]">{children}</span>
      <span className="text-white ">{text}</span>
    </button>
  );
}
