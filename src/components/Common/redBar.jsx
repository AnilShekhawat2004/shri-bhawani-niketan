function RedBar({ text, className = "", textClassName = "" }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Background with diagonal cut */}
      <div className="relative w-full h-[270px] md:h-[250px] sm:h-[150px] xs:h-[100px] bg-bhawaniDark clip-diagonal z-50">
        <div className="flex justify-center items-center py-10 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16">
          <p
            className={`text-white text-center lg:pt-14 md:pt-12 sm:pt-7 xs:pt-[8px] leading-snug max-w-[90%] xs:max-w-[400px] sm:max-w-[600px] md:max-w-[850px] ${textClassName}`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RedBar;
