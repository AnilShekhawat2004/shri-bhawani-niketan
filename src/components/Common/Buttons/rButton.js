import "./Button.css";

export default function RButton({
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
      className={`RGroup relative flex justify-center items-center gap-2 
                  px-4 py-3 transition-all duration-500 
                  border-bhawaniDark border-[1px] bg-bhawaniDark text-white
                  ${className}`} // Width, height, etc. handled from outside
    >
      <span className="RHover absolute z-10 text-[15px] w-0 h-full left-0 transition-all duration-700"></span>

      <span className="RText absolute z-20 font-semibold transition-all duration-200 ease-in">
        {text}
      </span>

      {children && (
        <span className="RChild z-10 transition-all duration-500">{children}</span>
      )}
    </button>
  );
}
