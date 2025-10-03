export default function MButton({
  text,
  onClick,
  children,
  disabled,
  type,
  className, // Accept className prop for customization
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`group relative inline-flex items-center justify-center  min-h-[55px] 
                        overflow-hidden border border-bhawaniDark min-w-[200px]
                        transition-all duration-[1s] ${className}`} // Allow external styling
    >
      <span className="absolute left-0 top-0 h-full w-0 bg-bhawaniDark z-10 transition-all duration-[1s] group-hover:w-full"></span>

      <span
        className="absolute z-20 font-semibold transition-all duration-500 ease-in-out
            group-hover:text-white "
      >
        {text}
      </span>
      {children && (
        <span className="z-10 group-hover:text-white transition-all duration-500 ease-in-out">
          {children}
        </span>
      )}
    </button>
  );
}
