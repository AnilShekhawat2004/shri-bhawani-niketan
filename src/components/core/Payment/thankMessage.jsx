import Gurdian from "../../../assets/ImageLine/Guardian.png";
import Content from "../../../assets/Logo/ContentArea.svg";

function ThankMessage() {
  return (
    <div className="relative w-full h-[550px] xl:mt-28 lg:mt-28 md:mt-24 mt-20 bg-bhawaniDark">
      <img
        src={Content}
        alt="ContentArea"
        className="w-full h-full absolute z-10 object-cover"
        loading="lazy"
      ></img>

      <div className="w-[85%] flex xl:flex-row lg:flex-row md:flex-row flex-col absolute z-20 justify-center items-center xl:gap-20 lg:gap-20 md:gap-14 gap-8 xl:mt-16 lg:mt-16 md:mt-16 mt-4 xl:ml-14 lg:ml-14 md:ml-14 ml-6">
        <img
          src={Gurdian}
          alt="Gurdian"
          loading="lazy"
          className="xl:w-[25%] lg:w-[25%] md:w-[30%] w-[50%] xl:h-[400px] lg:h-[400px] md:h-[400px] sm:h-[300px] h-[200px] shadow-2xl"
        ></img>

        <div className="xl:w-[45%] lg:w-[45%] md:w-[50%] w-[100%] xl:h-[400px] lg:h-[400px] md:h-[400px] h-[300px] flex flex-col xl:gap-3 lg:gap-3 md:gap-3 text-white">
          <div className="flex flex-col justify-center items-center">
            <p className="font-m1 font-bold xl:text-[39px] lg:text-[39px] md:text-[30px] sm:text-[25px] text-[20px] text-center">
              Thank You for Being a Guardian From Afar
            </p>
            <div className="w-[80%] xl:h-[2px] lg:h-[2px] md:h-[2px] h-[1px] bg-bhawaniYellow"></div>
          </div>
          <p className="font-verdana xl:text-base lg:text-base md:text-base text-[10px] text-center">
            Your kindness is a quiet light in someone’s life a guardian who may
            never meet the child whose dreams you’ve touched, yet will always be
            remembered with love. You’ve cared for them as if they were your
            own, and that is something truly rare and beautiful.
          </p>

          <p className="font-verdana xl:text-base lg:text-base md:text-base text-[10px] text-center">
            Your support is more than a donation it’s the selfless act of
            someone who chooses to stand behind a future they may never see, for
            a student they may never know. But rest assured, your love will echo
            in their journey, and they will cherish you from the bottom of their
            heart.
          </p>

          <p className="font-verdana xl:text-base lg:text-base md:text-base text-[10px] text-center">
            Even we, as a college, deeply respect and honor your generosity.
            Like a parent’s care, your contribution nurtures growth, brings
            hope, and reminds us all of the quiet strength that shapes the world
            through compassion.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThankMessage;
