import College from "../assets/College/Policy.jpg";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function Policy() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingImage
          LineImage={College}
          text={"Privacy Policy"}
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[30px] sm:text-[50px] lg:text-[60px] text-center uppercase font-bold"
        />

        <div className="absolute bottom-0 left-0 w-full z-20 xs:translate-y-5 sm:translate-y-16 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="Privacy isn’t just policy it’s our promise to protect your personal information and uphold your right to a safe, respectful online environment."
            textClassName="font-m1 text-center text-[12px] sm:text-[22px] md:text-[24px] lg:text-[28px] xs:pt-[0px] px-4"
          />
        </div>
      </div>

      <div className="w-[80%]  mx-auto h-full xl:mt-32 lg:mt-32 mt-20 flex flex-col items-center gap-8 justify-center">
        <p className="xl:text-[35px] lg:text-[35px] md:text-[30px] text-[25px] font-bold font-sans text-center text-bhawaniDark">
          Privacy Policy
        </p>
        <div className="w-[30%] h-[2px] bg-bhawaniYellow"></div>

        <p className="xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[18px] text-[15px] font-sans text-center">
          This policy aims to safeguard the privacy of individuals whose
          sensitive information is stored electronically on assets owned or
          managed by Shri Bhawani Niketan P.G. Boys College. It also ensures the
          College may share such information with authorized entities when
          necessary for legitimate academic or administrative purposes, or as
          mandated by applicable laws and regulations. This policy does not
          replace or override existing College policies concerning the handling
          of sensitive information, including those related to academic data
          protection, student rights, and regulatory compliance.
        </p>

        <div className="flex flex-col mt-20 gap-10">
          {/* 1. Introduction */}
          <div className="flex flex-col gap-3">
            <p className="font-bold xl:text-[24px] lg:text-[24px] md:text-[22px] text-[20px] text-bhawaniDark font-sans">
              1. Introduction
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              At Shri Bhawani Niketan P.G. Boys College, we are committed to
              protecting the privacy of our students, faculty, staff, and
              visitors. This Privacy Policy outlines our practices for
              collecting, using, and safeguarding personal information.
            </p>
          </div>

          {/* 2. Information We Collect */}
          <div className="flex flex-col gap-3">
            <p className="font-bold xl:text-[24px] lg:text-[24px] md:text-[22px] text-[20px] text-bhawaniDark font-sans">
              2. Information We Collect
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              We may collect the following types of information:
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • <strong>Personal Identification Information:</strong> Name,
              email address, phone number, postal address, date of birth, and
              other contact details.
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • <strong>Academic Information:</strong> Enrollment details,
              course selections, grades, and academic records.
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • <strong>Technical Data:</strong> IP address, browser type,
              operating system, and browsing behavior on our website.
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • <strong>Cookies and Tracking Technologies:</strong> Used to
              enhance user experience and analyze website traffic.
            </p>
          </div>

          {/* 3. How We Use Your Information */}
          <div className="flex flex-col gap-3">
            <p className="font-bold xl:text-[24px] lg:text-[24px] md:text-[22px] text-[20px] text-bhawaniDark font-sans">
              3. How We Use Your Information
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              Information collected may be used to:
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • Provide and manage educational services
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • Communicate important updates and information
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • Improve our website and services
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • Ensure the security and integrity of our systems
            </p>
          </div>

          {/* 4. Sharing Your Information */}
          <div className="flex flex-col gap-3">
            <p className="font-bold xl:text-[24px] lg:text-[24px] md:text-[22px] text-[20px] text-bhawaniDark font-sans">
              4. Sharing Your Information
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              We do not sell or rent your personal information. However, we may
              share it with:
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • <strong>Service Providers:</strong> Trusted third-party vendors
              who support our operations
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • <strong>Legal Obligations:</strong> When required by law or to
              protect our rights and safety
            </p>
          </div>

          {/* 5. Data Security */}
          <div className="flex flex-col gap-3">
            <p className="font-bold xl:text-[24px] lg:text-[24px] md:text-[22px] text-[20px] text-bhawaniDark font-sans">
              5. Data Security
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              We implement appropriate technical and organizational safeguards
              to protect your personal data from unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </div>

          {/* 6. Your Rights */}
          <div className="flex flex-col gap-3">
            <p className="font-bold xl:text-[24px] lg:text-[24px] md:text-[22px] text-[20px] text-bhawaniDark font-sans">
              6. Your Rights
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • Access, correct, or delete your personal information
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • Object to or restrict certain data processing activities
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • Withdraw consent for processing based on consent
            </p>
          </div>

          {/* 7. Changes to This Privacy Policy */}
          <div className="flex flex-col gap-3">
            <p className="font-bold xl:text-[24px] lg:text-[24px] md:text-[22px] text-[20px] text-bhawaniDark font-sans">
              7. Changes to This Privacy Policy
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              We may update this Privacy Policy periodically. Any updates will
              be reflected on this page with the revised effective date.
            </p>
          </div>

          {/* 8. Contact Us */}
          <div className="flex flex-col gap-3">
            <p className="font-bold xl:text-[24px] lg:text-[24px] md:text-[22px] text-[20px] text-bhawaniDark font-sans">
              8. Contact Us
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              If you have any questions or concerns regarding this policy,
              please contact us:
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • <strong>Address:</strong> Maharao Shekha Circle (Chomu Pulia),
              Sikar Road, Jaipur - 302039
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • <strong>Phone:</strong> +91 141 2233863
            </p>
            <p className="xl:text-lg lg:text-lg md:text-[16px] text-sm font-sans">
              • <strong>Email:</strong> sbnboyscollege@gmail.com
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Policy;
