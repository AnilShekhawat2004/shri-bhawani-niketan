import Safety from "../assets/College/Safety.png";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function CampuSafety() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingImage
          LineImage={Safety}
          text="Campus Safety"
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[30px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 xs: sm:translate-y-10 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="At Shri Bhawani Niketan College, safety isn't just a policy it's a promise to protect, empower, and create a fearless, thriving environment for every student"
            textClassName="font-m1 text-center text-[13px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:max-w-[500px] px-4 xs:pt-[1px]"
          />
        </div>
      </div>

      <div className="xl:mt-[150px] lg:mt-[150px] md:mt-28 mt-20 xl:w-[75%] lg:w-[75%] md:w-[80%] w-[100%] mx-auto">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-bhawaniDark xl:text-[40px] lg:text-[40px] md:text-[35px] sm:text-[30px] text-[25px] font-bold font-m1 text-center">
            Our Campus Safety
          </p>
          <div className="bg-bhawaniYellow w-[60%] h-[2px]"></div>
        </div>

        <div className="xl:mt-32 lg:mt-32 md:mt-28 mt-20">
          <div className="xl:ml-0 lg:ml-0 md:ml-0 ml-7">
            <p className="xl:text-[40px] lg:text-[40px] md:text-[30px] sm:text-[25px] text-[20px] text-bhawaniRed xl:text-start lg:text-start text-center font-bold mb-3">
              Campus Safety
            </p>
            <p className="xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-relaxed">
              At Shri Bhawani Niketan College, the safety and well-being of our
              students, faculty, and visitors is our highest priority. We are
              committed to providing a secure, welcoming, and peaceful campus
              environment conducive to learning and personal growth.
            </p>
          </div>

          <div className="mt-16 ml-7">
            <section className="mb-10">
              <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-bhawaniDark mb-3">
                Security Measures
              </h2>
              <ul className="list-disc ml-6 xl:text-lg lg:text-lg md:text-sm text-xs space-y-1">
                <li>
                  24x7 Security Personnel: Trained security staff are stationed
                  at all major campus entry and exit points.
                </li>
                <li>
                  CCTV Surveillance: The entire campus is monitored through a
                  network of CCTV cameras to ensure real-time safety and
                  accountability.
                </li>
                <li>
                  ID Verification: Entry into campus is regulated through
                  student and staff ID checks to prevent unauthorized access.
                </li>
                <li>
                  Women’s Safety: Special attention is given to women's safety
                  with designated help desks, women guards, and gender-sensitive
                  awareness sessions.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-bhawaniDark mb-3">
                Emergency Support
              </h2>
              <ul className="list-disc ml-6 xl:text-lg lg:text-lg md:text-sm text-xs space-y-1">
                <li>
                  Emergency Contacts: A dedicated emergency helpline number is
                  available for immediate assistance on campus.
                </li>
                <li>
                  First Aid Facilities: Basic medical aid is available in the
                  college infirmary with trained staff ready to respond.
                </li>
                <li>
                  Fire Safety: The campus is equipped with fire extinguishers,
                  alarms, and clearly marked evacuation routes.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-bhawaniDark mb-3">
                Awareness & Training
              </h2>
              <ul className="list-disc ml-6 xl:text-lg lg:text-lg md:text-sm text-xs space-y-1">
                <li>
                  Workshops & Seminars: Regular sessions on self-defense, cyber
                  safety, and awareness about laws related to student safety.
                </li>
                <li>
                  Anti-Ragging Policy: Strict anti-ragging rules are enforced as
                  per UGC guidelines. A dedicated Anti-Ragging Committee
                  monitors and handles related issues promptly.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-bhawaniDark mb-3">
                Code of Conduct
              </h2>
              <ul className="list-disc ml-6 xl:text-lg lg:text-lg md:text-sm text-xs space-y-1">
                <li>
                  All students and staff are expected to adhere to a campus code
                  of conduct that promotes mutual respect, zero tolerance for
                  violence, and community responsibility.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CampuSafety;
