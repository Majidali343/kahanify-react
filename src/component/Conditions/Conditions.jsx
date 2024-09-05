import React from "react";
import Accordion from "./Accordian.jsx";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function Conditions() {
  return (
    <>
 <Helmet>
        <title>Terms and Conditions | Kahanify.com</title>
        <meta
          name="description"
          content="Read the terms and conditions for using Kahanify.com, including membership, payment, content usage, and privacy policies."
        />
        <meta
          name="keywords"
          content="terms and conditions, Kahanify, audio stories, video stories, Read story, membership, payment, content usage"
        />
        <meta property="og:title" content="Terms and Conditions | Kahanify.com" />
        <meta
          property="og:description"
          content="Read the terms and conditions for using Kahanify.com, including membership, payment, content usage, and privacy policies."
        />
        <meta property="og:url" content="https://www.kahanify.com/Conditions" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kahanify.com" />
        <link rel="canonical" href="https://www.kahanify.com/Conditions" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              
              "@type": "WebPage",
              name: "Terms and Conditions",
              description: "Terms and Conditions page of Kahanify.com",
              url: "https://www.kahanify.com/Conditions",
            }),
          }}
        />
      </Helmet>

<div className="py-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 bg-[#18003c] text-white">
  <div>
    <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl py-4 sm:py-6 font-bold text-center">
      Terms and Conditions of Use for{" "}
      <span className="text-[#ff0087]">Kahanify.com</span>
    </h1>
  </div>
        <div>
        <h2 className="font-bold my-4 sm:my-5 md:my-6 lg:my-7 xl:my-8 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl">
  Last Updated: [01/12/2023]
</h2>
<p className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl">
  Welcome to Kahanify.com, an audio stories web portal completely
            owned and governed by Kahanify.com, and have all rights reserved. By
            accessing or using our website and services, you agree to comply
            with and be bound by the following Terms and Conditions of Use.
            Please read these terms carefully before using our services.
          </p>
        </div>
        <div className="my-4 sm:my-6 md:my-8 lg:my-10 xl:my-12 ">
   <Accordion title="1. Membership and Access:">
            <div>
              <h2 className="my-3 pt-5 font-bold">
                a. Membership Subscription:
              </h2>
              <p>
                Users must pay a membership fee to access the audio stories on
                Kahanify.com for a specified period as selected during the
                subscription process.
              </p>
              <h2 className="my-3 font-bold">b. User Accounts:</h2>
              <p>
                Users are required to create an account to subscribe to a
                membership. You agree to provide accurate, current, and complete
                information during the registration process.
              </p>

              <h2 className="my-3 font-bold">c. Access Restrictions:</h2>
              <p>
                Your membership is personal to you, and you may not share your
                account credentials with others. Access to the audio stories is
                limited to one user per membership.
              </p>
            </div>
          </Accordion>
          <Accordion title="2. Payment and Billing:">
            <div>
              <h2 className="my-3 pt-5 font-bold">a. Payment Methods:</h2>
              <p>
                Payments for membership fees are processed through online
                payment methods. By providing payment information, you represent
                and warrant that you have the legal right to use the chosen
                payment method.
              </p>
              <h2 className="my-3 font-bold">b. Automatic Renewal:</h2>
              <p>
                Memberships are set to automatically renew unless canceled
                before the renewal date. You will be billed at the then-current
                subscription fee.
              </p>

              <h2 className="my-3 font-bold">c. Price Changes:</h2>
              <p>
                Kahanify.com reserves the right to change membership fees with
                reasonable notice to existing subscribers. Changes will not
                affect the current subscription period.
              </p>
            </div>
          </Accordion>
          <Accordion title="3. Content Usage and Restrictions:">
            <div>
              <h2 className="my-3 pt-5 font-bold">a. Intellectual Property:</h2>
              <p>
                All content on Kahanify.com, including audio stories, text,
                graphics, logos, and images, is the property of Digital
                Inception or its content suppliers and is protected by copyright
                laws.
              </p>
              <h2 className="my-3 font-bold">b. Usage Restrictions:</h2>
              <p>
                Users agree not to reproduce, distribute, modify, or create
                derivative works from the content on Kahanify.com without prior
                written consent.
              </p>
            </div>
          </Accordion>
          <Accordion title="4. User Responsibilities:">
            <div>
              <h2 className="my-3 pt-5 font-bold">a. Compliance with Laws:</h2>
              <p>
                Users must comply with all applicable laws and regulations while
                using Kahanify.com.
              </p>
              <h2 className="my-3 font-bold">b. Prohibited Activities:</h2>
              <p>
                Users are prohibited from engaging in any activity that could
                disrupt, damage, or interfere with the proper functioning of
                Kahanify.com.
              </p>
            </div>
          </Accordion>
          <Accordion title="5. Membership Fees:">
            <div>
              <p className="my-3 pt-5 ">
                All membership fees paid to access audio stories on Kahanify.com
                are non-refundable.
              </p>
            </div>
          </Accordion>

          <Accordion title="6. Cancellation During Subscription Period:">
            <div>
              <p className="my-3 pt-5 ">
                Users have the option to cancel their subscription at any time
                during the subscription period. However, no refunds will be
                provided for the remaining duration of the subscription
              </p>
            </div>
          </Accordion>

          <Accordion title="7. Billing and Automatic Renewal:">
            <div>
              <h2 className="my-3 pt-5 font-bold">a. Automatic Renewal:</h2>
              <p>
                Memberships are set to automatically renew to ensure
                uninterrupted access to audio stories. Users are responsible for
                managing their subscription settings to avoid automatic renewal
                if they do not wish to continue with the service.
              </p>
              <h2 className="my-3 font-bold">b. Billing Disputes: </h2>
              <p>
                In the event of a billing dispute or unauthorized charges, users
                are encouraged to contact our customer support at
                [<span className="text-[#ff0087]"><Link to="mailto:contact@kahanify.com">contact@kahanify.com</Link></span>] to seek resolution. However, this does
                not guarantee a refund.
              </p>
            </div>
          </Accordion>
          
          <Accordion title="8. Exceptions:">
            <div>
              <h2 className="my-3 pt-5 font-bold">a. Technical Issues:</h2>
              <p>If there are technical issues on our end that prevent users from accessing the subscribed content, we will investigate the matter promptly. In such cases, Kahanify.com may, at its discretion, provide a refund or credit for the affected period.
              </p>
            </div>
          </Accordion>
          <Accordion title="9. Privacy:">
            <div>
              <h2 className="my-3 pt-5 font-bold">a. Privacy Policy:</h2>
              <p>The use of personal information is governed by our Privacy Policy, which is an integral part of these Terms and Conditions.
              </p>
            </div>
          </Accordion>
    
          <Accordion title="10. Limitation of Liability:">
            <div>
              <h2 className="my-3 pt-5 font-bold">a. Disclaimer:</h2>
              <p>Kahanify.com is not responsible for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
              </p>
            </div>
          </Accordion>
    
          <Accordion title="11. Changes to Terms and Conditions:">
            <div>
              <h2 className="my-3 pt-5 font-bold">a. Modification:</h2>
              <p>Kahanify.com reserves the right to modify or update these Terms and Conditions at any time. Users will be notified of material changes.
                 </p>
            </div>
          </Accordion>

          <Accordion title="12. Contact Us:">
            <div>
              <p className="my-3 pt-5 ">If you have any questions or concerns regarding these Terms and Conditions, please contact us at [<span className="text-[#ff0087]">  <Link to="mailto:contact@kahanify.com">contact@kahanify.com</Link> </span>]. By using Kahanify.com, you agree to abide by these Terms and Conditions of Use.

              </p>
            </div>
          </Accordion>

        </div>
      </div>
    </>
  );
}

export default Conditions;
