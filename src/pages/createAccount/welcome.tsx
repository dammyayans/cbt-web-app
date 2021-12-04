/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {Link} from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import cn from 'classnames';
// import {motion} from 'framer-motion';
// import google from 'assets/icons/google.svg';
// import apple from 'assets/icons/apple.svg';
import React, {useState} from 'react';

import logo from 'assets/cryptolife-logo-new.svg';
import Text from 'components/Text';
// import Button from 'components/Button';
// import AuthButton from 'components/AuthButton';
import Spacer from 'components/Spacer';
import Button from 'components/Button';
import screens from 'constants/screens';
import onboard1 from 'assets/onboard1.png';
import onboard2 from 'assets/onboard2.png';
import onboard3 from 'assets/onboard3.png';
import AnimatedContainer from 'components/AnimatedContainer';

type ModalProps = {
  heading: 'Cryptolife Capital Standard Agreement' | 'Privacy Policy';
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({heading, isVisible, onClose, children}: ModalProps) => (
  <div
    className={cn(
      'fixed top-0 left-0 w-full h-full bg-dark-gray bg-opacity-70 z-10 flex flex-col items-center justify-end transition-all duration-500 md:justify-center',
      {'transform translate-y-full': !isVisible},
    )}>
    <div
      className="bg-transparent flex-1 w-full md:absolute md:w-full md:h-full md:top-0 md:left-0 md:z-10"
      onClick={onClose}
    />
    <div className=" bg-white w-full h-5/6 rounded-t-2xl p-8 overflow-y-auto  md:rounded-2xl md:w-5/6 md:relative md:z-20">
      <p className="text-primary text-xl font-bold mb-6">{heading}</p>
      {children}
      <br />
      <br />
      <Button type="button" variant="outlined" onClick={onClose}>
        I agree
      </Button>
    </div>
  </div>
);

const Item = ({img, title, text}) => (
  <div>
    <img className="h-40 w-40" src={img} alt="cryptolife capital" />
    <h1 className="mt-6 text-primary font-bold text-5xl">{title}</h1>
    <p className="text-dark-gray text-sm mt-3">{text}</p>
  </div>
);

const Welcome = () => {
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [showPrivacy, setShowPrivacy] = useState<boolean>(false);
  const slides = [
    {
      key: '1',
      title: 'Crypto Asset Portfolio Investment and Management Platform',
      text: 'We run various investment plans for investors seeking passive income and long term wealth through the crypto market.',
      img: onboard1,
    },
    {
      key: '2',
      title:
        'Gain easy exposure to the crypto currency market through our investment plans',
      text: 'We make it simpler for you to invest into cryptocurrency without going through the hassles of learning how to do it. We trade for you and manage your investment as you watch it grow. ',
      img: onboard2,
    },
    {
      key: '3',
      title: 'Risk Management and Capital Protection',
      text: 'We have proven to be one of the best performing funds in the history of digital asset management since 2017. In the quest for profitability, we still ensure our investor’s capital are protected',
      img: onboard3,
    },
  ];
  return (
    <AnimatedContainer className="grid md:grid-cols-2 grid-cols-1 h-screen">
      <Modal
        heading="Cryptolife Capital Standard Agreement"
        isVisible={showTerms}
        onClose={() => setShowTerms(false)}>
        <div>
          <p className="font-bold text-xl">Parties to this agreement.</p>
          <p>
            This Agreement is a contract between you (“You”, “Your” Investors)
            and CryptoLife Capital Limited (“CryptoLife Capital”, “We”, “Us”,
            “Our”) (each individually as “Party”, and collectively the
            “Parties”. This Agreement governs your non-transferable (unless with
            our prior written consent) use of the Cryptolife Capital App,
            website, and any features and products that Cryptolife may make
            available to You through the Cryptolife app or website
            (collectively, the “Platform”). We may transfer or assign this
            Agreement, and any rights under this Agreement, to a third party
            without notice to You or without Your consent.
          </p>
          <p className="font-bold text-xl my-8 mx-5">WHEREAS:</p>
          <ol className="mx-5 list-decimal">
            <li>
              This agreement outlines the terms and conditions (the “Terms”)
              between the “Investors”, (“You” or “Your”) and Cryptolife Capital
              Ltd. (Cryptolife, the “Company”, “We”, “Our “or “Us”) under which
              you agree to invest in cryptocurrency through the Company’s
              platform.
            </li>
            <li>
              You confirm and accept this agreement by creating an account and
              signing a copy of these Terms by ticking the “I accept the terms
              and conditions”; you hereby adopt the good sign as Your electronic
              signature. You should read these Terms carefully before making an
              online application or signing a copy of them and you should retain
              a copy for future reference.
            </li>
            <li>
              By signing electronically, you also agree to our Terms of Use,
              Privacy Policy.
            </li>
            <li>
              Cryptolife is a Digital Asset Management Company, cryptocurrency
              being one of its portfolios.
            </li>
            <li>
              You have indicated interest to invest in cryptocurrencies, crypto
              trading and other crypto related products.
            </li>
            <li>
              You will provide the capital to be invested in our
              cryptocurrencies trading and related activities for upside.
            </li>
            <li>
              Your capital will be used for our diversified cryptocurrency
              portfolio.
            </li>
          </ol>
          <p className="font-bold my-8 mx-3">
            1.
            <span className="mr-2" />
            DEFINATION:
          </p>
          <div className="mx-3">
            <span className="flex">
              <span>1.1</span>
              <span className="mr-3" /> In this agreement, the terms: “You”,
              “Your”, shall mean the investor while “We”, “Us” and “Our”
              “Cryptolife shall mean Cryptolife Capital Ltd, and following an
              assignment, any person, company or bank to whom the rights and/or
              obligations of Cryptolife Capital have been assigned.
            </span>
            <p>
              1.2 <span className="mr-3" />
              <b>Parties:</b> means Cryptolife and the client.
            </p>
            <span className="flex">
              <span>1.3</span>
              <span className="mr-3" /> <b>Cryptolife Capital Ltd”</b> also
              referred to as “The Digital Asset Management Company”.
            </span>
            <span className="flex">
              <span>1.4</span>
              <span className="mr-3" /> <b>Upside:</b> This refers to the
              potential returns on investment (ROI).
            </span>
            <span className="flex">
              <span>1.5</span>
              <span className="mr-3" /> <b>Termination:</b> occurs where the
              investor decided not to continue with his investment after the
              commencement of this agreement and before the duration of one-year
              lock-up period.
            </span>
            <span className="flex">
              <span>1.6</span>
              <span className="mr-3" /> <b>Lock-up period:</b> The one-year
              duration of this investment before capital invested can be
              accessed or reinvested.
            </span>
            <span className="flex">
              <span>1.7</span>
              <span className="mr-3" /> <b>Stop Loss:</b> Stop loss is the one
              of the strategies designed to limit the losses the investor will
              likely incurred.
            </span>
            <span className="flex">
              <span>1.8</span>
              <span className="mr-3" /> <b>Penalty:</b> the fee to paid to the
              company where the investor terminates this agreement.
            </span>
            <span className="flex">
              <span>1.9</span>
              <span className="mr-3" />
              <span>
                <span>
                  <b>Representations and warranties:</b>
                  are statements and promises made by you to the Company, which
                  we rely on as being accurate in our dealings with you.
                </span>
              </span>
            </span>
            <span className="flex">
              <span>1.10</span>
              <span className="mr-3" />
              <span>
                <b>Volatility:</b>
                means the increase or decrease of cryptocurrency value which
                affect the rate of returns and lead to a potential gain or loss.
              </span>
            </span>
            <span className="flex">
              <span>1.11</span>
              <span className="mr-3" />
              <span>
                <b>Portfolio Management, Trading and Performance Fees:</b> Fee
                to be paid to the portfolio manager for services rendered.
              </span>
            </span>
          </div>
          <p className="font-bold mt-8 mx-3">
            2.
            <span className="mr-2" />
            Client’s KYC Identification (in line with our AML and CFT)
          </p>
          <div className="mx-5">
            <ol className="mx-5 list-decimal">
              <li>
                As part of the account opening requirements, you will be
                requested to provide personal identification information about
                yourself. We will use this information to verify your identity
                using a number of electronic checks.
              </li>
              <li>
                You agree that we may pass your personal information to our
                Service Providers or any other recognised third-party company
                solely for the purposes of verifying your identity, performing
                anti- money laundering checks and fraud prevention.
              </li>
              <li>
                Where we are not satisfied with information provided to us, we
                are at absolute liberty to request for more information or
                reject your application.
              </li>
            </ol>
          </div>
          <span className="flex mt-8">
            <b>3.</b>
            <span className="mr-3" />
            <span>
              <b>Commencement.</b>
              <br />
              This Agreement becomes effective at the time and day you
              register/signup on our platform; and remain in force on your
              continuous use of our services.
            </span>
          </span>
          <span className="flex mt-8">
            <b>4.</b>
            <span className="mr-3" />
            <span>
              <b>Appointment of the Digital Asset Manager.</b>
              <br />
              You hereby appoint Cryptolife Capital Ltd as a Portfolio Manager
              and Portfolio Trader to provide services in accordance with the
              provisions of this agreement.
            </span>
          </span>
          <span className="flex mt-8">
            <b>5.</b>
            <span className="mr-3" />
            <span>
              <b>Investment objectives and guidelines.</b>
              <br />
              (a) The sole objectives of this investment in cryptocurrency by
              the You, is for the Portfolio Manager to use their expertise in
              the digital space to grow the investor’s capital and ultimately
              make a Returns on Investment (ROI).
              <br />
              (b) The Portfolio Manager will employ their expertise and use
              their best judgment to invest in solid crypto assets with a view
              to achieving the investment objective subject to clause 27.
            </span>
          </span>
          <span className="flex mt-8">
            <b>6.</b>
            <span className="mr-3" />
            <span>
              <b>Functions of the Portfolio Manager.</b>
              <br />
              The main function of the Portfolio Manager as under this Agreement
              is: - <br />
              a) Portfolio Manager, Crypto trader, crypto investor.
              <br />
              b) To deploy and manage investors funds, in such manner that will
              enable the investors earn returns on their investment subject to
              market conditions.
              <br />
              c) To take such steps as may be necessary, incidental, ancillary
              or conducive to the fulfilment of the objectives.
              <br />
              d) In performing its management duties to the client, the
              Portfolio Manager shall be required to exercise the due care,
              professional competence and judgment ordinarily expected from a
              service provider of its standing.
            </span>
          </span>
          <span className="flex mt-8">
            <b>7.</b>
            <span className="mr-3" />
            <span>
              <b>Portfolio Manager Fees Structure.</b>
              <br />
              <b> a) Subscription Fee:</b> <br />
              i. The subscription/take on fee to be paid to the Portfolio
              Manager by the investors shall be 1% (one percent) of the capital
              investment and 1% of new additions (addition of new fund) to the
              portfolio by the investor. This payment shall be per investment
              window (per year).
              <br /> ii. The subscription fee shall be deducted from the gross
              amount of the invested sum. <br />
              <b>b) Performance Fees:</b>
              <br /> i. where the profit/upside of the portfolio is between 1% –
              25% in a 6 months duration, then the performance Fee shall be 13%
              of the profit/upside. <br /> ii. Where the profit/upside of the
              portfolio is between 26% – 49%, in a 6 months duration, then the
              Performance Fee shall be 18% of the profit/upside. <br /> iii.
              Where the profit/upside of the portfolio is between 50% – 99%, in
              a 6 months duration, then the Performance Fee shall be 23% of the
              profit/upside. <br /> iv. where the profit/upside of the portfolio
              is between 100% – 139%, in a 6 months duration, then the Portfolio
              Management Fee shall be 30% of the profit/upside. <br />
              v. Where the profit/upside is 140%, in a 6 months duration, then
              the Portfolio Management Fee shall be 35% of the profit/upside.
              <br />
              vi. The performance fee shall be deducted at source and at the end
              of every six-monthly investment window. <br />
              <b>c) Portfolio Trading Fee.</b> <br /> The portfolio trading fee
              shall be 1.5% of the total trading value, (capital plus upside).
              <br />
              i. Whilst the lock-up period (duration) of this portfolio is for
              one year (subject to renewal), profit taking by the investor is
              permitted every six months (six months interval).
            </span>
          </span>

          <span className="flex mt-8">
            <b>9.</b>
            <span className="mr-3" />
            <span>
              <b>Return on Investment</b>
              <br />
              i. We will carefully evaluate potential returns based on historic
              performance and collect statistics on market performances,
              however, we make no representation regarding the likelihood or
              probability that any actual or proposed investment will in fact
              achieve a particular target.
            </span>
          </span>

          <span className="flex mt-8">
            <b>10.</b>
            <span className="mr-3" />
            <span>
              <b>Stop Loss Provision</b>
              <br />
              You hereby appoint Cryptolife Capital Ltd as a Portfolio Manager
              and Portfolio Trader to provide services in accordance with the
              provisions of this agreement.
            </span>
          </span>

          <span className="flex mt-8">
            <b>11.</b>
            <span className="mr-3" />
            <span>
              <b>Tenure (Duration) .</b>
              <br />
              a) This investment is for a one-year duration, for the purposes of
              computation of time, the one year will start counting after 7 days
              of the release of fund/signing up by creation of account by the
              investor.
              <br />
              b) This agreement is subject to renewal after its expiration.
              However, renewal is at the discretion of the portfolio manager.
              <br />
              c) You agree that with respect to any investment made by you, such
              investment cannot be redeemed or liquidated prior to the maturity
              date.
              <br />
              d) If the investor intends to terminate the Portfolio before the
              one-year duration, the investor shall give the Portfolio Manager
              30 (thirty) days prior written notice of their intention together
              with specific instructions as to the manner of the disbursement of
              the funds. Following receipt of the client’s notice of intention
              to terminate, the Portfolio Manager will use its best endeavours
              to effect the investor’s instructions.
              <br />
              e) The investor shall be charged a Penalty of 10% for early
              termination of this portfolio. The 10% penalty shall be deducted
              from the gross investment, excluding the fees to be charged in
              clause 7(a) above.
            </span>
          </span>

          <span className="flex mt-8">
            <b>12.</b>
            <span className="mr-3" />
            <span>
              <b>Undertaking.</b>
              <br />
              i. The Investor hereby undertakes to pay the Portfolio Manager his
              fee for the Services rendered in line with this agreement.
              <br />
              ii. The Investor hereby authorizes the Portfolio Manager to debit
              their subscription and performance fee from source as referred to
              in clause 7 of this agreement.
            </span>
          </span>
          <span className="flex mt-8">
            <b>13.</b>
            <span className="mr-3" />
            <span>
              <b>PortfolioManager’sPowers,DutiesandObligations.</b>
              <br />
              i. The Investor hereby authorises the Portfolio Manager to engage
              in such acts on behalf of the Investor as may be incidental or
              consequential to the discharge of its responsibilities under this
              Agreement.
              <br />
              ii. The Portfolio Manager shall provide a monthly progress report
              in respect of this investment.
              <br />
              iii. The Portfolio Manager shall in good faith act individually,
              independently and at its discretion manage the investment of the
              investor in such a way as to achieve the objectives of this
              agreement.
            </span>
          </span>
          <span className="flex mt-8">
            <b>14.</b>
            <span className="mr-3" />
            <span>
              <b>Our Warranty</b>
              <br />
              The Portfolio Manager warranty as follows:
              <br />
              i. It will act professionally, diligently and in good faith at all
              time in managing the investment of the investor <br />
              ii. It will at all time prioritize the preservation of the
              principal invested sum, subject to clause 27 and 28.
            </span>
          </span>
          <span className="flex mt-8">
            <b>15.</b>
            <span className="mr-3" />
            <span>
              <b>Investors Representations and Warranties</b>
              <br />
              You represent and warrant that: <br />
              15.1 You have the legal capacity to enter into this agreement and
              you agree to this Terms of this agreement;
              <br />
              15.2 All personal information that you provide about yourself is
              accurate and true to the best of your knowledge;
              <br />
              15.3 You have carefully considered the risks you are exposed to
              and involved in before investing in digital asset through this
              Platform; <br />
              15.4 You are not breaching any laws or regulations that are
              applicable to you or any company, trust or partnership upon whose
              instructions you are acting. <br />
              15.5 Your source of fund is clean and is not from any money
              laundry/fraudulent sources.
              <br />
              15.6 You will not use this platform as a leeway to hide any
              illicit fund.
            </span>
          </span>
          <span className="flex mt-8">
            <b>16.</b>
            <span className="mr-3" />
            <span>
              <b>Access and Use</b>
              <br />
              i. Our Platform is, at all times, subject to our Website Terms of
              Use, Disclosure and Privacy Policy.
              <br />
              ii. Secure access to our Platform is provided by way of your
              username and password. These log-in credentials are unique to you
              and are the primary method of securely identifying you when
              delivering our services to you. It is therefore extremely
              important that you keep your username and password secure at all
              time without exposing same to any third party.
              <br />
              iii. You are liable for the compromise of your login details where
              you allow any 3rd party to have access to it or you disclose same
              to any 3rd party.
              <br />
              iv. If you suspect that your secure access to the Platform has
              been compromised in any way, it is your responsibility to contact
              us immediately and without delay.
              <br />
              v. You confirm that you will only use our Platform for the
              purposes set out in these Terms.
              <br />
              vi. You confirm that you will not attempt to gain unauthorised
              access to our Platform and furthermore you will not attempt to use
              code or software to manipulate or automate functions available on
              the platform.
              <br />
              vii. You understand that we may store your IP address information
              and may monitor your use of the platform in accordance with our
              cookie policy.
              <br />
              viii. Access to the Platform may be restricted at the discretion
              of the Company, particularly during periods of maintenance.
              <br />
              ix. We have the right to act upon and authorized any instruction
              that emanated from your account to us. To this end, it is a
              security advice that you keep your login details in a secure
              manner away from third parties.
              <br />
              x. We will never ask you to disclose your login security details
              to us inclusive of our staff or to any of our 3rd party. To this
              end always consider it fraudulent when any one request for your
              login information and without delay notify us.
            </span>
          </span>
          <span className="flex mt-8">
            <b>17.</b>
            <span className="mr-3" />
            <span>
              <b>Privacy and Terms</b>
              <br />
              You confirm that you have read and understood the Company’s
              Privacy Policy and Terms of Us which provides information on how
              we use and store the personal information that you provide to us
              and you further acknowledge that the Company may amend and update
              this policy from time to time.
            </span>
          </span>
          <span className="flex mt-8">
            <b>18.</b>
            <span className="mr-3" />
            <span>
              <b>Third-Party Provider Services:</b>
              <br />
              Our Platform may offer you the option to enter into relationships
              and agreements with Third-Party Providers for access to additional
              services, as a condition to having access to those Third-Party
              service providers, you may be required to enter into an agreement
              with a Third-Party service Provider before you can access their
              services. You understand and undertake that we shall not have any
              liability for any issues that may arise between you and the
              third-party service provider.
            </span>
          </span>
          <span className="flex mt-8">
            <b>19.</b>
            <span className="mr-3" />
            <span>
              <b>Account Information.</b>
              <br />
              A. The Platform may provide you with the following information
              about your investment on your dash board this includes:
              <br />
              <p className="ml-3">
                (1) account balance; <br />
                (2) total transactions;
                <br />
                (3) withdrawal history;
                <br />
                (4) Return on Investment;
                <br />
                (5) order history;
                <br />
                (6) invested amount etc.
                <br />
              </p>
              B. Account Opening <br />
              To access our services, you are required to sign-up on the
              Platform by opening an account, by filing a form that will require
              the provision of certain of your personally identifiable
              information, including but not limited to your name, your phone
              number, your address, your email address etc (“Investors
              information”). You will select your own password at the time of
              registration, and you agree that: <br /> <br />
              1. You will provide true, accurate, current, and complete
              registration information about yourself in connection with the
              registration process; <br />
              2. You are solely responsible for maintaining the confidentiality
              of your password and for restricting access to your mobile device
              to prevent unauthorized access by any 3rd party; <br />
              3. You will immediately notify us of any unauthorized use of your
              account, or any other breach of it; <br />
              4. We shall not be held liable for the unauthorised access to your
              account by a third party using your login details to access and
              make withdrawal from your account.
            </span>
          </span>

          <span className="flex mt-8">
            <b>20.</b>
            <span className="mr-3" />
            <span>
              <b>Account Security.</b>
              <br />
              20.1 You are responsible for ensuring the safety of your account
              (inclusive of it username and password). You are required to
              install the updated version of our mobile applications that we
              publish from time to time. These updates often include improved
              security. We will take reasonable steps consistent with our legal
              duties to protect our platform and secure it, however we are not
              liable for security breaches (hack) that may occur where we have
              complied with our security obligations.
              <br />
              <br />
              20.2 Cryptolife Capital, its affiliates, officers, directors,
              employees, attorneys or agents shall not be liable with respect
              to, any claim for any special, indirect, incidental, consequential
              damages suffered or incurred by you in connection with, arising
              out of, or in any way related to, a breach of this Agreement or
              compromise
            </span>
          </span>

          <span className="flex mt-8">
            <b>21.</b>
            <span className="mr-3" />
            <span>
              <b>App and Site Availability.</b>
              <br />
              While it is our intention that our platform will be available
              seven days a week notwithstanding our best effort in developing
              our platform (web an app). We do not guarantee that there won’t be
              network failure, network crashes, network glitches, network
              slowdown. In this instance, we will restrict access to some or all
              access to our platforms to enable us perform routine maintenance.
              You understand that we do not guarantee that you will always have
              access to the Platform.
            </span>
          </span>

          <span className="flex mt-8">
            <b>22.</b>
            <span className="mr-3" />
            <span>
              <b>Investment Advice.</b>
              <br />
              22.1 You understand and accept that we do not provide any
              financial advice, nor do we make any recommendations to you. The
              Company solely create a platform for you to invest in
              cryptocurrency. It is your sole responsibility to assess and
              ascertain your risk appetite(level) before taking the decision to
              invest using our platform and services.
              <br />
              22.2 We advise you to consider whether investing in
              cryptocurrencies meets your required risk levels and investment
              objectives, and you should only commit such funds that you are
              able to financially bear the risk of losing considering your other
              financial commitments.
              <br />
              22.3 By using our services, you confirm that you have the
              necessary experience and knowledge to understand the risks
              involved in cryptocurrency investment, and you have consulted your
              personal legal, financial or investment advisor to assist you in
              understanding the risks involved. Past performance data should not
              be construed as indicative of future results.
            </span>
          </span>

          <span className="flex mt-8">
            <b>23.</b>
            <span className="mr-3" />
            <span>
              <b>Legal Notice and Amendment.</b>
              <br />
              i. This agreement supersedes any prior written or verbal
              communication or understanding. This agreement We may amend this
              Agreement from time to time. If we make any changes to this
              Agreement, we will notify You of such changes via the email
              address associated with your account, and on our platform.
              <br />
              ii. Where you have any objection to our amended/updated terms, you
              are at liberty to either discontinue <br />
              iii. Oral agreements shall not be used to review, alter or amend
              this document. All amendment shall be in writing. <br />
              iv. iv. You agree that we may communicate with You by sending
              notices, messages, alerts, and statements in relation to this
              Agreement in the following manner:
              <br />
              (a) Text Message (SMS).
              <br />
              (b). Email: any email address provided by You during the
              application process.
              <br /> (c)Telephone.
              <br />
              (d). By posting such notice on our website or through a display on
              your dashboard. <br />
              (e) Any Social Media platform you provide to us.
            </span>
          </span>

          <span className="flex mt-8">
            <b>24.</b>
            <span className="mr-3" />
            <span>
              <b>Confidentiality</b>
              <br />
              Both Parties agrees that information disclosed before, during and
              after this agreement shall be confidential and shall not be used
              by either party for any purpose other than as specified in this
              Agreement or as required by law.
            </span>
          </span>

          <span className="flex mt-8">
            <b>25.</b>
            <span className="mr-3" />
            <span>
              <b>Dispute Resolution</b>
              <br />
              The following procedures will be followed in any and all
              controversies or disputes arising out of or related to this
              Agreement or relations between the Parties (“Disputes”), which the
              Parties cannot informally resolve at an operational level.
              <br />
              i. The aggrieved Party shall notify the other Party in writing of
              the nature of the Dispute with as much detail as possible.
              <br />
              ii. The Parties shall use all reasonable endeavours to resolve
              amicably and in good faith any dispute arising out of or in
              connection with this Agreement.
              <br />
              iii. Any dispute remaining unresolved after 14 (fourteen) days of
              either Party giving to the other a written notice of the matter
              complained shall be referred to Arbitration whereby the Parties
              shall mutually agree on the appointment of a sole Arbitrator
              within 14 (fourteen) days from the expiration of the 14 days
              period for amicable settlement.
              <br />
              iv. Where the Parties are unable to agree on the appointment of
              the Arbitrator, such sole Arbitrator shall be appointed by the
              Chairman/President of the Chartered Institute of Arbitrators,
              Nigerian (CIARb Nigeria) on the application of either Party.
              <br />
              v. Any dispute arising from the terms of this Agreement shall be
              settled in accordance with the Arbitration and Conciliation Act
              (Laws of the Federation of Nigeria 2004 Cap A18)
              <br />
              vi. The venue of the arbitration shall be Lagos State, Nigeria
              <br />
              vii. The language to be used in the arbitral proceedings shall be
              English
              <br />
              viii. The Parties agree that the decision of the Arbitrator shall
              be final and binding on both Parties
              <br />
              ix. This clause shall survive the termination of this Agreement
              and shall accordingly apply at all times to disputes and
              differences of opinion existing or arising between the Parties
              concerning this Agreement or any matter under this Agreement.
            </span>
          </span>

          <span className="flex mt-8">
            <b>26.</b>
            <span className="mr-3" />
            <span>
              <b>Standard of Care/Limitation of Liability</b>
              <br />
              i. The Portfolio Manager shall, in carrying out its obligations
              under this Agreement, act honestly, in good faith and in the best
              interests of the Investor and in connection therewith shall
              exercise the degree of care, diligence and skill that a reasonably
              prudent Portfolio Manager would exercise in similar circumstances.
              Notwithstanding the foregoing, the Investor understands and agrees
              that the Portfolio Manager does not represent and cannot guarantee
              performance results for the investment.
              <br />
              ii. The Investor understands that there are risks attached to
              investment in digital assets, to this end, the Portfolio Manager
              will not be liable to the investor for any loss that the investor
              may suffer as a result of the Manager’s good faith decisions or
              actions where the Manager exercises reasonable care, diligence and
              skill expected of a reasonably prudent Portfolio Manager.
            </span>
          </span>

          <span className="flex mt-8">
            <b>27.</b>
            <span className="mr-3" />
            <span>
              <b>Risk Disclosure and Acceptance.</b>
              <br />
              The investor hereby agrees to undertake the risks pertaining to
              the portfolio investments as stated herein:
              <br />
              i. Investments in cryptocurrency are subject to market risks and
              there is no assurance or guarantee that the objectives of the
              investments will be achieved.
              <br />
              ii. As with any investment, the value of the portfolio can go up
              or down depending on the factors and forces affecting the digital
              asset market and the Portfolio Manager is not responsible or
              liable for losses resulting from the operations of the portfolios
              (with exception to trading portfolio where 20% stop loss is
              agreed), to the extent that such loss is not as a result of the
              Portfolio Manager’s action, inaction or any form of negligence.
              <br />
              iii. The investor understands and acknowledges that past
              performance is not necessarily indicative of likely future
              performance.
            </span>
          </span>

          <span className="flex mt-8">
            <b>28.</b>
            <span className="mr-3" />
            <span>
              <b>Protection of Act done in good faith.</b>
              <br />
              i. The Portfolio Manager shall not be under any liability on
              account of anything done or omitted to be done or suffered by the
              investor in good faith in accordance with or in pursuance of any
              request or advice of the investments made by the Portfolio Manager
              or any agents.
              <br />
              ii. We shall not be liable to loss in investment due to Act of
              God, cyber-attack, hacking of our site or third party where we
              store your cryptocurrency, unforeseen circumstances beyond our
              control, government (whether in Nigeria or outside Nigeria) policy
              affecting the use, acceptance and trading of cryptocurrency, fall
              in price of cryptocurrency, the sudden disappearance or sudden
              stoppage in the acceptance and usage of cryptocurrency.
            </span>
          </span>
          <span className="flex mt-8">
            <b>29.</b>
            <span className="mr-3" />
            <span>
              <b>Disclaimer/Disclosure.</b>
              <br />
              The investment services provided by CryptoLife Capital is
              unregulated by any government agencies.
            </span>
          </span>
          <span className="flex mt-8">
            <b>30.</b>
            <span className="mr-3" />
            <span>
              <b>Miscellaneous</b>
              <br />
              i. The failure or delay by us to exercise or enforce any right or
              provision of these agreement shall not constitute a waiver of such
              right or provision in that or any other instance.
              <br />
              ii. Where any clause in this agreement is held to be
              unenforceable, shall struck out clause shall not invalidate this
              agreement.
            </span>
          </span>
          <span className="flex mt-8">
            <b>31.</b>
            <span className="mr-3" />
            <span>
              <b>Contact</b>
              <br />
              If you have any questions about these terms, please contact us:
            </span>
          </span>
        </div>
      </Modal>
      <Modal
        heading="Privacy Policy"
        isVisible={showPrivacy}
        onClose={() => setShowPrivacy(false)}>
        <div className="mx-3">
          <ol className="list-decimal">
            <li>
              Our privacy policy relates to the privacy of your information with
              us at Cryptolife Capital Ltd (hereinafter referred to as
              Cryptolife). Cryptolife is committed to keeping your information
              private. By `&apos;`your information`&apos;` we mean any
              information about you that you or third parties provide to us.
              This policy explains the principles that Cryptolife applies to the
              processing of personal information, the rights that you have
              pertaining to your personal information, what personal information
              is collected, why we are processing it and who we may sharing it
              with.
            </li>
            <li>
              <p className="py-5 font-bold text-xl">PRIVACY PRINCIPLES.</p>
              <p>
                Cryptolife is committed to safeguarding the privacy of your
                information in the following ways:
              </p>
              <ul className="list-disc">
                <li>
                  We will only collect and use your information where we have
                  lawful grounds and legitimate business reasons to do so.
                </li>
                <li>
                  We will be transparent in our dealings with you and will tell
                  you about how we will collect and use your information.
                </li>
                <li>
                  If we have collected your information for a particular
                  purpose, we will not use it for anything else unless you have
                  been informed and, where relevant, your permission obtained.
                </li>
                <li>
                  We will not ask for more information than we need for the
                  purposes for which we are collecting it.
                </li>
                <li>
                  We will update our records when you inform us that your
                  details have changed.
                </li>
                <li>
                  We will continue to review and assess the quality of our
                  information system collection.
                </li>
                <li>
                  We will implement and adhere to information retention policies
                  relating to your information, and will ensure that your
                  information is securely disposed of at the end of the
                  appropriate retention period.
                </li>
                <li>
                  We will observe the rights granted to you under applicable
                  privacy and data protection laws, and will ensure that queries
                  relating to privacy issues are promptly and transparently
                  dealt with.
                </li>
                <li>We will train our staff on their privacy obligations.</li>
                <li>
                  We will ensure we have appropriate physical and technological
                  security measures to protect your information regardless of
                  where it is held.
                </li>
                <li>
                  We will ensure that when we outsource any processes, the
                  supplier has appropriate security measures in place and will
                  contractually require them to comply with these privacy
                  principles.
                </li>
                <li>
                  We will ensure that suitable safeguards are in place before
                  personal information is transferred to other
                  countries/third-party.
                </li>
              </ul>
            </li>
            <li className="mt-5">
              <p className="font-bold text-xl">
                Data Collected and How we Collect them.
              </p>
              <div className="ml-3">
                <p>
                  i. We may collect, use, store and transfer different kinds of
                  Personal Data about you which we have grouped together as
                  follows:
                  <br />
                  ii. Identity Data includes names, username, date of birth,
                  passport photo and gender, Government issued ID, payment
                  account information etc.
                  <br />
                  iii. Contact Data includes residential address, next of kin
                  information, email address and telephone numbers. iv.
                  Technical Data includes internet protocol (IP) address, your
                  login device, browser type and version, time zone setting and
                  location, browser plug-in types and versions, operating system
                  and platform, Website usage through cookies and logs of
                  activities during visit and other technology on the devices
                  you use to access this website.
                  <br />
                  v. Usage Data includes information about how you use our
                  website and services.
                  <br />
                  vi. Marketing and Communications Dataincludes your preferences
                  in receiving
                  <br />
                  marketing communications from us and our Affiliated Third
                  Parties and your communication preferences.
                  <br />
                  vii. You provide this information through direct interaction
                  when you visit our website, sign up to our newsletters or
                  publications, request marketing materials to be sent to you,
                  respond to surveys, complete our feedback or comment form,
                  provide your business card to any of our staff, sign our
                  visitor management form, complete other forms, apply for
                  employment through our careers page, or contact us to request
                  for any information or other correspondence by post, email,
                  our website or otherwise.
                  <br />
                  viii. As you interact with our website/app, we will
                  automatically collect technical data about your equipment,
                  browsing actions and patterns. We collect this data by using
                  cookies, and other similar technologies. Please see our cookie
                  policy for further details.
                  <br />
                  ix. We do not intentionally or knowingly collect any Sensitive
                  Personal Data. We ask that you do not send to us nor disclose
                  such Sensitive Personal Data save where required for a
                  specific purpose.
                </p>
              </div>
            </li>
            <li className="mt-5">
              <p className="font-bold text-xl">
                Your Personal Data and how it is Used.
              </p>
              <p>
                Primarily, we collect, process and store your Personal Data to
                help us better connect with you. The following are the purposes
                for which we collect your Personal Data:
              </p>
              <ol className="ml-3 list-disc">
                <li>
                  To verify tour account in accordance with KYC and AML laws.
                </li>
                <li>
                  To monitor, review, evaluate and improve your experience when
                  you visit our website/app.
                </li>
                <li>
                  To analyse the traffic on our website, including determining
                  the number of visitors to the website and analyse how they
                  navigate the website.
                </li>
                <li>
                  To better manage our business and your relationship with us;
                </li>
                <li>
                  To invite you to complete a survey or provide feedback to us
                  on specific matters.
                </li>
                <li>
                  At any time, you request information from us via a form or
                  other electronic transmission we may use your Personal Data to
                  fulfil that request and keep a record of such request and how
                  it was handled, for quality assurance and service improvement
                  purposes.
                </li>
                <li>
                  To improve our products and services and to develop new
                  products and services;
                </li>
                <li>
                  To keep you updated on our activities, programmes and events
                  where your explicit consent has been given.
                </li>
                <li>
                  To notify you of changes to our websites/app or relevant
                  processes.
                </li>
                <li>
                  to notify you about benefits and changes to the features of
                  products and services;
                </li>
                <li>
                  To administer offers, competitions and promotions; to respond
                  to your enquiries and complaints and to generally resolve
                  disputes;
                </li>
                <li>
                  to update, consolidate and improve the accuracy of our
                  records; to produce data, reports and statistics which have
                  been anonymised or aggregated in a manner that does not
                  identify you as an individual;
                </li>
                <li>
                  to conduct research for analytical purposes including but not
                  limited to data mining and analysis of your transactions with
                  us; to meet the disclosure requirements of any law binding on
                  us;
                </li>
                <li>
                  We may also use your information or allow Affiliated Third
                  Parties such as our affiliate companies or partners use of
                  this Personal Data, to offer you information about unrelated
                  products or services you may be interested in. We or such
                  Affiliated Third Parties can only communicate with you if you
                  have expressly consented to such communication and data use.
                </li>
                <li>
                  We may share your personal data with Affiliated Third Parties
                  such as service providers who we have engaged to assist with
                  providing certain services on our behalf, for which they
                  require your personal data.
                </li>
                <li>
                  Where we have any contracts with you which create a
                  commitment, we may require contact or use of your information
                  to perform the contract.
                </li>
                <li>
                  To process or manage your appointments with any of our staff.
                </li>
                <li>
                  To fulfil legal/ regulatory obligations or to report any
                  criminal or unethical activity.
                </li>
                <li>
                  To store either on our central computer system or a
                  third-party Computer’s central computer system for archiving
                  and back up purposes.
                </li>
                <li>
                  Be aware that we do not reveal identifiable information about
                  you to our advertisers, though we may at times share
                  statistical visitor information with our advertisers.
                </li>
                <li>
                  for audit, compliance and risk management purposes; to assess
                  financial and insurance risks;
                </li>
                <li>
                  to conduct anti-money laundering checks; for crime detection,
                  prevention and prosecution;
                </li>
                <li>
                  to comply with any sanction requirements; for any other
                  purpose that is required or permitted by any law, regulations,
                  guidelines or relevant regulatory authorities
                </li>
              </ol>
            </li>
            <li className="mt-5">
              <p className="font-bold text-xl">Change of Purpose:</p>
              <p>
                We will only use your Personal Data for the aforementioned
                purposes, unless we reasonably consider that we need to use it
                for another reason and that reason is compatible with the
                original purpose. If you wish to get an explanation as to how
                the processing for the new purpose is compatible with the
                original purpose, please contact us. <br />
                If we need to use your Personal Data for an unrelated purpose,
                we will notify you and request for your express consent.
              </p>
            </li>
            <li className="mt-5">
              <p className="font-bold text-xl">YOUR RIGHTS.</p>
              <b>i. Right to be Informed</b> <br />
              You have the right to be informed regarding what personal
              information is collected, why we are processing it and who we are
              sharing it with. In the most part, this information will be
              provided to you at the time that we establish a relationship with
              you by opening an account. This information will be supplemented
              by any additional specific communications that are necessary at
              that time or shortly thereafter. We will also publish our privacy
              policy on the Cryptolife Capital website and this will be updated
              periodically.
              <br />
              <b>ii. Right of Access to Your Personal Data.</b>
              <br />
              You have the right to access information held about you. In order
              to exercise this right, you must complete a subject access request
              that should be submitted to hello@cryptolife.capital. Once
              received, we will respond within 28 days confirming whether or not
              we are processing your personal data and will give you access to
              that data in electronic format. No fee will apply for such
              requests.
              <br />
              <b>iii. Right to Restrict Processing of Your Personal Data.</b>
              <br />
              You have the right to request the restriction of processing of
              your personal information. This enables you to ask us to suspend
              the processing of personal information about you, for example, if
              you want us to establish its accuracy or the reason for processing
              it.
              <br />
              <b>iv. Right to Portability of Your Personal Data.</b>
              <br />
              You have the right to request the transfer of your personal
              information to another party in certain formats, if practicable.
              This allows you to obtain and reuse your personal data for your
              own purposes across different services.
              <b>v. Right to Object.</b>
              <br />
              You have the right to object to processing of your personal
              information where there is something about your particular
              situation which makes you want to object to processing. You also
              have the right to object where we are processing your personal
              information for direct marketing purposes. You can at any time
              tell us not to send you marketing communications by e-mail by
              clicking on the unsubscribe link within any marketing e-mails you
              receive from us or by contacting us as indicated below.
              <br />
              <b>vi. Right to Have Your Personal Data Erased.</b>
              <br />
              You have the right to be forgotten and can request erasure of your
              personal information. This enables you to ask us to delete or
              remove personal information where there is no good reason for us
              continuing to process it. You also have the right to ask us to
              delete or remove your personal information where you have
              exercised your right to object to processing (see below).
              <b>vii. Right to Rectification of Your Personal Data.</b>
              <br />
              Cryptolife endeavours to ensure that all personal information is
              complete and accurate at all times. If, however, you determine
              that the personal information we hold about you is incomplete or
              inaccurate, you have the right to request correction of that
              personal information.
              <br />
              <b>viii. Right to Make a Complaint</b>
              <br />
              If we fall short of your expectations in processing your personal
              information or you wish to make a complaint about our privacy
              practices, please tell us because it gives us an opportunity to
              fix the problem. You may contact us by submitted your complaint to
              hello@cryptolife.capital to assist us in responding to your
              request, please give full details of the issue. You may exercise
              any of the above stated rights following our{' '}
              <b>Data Subject Access Request Procedure</b>
              <br />
            </li>
            <li className="mt-5">
              <p className="font-bold text-xl">
                Persons who have access to your Personal Data
              </p>
              In addition to our staff who have a business need to know, the
              following trusted third parties have access to your information:{' '}
              <br />
              a. We use a customer relationship management tool to help manage
              our contact database and send out email communications to you.{' '}
              <br />
              b. Our Affiliate Third Parties who require your information for
              the same purposes described in this Policy and who have adopted
              similar privacy policy standards further to contractual
              obligations to us under a third-party data processing agreement we
              have entered with them. <br />
              c. Professional service providers such as IT service providers and
              website hosts. <br /> <br />
              We will transfer your Personal Data to only those Affiliated Third
              Parties who we are sure can offer the required level of protection
              to your privacy and information and who are also contractually
              obligated to us to do so. We do not and will not at any point in
              time sell your Personal Data. We require all Affiliated Third
              Parties to respect the security of your personal data and to treat
              it in accordance with the law. We do not allow our professional
              service providers to use your Personal Data for their own purposes
              and only permit them to process your Personal Data for specified
              purposes and in accordance with our instructions.
            </li>
            <li className="mt-5">
              <p className="font-bold text-xl">Security & Confidentiality</p>
              Information submitted by you is stored on secure servers we have
              which are encrypted and access is restricted to only authorised
              persons in charge of maintaining the servers. We have put in place
              physical, electronic and procedural processes that safeguard and
              protect your information against unauthorised access, modification
              or erasure. However, we cannot guarantee 100% security as no
              security programme is completely fool proof. In the unlikely event
              that we experience any breach to your personal data, such breach
              shall be handled in accordance with our Personal Data Breach
              Management Procedures. Our staff also have an obligation to
              maintain the confidentiality of any Personal Data held by us.{' '}
              <br />
              As you know, transmission of data on the internet is never
              guaranteed regarding safety. It is impossible to completely
              guarantee your safety with electronic data and transmission. You
              are therefore at your own risk if you elect to transmit any data
              electronically.
            </li>
            <li className="mt-5">
              <p className="font-bold text-xl">
                Transfer of Personal Data outside Nigeria
              </p>
              The Personal Data we collect may be transferred to and processed
              in another country other than your country of residence for the
              purposes stated above. The data protection laws in those countries
              may be different from, and less stringent than the laws applicable
              in your country of residence. <br />
              By accepting this Policy or by providing your Personal Data to us,
              you expressly consent to such transfer and Processing. We will
              however take all reasonable steps to ensure that your data is
              treated securely and transfer of your Personal Data will only be
              done in accordance with the requirements of applicable laws and to
              parties who have put in place adequate controls to secure and
              protect your Personal Data.
            </li>
            <li className="mt-5">
              <p className="font-bold text-xl">Retention of Personal Data</p>
              We retain your Personal Data for no longer than reasonably
              necessary for the purposes set out in this Policy and in
              accordance with legal, regulatory, tax, accounting or reporting
              requirements. We may retain your Personal Data for a longer period
              in the event of a complaint or if we reasonably believe there is a
              prospect of litigation in respect to our relationship with you.{' '}
              <br />
              To determine the appropriate retention period for personal data,
              we consider the amount, nature and sensitivity of the Personal
              Data, the potential risk of harm from unauthorised use or
              disclosure of your Personal Data, the purposes for which we
              process your Personal Data and whether we can achieve those
              purposes through other means, and the applicable legal,
              regulatory, tax, accounting or other requirements.
              <br />
              Where your Personal Data is contained within a document, the
              retention period applicable to such type of document in our
              document retention policy shall apply.
            </li>
            <li className="mt-5">
              <p className="font-bold text-xl">Third Party Links</p>
              This website or our email communication may include links to third
              party websites, plug-ins and applications. Clicking on those links
              or enabling those connections may allow third parties to collect
              or share data about you. We do not control these third-party
              websites and are not responsible for their privacy statements.
              When you leave our website, we encourage you to read the privacy
              policy of every website you visit.
            </li>
            <li className="mt-5">
              ThisPrivacyPolicymaybeupdatedperiodicallyandwithoutpriornoticetoyoutoreflectchanges
              in our personal information practices. We will post a prominent
              notice on relevant websites to notify you of any significant
              changes to our Privacy Policy and indicate at the top of the
              Policy when it was most recently updated. If we update our Privacy
              Policy, in certain circumstances, we may seek your consent.
            </li>
            <li>
              Contact Us. <br />
              hello@cryptolife.capital
            </li>
          </ol>
        </div>
      </Modal>
      <div className="h-full display-none md:flex justify-center flex-col">
        <div className="md:px-20">
          <div className="max-w-lg">
            <Carousel
              className="mb-5"
              // enableAutoPlay
              // autoPlaySpeed={3000}
              renderPagination={({activePage, onClick}) => (
                <div className="flex mt-24">
                  <span
                    className={cn('mr-2 w-7 h-1 cursor-pointer', {
                      'bg-primary': activePage === 0,
                      'bg-fade-ash': activePage !== 0,
                    })}
                    onClick={() => onClick('0')}
                  />
                  <span
                    className={cn('mr-2 w-7 h-1 cursor-pointer', {
                      'bg-primary': activePage === 1,
                      'bg-fade-ash': activePage !== 1,
                    })}
                    onClick={() => onClick('1')}
                  />
                  <span
                    className={cn('w-7 h-1 cursor-pointer', {
                      'bg-primary': activePage === 2,
                      'bg-fade-ash': activePage !== 2,
                    })}
                    onClick={() => onClick('2')}
                  />
                </div>
              )}
              showArrows={false}
              isRTL={false}
              itemsToShow={1}>
              {slides.map(({key, img, text, title}) => (
                <Item key={key} img={img} text={text} title={title} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-20 bg-light-gray h-full flex flex-col items-center justify-center">
        <div className="flex flex-col max-w-lg mx-auto w-full items-center justify-center">
          <img src={logo} alt="" className="mb-20 w-32" />
          <Text className="mb-10 text-center">
            By creating an account, you agree to <br /> our{' '}
            <span
              className="text-primary cursor-pointer"
              onClick={() => {
                setShowTerms(true);
              }}>
              {' '}
              Terms of Service{' '}
            </span>{' '}
            and{' '}
            <span
              className="text-primary cursor-pointer"
              onClick={() => {
                setShowPrivacy(true);
              }}>
              Privacy Policy{' '}
            </span>
          </Text>
          {/* <AuthButton icon={<img src={google} alt="" />}>
            Continue with Google
          </AuthButton>
          <Spacer size={10} />
          <AuthButton icon={<img src={apple} alt="" />}>
            Continue with Apple ID
          </AuthButton>
          <Text className="my-10 text-center">-OR-</Text> */}
          <Link
            className="w-full"
            to={`${screens.createAccount}${screens.selectCountry}`}>
            <Button onClick={() => true}>Create my account</Button>
          </Link>
          <Spacer size={10} />
          <Link to="/login">
            <button
              type="button"
              className="font-bold py-5 px-3 text-primary text-sm"
              onClick={() => true}>
              Login to my account
            </button>
          </Link>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Welcome;
