import React from "react";

function LandingImage ({
    LineImage,
    text,
    className,
    textClassName = "",
}) {
   return (
       <div className={`relative pt-[136px] ${className}`}>
         <img 
           src={LineImage} 
           alt="Landing" 
           loading="lazy"
           className="w-full h-[650px] object-cover"
         />
         <div className="absolute top-[136px] left-0 w-full h-[650px] bg-black/40 z-10"></div>

         <div className="absolute inset-0 flex justify-center items-center z-30">
             <p className={`text-white font-m2 ${textClassName}`}>{text}</p>
         </div>
       </div>
   );
}


export default LandingImage;