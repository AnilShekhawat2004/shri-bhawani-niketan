
function redBar({ text, className, textClassName }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute z-20 clip-diagonal h-[121px] -translate-y-[120px] w-full bg-bhawaniDark"></div>
      <div className=" w-full h-[151px] bg-bhawaniDark pl-[165px] z-30">
        <p className={`absolute z-30 text-white w-[850px] ${textClassName}`}>
          {text}
        </p>
      </div>
    </div>
  );
}

export default redBar;
