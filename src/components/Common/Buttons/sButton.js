export default function SButton({
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
            className={`group relative inline-flex items-center justify-center px-5 min-h-[55px] 
                        overflow-hidden bg-bhawaniDark text-white border border-bhawaniDark 
                        transition-all duration-[1s] ${className}`}
        >
            {/* background swipe effect */}
            <div className="absolute left-0 top-0 h-full w-0 bg-white z-10 transition-all duration-[1s] group-hover:w-full"></div>

            {/* text content */}
            <div className="relative z-20 flex items-center gap-2 font-semibold transition-all duration-[1s] group-hover:text-bhawaniDark">
                {children}
            </div>
        </button>
    );
}