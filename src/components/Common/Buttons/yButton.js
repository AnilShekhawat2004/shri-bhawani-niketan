export default function YButton({
  onClick,
  children,
  disabled = false,
  type = "button",
  className = "",
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`flex px-5 min-h-[45px] items-center justify-center bg-bhawaniYellow text-bhawaniDark 
            rounded-full shadow-[4px_4px_rgba(255,255,255,0.25)] shadow-yellow-700 hover:scale-95 
            hover:bg-bhawaniDark hover:text-bhawaniYellow transition-all duration-700 hover:shadow-none ${className}`}
    >
      <div className="text-[17px] font-verdana">{children}</div>
    </button>
  );
}
