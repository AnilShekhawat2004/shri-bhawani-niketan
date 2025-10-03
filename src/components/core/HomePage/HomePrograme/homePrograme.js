import ProgramCard from "../../Courses/ProgramCard";

function HomePrograme() {
  return (
    <div className="flex flex-col mt-28 mb-20">
      <div className="flex flex-col gap-5 items-center text-bhawaniDark font-semibold font-m2 lg:text-[40px] md:text-[35px] text-[30px]">
        <p className="uppercase">Explore our programs</p>
        <div className="bg-bhawaniYellow w-[180px] h-[2px]"></div>
      </div>

      <div className="w-[80%] mx-auto">
        <ProgramCard />
      </div>
    </div>
  );
}

export default HomePrograme;
