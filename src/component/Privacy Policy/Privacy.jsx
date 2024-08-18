import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Typing from "react-typing-effect";
import "../Css/privacy.css";
import { Link } from "react-router-dom";


function Privacy() {
  const [openSection, setOpenSection] = useState(null);
  const [typingComplete, setTypingComplete] = useState(false);

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  useEffect(() => {
    if (typingComplete) {
      const timer = setTimeout(() => setTypingComplete(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [typingComplete]);

  const handleToggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-[#18003c] text-white">
      <Helmet>
        <title>Privacy Policy - Kahanify.com</title>
        <meta name="description" content="Privacy Policy for Kahanify.com" />
        <meta name="keywords" content="privacy, policy, Kahanify.com" />
        <meta name="author" content="Kahanify" />
      </Helmet>
      <div className="bg-[#18003c] text-white p-4 sm:p-6 md:p-8 lg:p-6 xl:p-6">
  <div className="text-center">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold">
      Privacy Policy for
      <Typing
        className={`px-2 text-[#ff0087] ${
          typingComplete ? "typing-complete" : "typing-active"
        }`}
        text={[" Kahanify.com"]}
        speed={100}
        eraseSpeed={50}
        typingDelay={1000}
        eraseDelay={5000}
        onFinishedTyping={handleTypingComplete}
      />
    </h1>
  </div>
</div>

<div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-8 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10">
  <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
    <h2 className="font-bold text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6">
      Last Updated: [01/12/2023]
    </h2>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
       Your privacy and trust are of utmost importance to Kahanify.com.
            This Privacy Policy outlines how we collect, use and protect your
            personal information when you visit our website, use our services,
            or interact with us. We have created this privacy statement in order
            to demonstrate our firm and continuing commitment to the privacy of
            personal information provided by those visiting and interacting with
            this website. We hold the privacy of your personal information in
            the highest regard. The following discloses our information
            gathering and dissemination practices for this website. We recognize
            the importance of protecting your privacy and our policy is designed
            to assist you in understanding how we collect, use, and safeguard
            the personal information you provide to us and to assist you in
            making informed decisions when using our site. This policy will be
            continuously assessed against new technologies, business practices,
            and our user’s needs.
          </p>
        </div>

        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <Section
            isOpen={openSection === "info"}
            onToggle={() => handleToggleSection("info")}
            title="1. Information We Collect:"
            content={
              <>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                  a. Personal Information:
                </h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                  When you register for a membership on Kahanify.com, we collect
                  personal information such as your name, email address, and
                  payment details.
                </p>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  During the payment process, we may collect billing
                  information, including credit card details. However, we do not
                  store your credit card information on our servers.
                </p>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                
                  b. Usage Information:
                </h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  We may collect information about your interactions with the
                  website, including the pages you visit, the content you
                  access, and the duration of your visit. Similar to other
                  commercial websites, our website utilizes a standard
                  technology called cookies (see explanation below, What Are
                  Cookies?) and web server log files to collect information
                  about how our website is used. Information gathered through
                  cookies and web server logs may include the date and time of
                  visits, the pages viewed, time spent at our website, and the
                  websites visited just before and just after our website.
                </p>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                What are Cookies</h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                  A cookie is a very small text document, which often includes
                  an anonymous unique identifier. When you visit a website, that
                  site`s computer asks your computer for permission to store
                  this file in a part of your hard drive specifically designated
                  for cookies. Each website can send its own cookie to your
                  browser if your browser`s preferences allow it, but (to
                  protect your privacy) your browser only permits a Website to
                  access the cookies it has already sent to you, not the cookies
                  sent to you by other sites. Browsers are usually set to accept
                  cookies. However, if you would prefer not to receive cookies,
                  you may alter the configuration of your browser to refuse
                  cookies. If you choose to have your browser refuse cookies, it
                  is possible that some areas of our site will not function as
                  effectively when viewed by the users. A cookie cannot retrieve
                  any other data from your hard drive or pass on computer
                  viruses.
                </p>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                
                  c. Device Information:
                </h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  We may collect information about the device you use to access
                  Kahanify.com, such as the device type, operating system, and
                  browser.
                </p>
              </>
            }
          />

          <Section
            isOpen={openSection === "usage"}
            onToggle={() => handleToggleSection("usage")}
            title="2. How We Use Your Information"
            content={
              <>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                
                  a. Providing Services:
                </h2>
                <p className="my-4 text-xl ">
                  We use your personal information to provide you with access to
                  audio stories based on your membership subscription
                </p>

                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                b. Communication:</h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  We may use your email address to send you important updates,
                  newsletters, and promotional materials. You can opt-out of
                  these communications at any time.
                </p>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                
                  c. Payment Processing:
                </h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  Your payment information is used to process transactions for
                  your membership subscription securely.
                </p>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                
                  d. Improving Services:
                </h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  We analyze user behavior and feedback to enhance and
                  personalize your experience on Kahanify.com.
                </p>
              </>
            }
          />

          <Section
            isOpen={openSection === "sharing"}
            onToggle={() => handleToggleSection("sharing")}
            title="3. Information Sharing:"
            content={
              <>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                
                  a.Third-Party Service Providers:
                </h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  We may share your information with third-party service
                  providers who assist us in delivering our services, such as
                  payment processors. These providers are obligated to protect
                  your information.
                </p>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                b.Legal Compliance:</h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  We may disclose your information to comply with legal
                  obligations, enforce our policies, or respond to legal
                  requests.
                </p>
              </>
            }
          />

          <Section
            isOpen={openSection === "choices"}
            onToggle={() => handleToggleSection("choices")}
            title="4. Your Choices:"
            content={
              <>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                
                  a. Access and Update:
                </h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  You can review and update your personal information in your
                  account settings.
                </p>
                <h2 className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold">
                b. Opt-Out:</h2>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  You can opt-out of promotional emails by using the unsubscribe
                  link provided in the emails.
                </p>
              </>
            }
          />

          <Section
            isOpen={openSection === "security"}
            onToggle={() => handleToggleSection("security")}
            title="5. Security:"
            content={
              <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                a. We take reasonable measures to protect your information from
                unauthorized access, disclosure, alteration, or destruction.
              </p>
            }
          />

          <Section
            isOpen={openSection === "children"}
            onToggle={() => handleToggleSection("children")}
            title="6. Children’s Privacy:"
            content={
              <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                a. Kahanify.com is not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                children.
              </p>
            }
          />

          <Section
            isOpen={openSection === "changes"}
            onToggle={() => handleToggleSection("changes")}
            title="7. Changes to the Privacy Policy:"
            content={
              <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                a. We may update this Privacy Policy periodically. The date of
                the latest update will be reflected at the top of the page.
              </p>
            }
          />

          <Section
            isOpen={openSection === "disclaimer"}
            onToggle={() => handleToggleSection("disclaimer")}
            title="8. Disclaimer:"
            content={
              <>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  The following provisions may be curtailed or disallowed by the
                  laws of certain jurisdictions. In such case, the terms hereof
                  are to be read as excluding or limiting such term so as to
                  satisfy such law. We do not represent or warrant that the
                  information accessible via this website is accurate, complete
                  or current.
                </p>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  We have no liability whatsoever in respect of any use which
                  you make of such information. The information provided on this
                  website has not been written to meet your individual
                  requirements and it is your sole responsibility to satisfy
                  yourself prior to ordering any products or services from us
                  that they are suitable for your purposes. Whilst we make all
                  reasonable attempts to exclude viruses from the website, we
                  cannot ensure such exclusion and no liability is accepted for
                  viruses. Thus, you are recommended to take all appropriate
                  safeguards before downloading information or images from this
                  website. All warranties, express or implied, statutory or
                  otherwise are hereby excluded. Neither we nor any of our
                  employees or affiliated entities will be liable for any kind
                  of damages and howsoever arising including, without
                  limitation, loss of profits, compensatory, consequential,
                  direct, exemplary, incidental, indirect, punitive or special,
                  damages or any liability which you may have to a third party,
                  even if we have been advised of the possibility of such loss.
                  We are not responsible for the direct or indirect consequences
                  of you. The information we receive from you is protected
                  against unauthorized access once we receive it. We also
                  educate our employees about the importance of your privacy
                  through educational programs and company policies. Despite our
                  continual and evolving efforts to protect your personal
                  information, we cannot guarantee the security of your Personal
                  Information. You acknowledge and agree that we make no such
                  guarantee. We are not responsible for the practices employed
                  by websites linked to or from our website or the information
                  or content contained therein. Often links to other websites
                  are provided solely as pointers to information on topics that
                  may be useful to the users of our website. Please remember
                  that when you use a link to go from our website to another
                  website, our Privacy Policy is no longer in effect. Your
                  browsing and interaction on any other website, including
                  websites, which have a link on our website, is subject to that
                  website’s own rules and policies. Please read over those rules
                  and policies before proceeding.
                </p>
              </>
            }
          />

          <Section
            isOpen={openSection === "business"}
            onToggle={() => handleToggleSection("business")}
            title="9. Business Transfer:"
            content={
              <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                If Kahanify.com, or substantially all of its assets were
                acquired, or in the unlikely event that Kahanify.com goes out of
                business...
              </p>
            }
          />

          <Section
            isOpen={openSection === "contact"}
            onToggle={() => handleToggleSection("contact")}
            title="10. Contact Us:"
            content={
              <>
                <p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                
                  {" "}
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at [{" "}
                  <span className="text-[#ff0087]"> <Link to="mailto:contact@kahanify.com">contact@kahanify.com</Link> </span>
                  ].
                </p>
                <p>
                  By using Kahanify.com, you agree to the terms outlined in this
                  Privacy Policy.
                </p>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

const Section = ({ isOpen, onToggle, title, content }) => (
  <div
    className={`border-2 border-transparent hover:border-t-[#ff0087] hover:border-b-pink-600 transition-all duration-300 mb-8 ${
      isOpen ? "border-pink-600 border-4 border-y" : ""
    }`}
  >
    <h1
      className="text-2xl font-semibold p-4 cursor-pointer"
      onClick={onToggle}
    >
      {title}
    </h1>
    {isOpen && (
      <div className="p-4 bg-[#1a0c2b]">
        {content}
        <button
          onClick={onToggle}
          className="bg-transparent text-[#ff0087] font-bold py-2 px-4 mt-4 hover:text-orange-300 transition-all duration-300"
        >
          CLOSE
        </button>
      </div>
    )}
    {!isOpen && (
      <button
        onClick={onToggle}
        className="bg-transparent text-[#ff0087] font-bold py-2 px-4 mt-4 hover:text-orange-300 transition-all duration-300"
      >
        READ MORE
      </button>
    )}
  </div>
);

export default Privacy;
