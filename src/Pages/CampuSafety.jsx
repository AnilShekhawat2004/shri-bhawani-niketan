import Safety from "../assets/College/Safety.png";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function CampuSafety() {
  return (
    <div>
      <LandingImage
        LineImage={Safety}
        text="Campus Safety"
        className="absolute z-20"
        textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
      />
      <RedBar
        className="absolute font-m1"
        textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
        text="At Shri Bhawani Niketan College, safety isn't just a policy it's a promise to protect, empower, and create a fearless, thriving environment for every student"
      />

      <div className="mt-32 w-[75%] mx-auto">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-bhawaniDark text-[40px] font-bold font-m1">
            Our Campus Safety
          </p>
          <div className="bg-bhawaniYellow w-[60%] h-[2px]"></div>
        </div>

        <div className="mt-32">
          <div>
            <p className="text-[40px] text-bhawaniRed font-bold mb-3">
              Campus Safety
            </p>
            <p className="text-[20px] leading-relaxed">
              At Shri Bhawani Niketan College, the safety and well-being of our
              students, faculty, and visitors is our highest priority. We are
              committed to providing a secure, welcoming, and peaceful campus
              environment conducive to learning and personal growth.
            </p>
          </div>

          <div className="mt-16 ml-7">
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-bhawaniDark mb-3">
                Security Measures
              </h2>
              <ul className="list-disc ml-6 text-lg space-y-1">
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
              <h2 className="text-3xl font-bold text-bhawaniDark mb-3">
                Emergency Support
              </h2>
              <ul className="list-disc ml-6 text-lg space-y-1">
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
              <h2 className="text-3xl font-bold text-bhawaniDark mb-3">
                Awareness & Training
              </h2>
              <ul className="list-disc ml-6 text-lg space-y-1">
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
              <h2 className="text-3xl font-bold text-bhawaniDark mb-3">
                Code of Conduct
              </h2>
              <ul className="list-disc ml-6 text-lg space-y-1">
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
