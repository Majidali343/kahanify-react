import React from "react";
import "../Css/contact.css";
import Accordion from "../Conditions/Accordian";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
function FAQs() {
  return (
    <>
     <Helmet>
        <title>Frequently Asked Questions - Kahanify</title>
        <meta name="description" content="Find answers to frequently asked questions about Kahanify.com, including membership details, subscription management, and more." />
        <meta name="keywords" content="FAQ, Kahanify, audio stories, video stories, read stories, membership, subscription, customer support" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Frequently Asked Questions - Kahanify" />
        <meta property="og:description" content="Find answers to frequently asked questions about Kahanify.com, including membership details, subscription management, and more." />
        <meta property="og:url" content="https://www.kahanify.com/FAQs" />
      </Helmet>
      <div className=" bg-[#18003c] text-white">
        <div className="text-center py-6">
          <h1 className="text-[#ff0087] text-xl animated-text">FAQ's</h1>
          <h1 className="text-6xl  font-bold animated-heading">
            Frequently Asked Questions
          </h1>
        </div>
        <div class="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 ">
            <Accordion title="1. What is Kahanify.com?">
              <div>
                <p className="my-3 pt-5 ">
                  Kahanify.com is an online web portal that offers a vast
                  collection of captivating audio stories. Users can access
                  these stories by subscribing to our membership service, which
                  provides them with exclusive content for a specified period.
                </p>
              </div>
            </Accordion>
            <Accordion title="2. How does the membership work?">
              <div>
                <p className="my-3 pt-5 ">
                  To enjoy uninterrupted access to our audio stories, users can
                  subscribe to a membership by paying a fee. The membership
                  grants them the ability to select and listen to a variety of
                  audio stories for the chosen duration.
                </p>
              </div>
            </Accordion>

            <Accordion title="3. What is the duration of the membership?">
              <div>
                <p className="my-3 pt-5 ">
                  Users have the flexibility to choose the duration of their
                  membership during the subscription process. The available
                  options will be presented, and users can select the period
                  that best suits their preferences.
                </p>
              </div>
            </Accordion>

            <Accordion title="4. Can I cancel my membership?">
              <div>
                <p className="my-3 pt-5 ">
                  Yes, users can cancel their membership at any time. However,
                  it’s important to note that, as outlined in our refund policy,
                  no refunds will be provided for the remaining duration of the
                  subscription
                </p>
              </div>
            </Accordion>

            <Accordion title="5. How do I cancel my membership?">
              <div>
                <p className="my-3 pt-5 ">
                  Users can manage their subscriptions in their account settings
                  on the Kahanify.com website. If assistance is needed, our
                  customer support team can be contacted at [
                  <span className="text-[#ff0087]"> <Link to="mailto:contact@kahanify.com">contact@kahanify.com</Link> </span>{" "}
                  ].
                </p>
              </div>
            </Accordion>

            <Accordion title="6. Are there any refunds for canceled memberships?">
              <div>
                <p className="my-3 pt-5 ">
                  No, as per our refund policy, all membership fees paid are
                  non-refundable. Even if a user chooses to cancel their
                  subscription before the end of the selected period, no refunds
                  will be provided.
                </p>
              </div>
            </Accordion>

            <Accordion title="7. What happens if there are technical issues preventing access to audio stories?">
              <div>
                <p className="my-3 pt-5 ">
                  In the rare event of technical issues preventing access to the
                  subscribed content, users are encouraged to contact our
                  customer support at [
                  <span className="text-[#ff0087]"> <Link to="mailto:contact@kahanify.com">contact@kahanify.com</Link> </span>{" "}
                  ] we will investigate the matter promptly and, if necessary,
                  may provide a refund or credit for the affected period at our
                  discretion.
                </p>
              </div>
            </Accordion>

            <Accordion title="8. Can I change my subscription plan?">
              <div>
                <p className="my-3 pt-5 ">
                  Users can upgrade or downgrade their subscription plan by
                  accessing their account settings on Kahanify.com. Changes will
                  take effect at the beginning of the next billing cycle.
                </p>
              </div>
            </Accordion>

            <Accordion title="9. How do I update my payment information?">
              <div>
                <p className="my-3 pt-5 ">
                  To update payment information, users can navigate to their
                  account settings and modify the billing details. Ensure that
                  the new information is accurate to avoid any disruptions in
                  service.
                </p>
              </div>
            </Accordion>

            <Accordion title="10. Is my personal information secure?">
              <div>
                <p className="my-3 pt-5 ">
                  Yes, we take the security and privacy of your personal
                  information seriously. Our practices are outlined in our
                  Privacy Policy, which you can review on our website.
                </p>
              </div>
            </Accordion>

            <Accordion title="11. Can I share my account with others?">
              <div>
                <p className="my-3 pt-5 ">
                  No, sharing account credentials is not permitted. Each
                  membership is intended for individual use, and sharing
                  accounts may result in the termination of access.
                </p>
              </div>
            </Accordion>

            <Accordion title="12. How often is new content added to Kahanify.com?">
              <div>
                <p className="my-3 pt-5 ">
                  We strive to regularly update our library with fresh and
                  engaging content. The frequency of additions may vary, but our
                  goal is to provide a diverse and continually expanding
                  collection of audio stories.
                </p>
              </div>
            </Accordion>

            <Accordion title="13. How can I suggest a story or provide feedback?">
              <div>
                <p className="my-3 pt-5 ">
                  We welcome user suggestions and feedback! You can reach out to
                  us at [
                  <span className="text-[#ff0087]"><Link to="mailto:contact@kahanify.com">contact@kahanify.com</Link> </span>{" "}
                  ]to share your ideas, comments, or recommendations.
                </p>
              </div>
            </Accordion>

            <Accordion title="14. What devices are compatible with Kahanify.com?">
              <div>
                <p className="my-3 pt-5 ">
                  Kahanify.com is accessible on a variety of devices, including
                  smartphones, tablets, and computers. Ensure that your device
                  is connected to the internet for optimal streaming.
                </p>
              </div>
            </Accordion>

            <Accordion title="15. How can I contact customer support?">
              <div>
                <p className="my-3 pt-5 ">
                  For any further assistance or inquiries, please reach out to
                  our customer support team at [
                  <span className="text-[#ff0087]"> <Link to="mailto:contact@kahanify.com">contact@kahanify.com</Link> </span>{" "}
                  ]. We’re here to help!{" "}
                </p>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQs;
