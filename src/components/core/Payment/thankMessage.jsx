import Gurdian from "../../../assets/ImageLine/Guardian.png";
import Content from "../../../assets/Logo/ContentArea.svg";

function ThankMessage() {
  return (
    <div className="relative w-full h-[550px] mt-32  bg-bhawaniDark">
      <img
        src={Content}
        alt="ContentArea"
        className="w-full h-full absolute z-10 "
        loading="lazy"
      ></img>

      <div className="w-[85%] flex flex-row absolute z-20 justify-center items-center gap-20 mt-16 ml-14">
        <img
          src={Gurdian}
          alt="Gurdian"
          loading="lazy"
          className=" w-[25%] h-[400px] shadow-2xl"
        ></img>

        <div className="w-[45%] h-[400px] flex flex-col gap-3 text-white">
          <div className="flex flex-col">
            <p className="font-m1 font-bold text-[39px] ">
              Thank You for Being a Guardian From Afar
            </p>
            <div className="w-[80%] h-[2px] bg-bhawaniYellow"></div>
          </div>
          <p className="font-verdana">
            Your kindness is a quiet light in someone’s life a guardian who may
            never meet the child whose dreams you’ve touched, yet will always be
            remembered with love. You’ve cared for them as if they were your
            own, and that is something truly rare and beautiful.
          </p>

          <p className="font-verdana">
            Your support is more than a donation it’s the selfless act of
            someone who chooses to stand behind a future they may never see, for
            a student they may never know. But rest assured, your love will echo
            in their journey, and they will cherish you from the bottom of their
            heart.
          </p>

          <p className="font-verdana">
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
