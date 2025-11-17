export default function TrusteesCard({ className, name, post}) {
  return (
    <div
      className={`flex flex-col gap-3 group border items-center justify-center 
      border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
      transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px] ${className}`}
    >
      <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
        {name}
      </p>
      <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
        {post}
      </p>
    </div>
  );
}
