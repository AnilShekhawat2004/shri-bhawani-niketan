import HPolicy from "../assets/College/Ncc.jpg";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function HarassmentPolicy() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingImage
          LineImage={HPolicy}
          text={"Harassment/Discrimination Policy"}
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[20px] sm:text-[30px] lg:text-[50px] text-center uppercase font-bold"
        />

        <div className="absolute bottom-0 left-0 w-full z-20 xs: sm:translate-y-10 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="Together we rise against harassment building a college culture where everyone is heard, valued, safe, and empowered to thrive."
            textClassName="font-m1 text-center text-[12px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:max-w-[450px] px-4 xs:pt-[4px]"
          />
        </div>
      </div>

      <div className="xl:w-[80%] lg:w-[80%] md:w-[80%] w-[95%] mx-auto h-full xl:mt-32 lg:mt-32 md:mt-28 mt-20 flex flex-col items-center gap-5 justify-center">
        <p className="xl:text-[45px] lg:text-[45px] md:text-[35px] sm:text-[30px] text-[25px] font-bold font-verdana text-center text-bhawaniDark">
          Sexual Harassment Policy
        </p>
        <div className="w-[45%] h-[2px] bg-bhawaniYellow"></div>

        <div className="w-full px-6 md:px-12 py-10">
          {/* POLICY PURPOSE */}
          <section className="mb-10">
            <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-bhawaniDark mb-3">
              Policy Purpose
            </h2>
            <p className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm leading-relaxed">
              Shri Bhawani Niketan P.G. Boys College is committed to fostering a
              safe, inclusive, and respectful learning and working environment.
              The College aims to uphold the rights and dignity of all
              individuals by prohibiting any form of discrimination or
              harassment in accordance with applicable national laws and the
              principles of equality and human dignity.
            </p>
          </section>

          {/* NONDISCRIMINATION */}
          <section className="mb-10">
            <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-bhawaniDark mb-3">
              General Nondiscrimination Statement
            </h2>
            <p className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm leading-relaxed mb-4">
              The College does not discriminate against any student, applicant
              for admission, employee, or applicant for employment based on
              actual or perceived:
            </p>
            <ul className="list-disc ml-6 xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm space-y-1">
              <li>Age</li>
              <li>Caste or community</li>
              <li>Citizenship or nationality</li>
              <li>Color or complexion</li>
              <li>Creed or religion</li>
              <li>Disability (physical or mental)</li>
              <li>Ethnicity</li>
              <li>Family or marital status</li>
              <li>Gender identity or expression</li>
              <li>Genetic information or medical history</li>
              <li>Language or linguistic preference</li>
              <li>National origin or ancestry</li>
              <li>Parental or pregnancy status</li>
              <li>Personal appearance</li>
              <li>Political belief or affiliation</li>
              <li>Residence or place of origin</li>
              <li>Sex or sexual orientation</li>
              <li>Socioeconomic status</li>
              <li>Veteran, military, or paramilitary service</li>
              <li>
                Or any other protected characteristic under Indian law or
                UGC/AICTE guidelines
              </li>
            </ul>
          </section>

          {/* SCOPE */}
          <section className="mb-10">
            <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-bhawaniDark mb-3">
              Scope of the Policy
            </h2>
            <p className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm leading-relaxed">
              This policy applies to all members of the Shri Bhawani Niketan
              College community including students, faculty, staff,
              administrators, contractors, and visitors. It covers all college
              programs and activities, whether on campus or conducted online,
              including academic, residential, and co-curricular contexts.
            </p>
          </section>

          {/* ZERO TOLERANCE */}
          <section className="mb-10">
            <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-bhawaniDark mb-3">
              Zero Tolerance for Harassment
            </h2>
            <p className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm leading-relaxed mb-2">
              The College strictly prohibits harassment in all forms—verbal,
              physical, written, digital, or visual—including:
            </p>
            <ul className="list-disc ml-6 xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm space-y-1">
              <li>Sexual harassment</li>
              <li>Bullying or intimidation</li>
              <li>Caste- or religion-based hate speech</li>
              <li>Misuse of authority or coercion</li>
              <li>Unwelcome advances, innuendos, or threats</li>
              <li>
                Online/cyber harassment via social media or messaging platforms
              </li>
            </ul>
            <p className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm leading-relaxed mt-3">
              Any such behavior that unreasonably interferes with a person’s
              access to education, employment, or peaceful coexistence within
              the campus community will be treated as a serious violation of
              this policy.
            </p>
          </section>

          {/* REPORTING */}
          <section className="mb-10">
            <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-bhawaniDark mb-3">
              Reporting and Resolution
            </h2>
            <p className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm leading-relaxed">
              Incidents of discrimination or harassment should be reported to
              the designated Grievance Redressal Cell or Internal Complaints
              Committee (ICC). All complaints will be handled confidentially and
              investigated promptly in accordance with college procedures and
              UGC norms.
            </p>
          </section>

          {/* COMMITMENT */}
          <section className="mb-10">
            <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-bhawaniDark mb-3">
              Commitment to Action
            </h2>
            <p className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm leading-relaxed mb-3">
              Shri Bhawani Niketan P.G. Boys College is committed to:
            </p>
            <ul className="list-disc ml-6 xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm space-y-1">
              <li>
                Educating its community on equity, respect, and professional
                behavior
              </li>
              <li>Taking timely and effective action on all complaints</li>
              <li>
                Ensuring that retaliation against complainants is strictly
                prohibited
              </li>
              <li>
                Upholding the principles of fairness, transparency, and justice
              </li>
            </ul>
          </section>

          {/* CONTACT */}
          <section className="mb-10">
            <h2 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold font-sans text-bhawaniDark mb-3">
              Contact Us
            </h2>
            <p className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm font-sans mb-1">
              If you have any issues related to the Harassment/Discrimination
              Policy, please contact us at:
            </p>
            <ul className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm font-sans list-none space-y-1">
              <li>
                <strong>Address:</strong> Maharao Shekha Circle (Chomu Pulia),
                Sikar Road, Jaipur - 302039
              </li>
              <li>
                <strong>Phone:</strong> +91 141 2233863
              </li>
              <li>
                <strong>Email:</strong> sbnboyscollege@gmail.com
              </li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HarassmentPolicy;
