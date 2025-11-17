function LandingImage({ LineImage, text, className, textClassName = "" }) {
  return (
    <div className={`relative xl:pt-[136px] lg:pt-[136px] md:pt-[136px] sm:pt-[70px] xs:pt-[50px] ${className}`}>
      <img
        src={LineImage}
        alt="Landing"
        loading="lazy"
        className="w-full h-full object-cover object-center md:object-[50%_30%]"
      />
      <div className="absolute top-[136px] left-0 lg:w-full lg:h-[650px] bg-black/40 z-10"></div>

      <div className="absolute inset-0 flex justify-center items-center z-30">
        <p className={`text-white font-m2 ${textClassName}`}>{text}</p>
      </div>
    </div>
  );
}

export default LandingImage;
