import React, { ReactNode } from "react";
import { FileText, ShieldCheck, HelpCircle } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface LegalDrawerProps {
  children: ReactNode;
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

const LegalDrawer = ({ children, title, icon, content }: LegalDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="bg-[#121212] text-white border-t border-gray-800 max-h-[70vh]">
        <div className="max-w-4xl mx-auto w-full">
          <DrawerHeader className="text-left">
            <div className="flex items-center">
              <span className="text-primary mr-2">{icon}</span>
              <DrawerTitle className="text-xl font-playfair">{title}</DrawerTitle>
            </div>
          </DrawerHeader>

          <div className="px-4 pb-4 overflow-y-auto max-h-[calc(70vh-140px)]">
            {content}
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="border-gray-700 hover:bg-[#2a2a2a] hover:text-white">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// Terms & Conditions Drawer
export const TermsConditionsDrawer = ({ children }: { children: ReactNode }) => {
  return (
    <LegalDrawer
      title="Terms & Conditions"
      icon={<FileText className="h-5 w-5" />}
      content={
        <div className="space-y-4 text-gray-300">
          <p>Last updated: May 11, 2023</p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">1. Introduction</h3>
            <p>
              Welcome to Luxury Watches. These Terms and Conditions govern your access to and use of
              our website, mobile application, and services. By accessing or using our services,
              you agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>

            <h3 className="text-lg font-semibold text-white">2. Definitions</h3>
            <p>
              "Website" refers to Luxury Watches accessible via www.luxurywatches.com
              <br />
              "User," "You," and "Your" refer to individuals accessing or using our Services.
              <br />
              "Company," "We," "Us," and "Our" refer to Luxury Watches.
              <br />
              "Product" refers to watches and accessories sold through our Services.
            </p>

            <h3 className="text-lg font-semibold text-white">3. Products and Authentication</h3>
            <p>
              All watches sold through our platform undergo rigorous authentication by certified experts.
              We guarantee the authenticity of every timepiece we sell.
              <br /><br />
              We provide detailed information about each product, including condition, specifications,
              and provenance where applicable. Any visible flaws or imperfections will be noted in the product description.
            </p>

            <h3 className="text-lg font-semibold text-white">4. Orders and Payments</h3>
            <p>
              By placing an order, you agree to provide current, complete, and accurate purchase information.
              <br /><br />
              We accept various payment methods as specified on our checkout page. All payments are processed
              securely through our payment partners.
            </p>

            <h3 className="text-lg font-semibold text-white">5. Shipping and Delivery</h3>
            <p>
              All orders are insured for the full purchase value during transit.
              Delivery timeframes are estimates and not guaranteed.
              <br /><br />
              International customers are responsible for any customs duties, taxes, or import fees.
            </p>

            <h3 className="text-lg font-semibold text-white">6. Returns and Refunds</h3>
            <p>
              We offer a 14-day return policy for unworn and undamaged items.
              Items must be returned in their original packaging with all accompanying documentation.
              <br /><br />
              Refunds will be issued to the original payment method within 10 business days of receiving the returned item.
            </p>
          </div>
        </div>
      }
    >
      {children}
    </LegalDrawer>
  );
};

// Privacy Policy Drawer
export const PrivacyPolicyDrawer = ({ children }: { children: ReactNode }) => {
  return (
    <LegalDrawer
      title="Privacy Policy"
      icon={<ShieldCheck className="h-5 w-5" />}
      content={
        <div className="space-y-4 text-gray-300">
          <p>Last updated: May 11, 2023</p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">1. Introduction</h3>
            <p>
              Luxury Watches ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit our website
              or use our services.
            </p>

            <h3 className="text-lg font-semibold text-white">2. Information We Collect</h3>
            <p>
              <strong className="text-white">Personal Data:</strong> We collect personal information that you voluntarily provide to us when registering,
              expressing interest in our products or services, or otherwise contacting us. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name, email address, phone number, and shipping address</li>
              <li>Payment information (processed securely by our payment partners)</li>
              <li>Purchase history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>

            <h3 className="text-lg font-semibold text-white">3. How We Use Your Information</h3>
            <p>We may use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process orders and complete transactions</li>
              <li>Send you product and service updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website, products, and services</li>
              <li>Send promotional emails about new products or special offers</li>
              <li>Protect against fraudulent transactions and unauthorized access</li>
            </ul>

            <h3 className="text-lg font-semibold text-white">4. Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal data against unauthorized
              access, alteration, disclosure, or destruction. However, no method of transmission over the
              internet or electronic storage is 100% secure.
            </p>

            <h3 className="text-lg font-semibold text-white">5. Third-Party Disclosure</h3>
            <p>
              We do not sell or rent your personal information to third parties. We may share your information with
              trusted service providers who assist us in operating our website, conducting our business, or servicing you.
            </p>

            <h3 className="text-lg font-semibold text-white">6. Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your personal data. You may also object to
              or restrict certain processing of your data or request portability of your data.
              <br /><br />
              To exercise these rights, please contact us using the information provided below.
            </p>
          </div>
        </div>
      }
    >
      {children}
    </LegalDrawer>
  );
};

// FAQ Drawer
export const FAQDrawer = ({ children }: { children: ReactNode }) => {
  const faqs = [
    {
      question: "How do I know the watches are authentic?",
      answer: "Every watch we sell undergoes rigorous authentication by our certified experts. We provide detailed information about each timepiece, including its condition, specifications, and provenance. We also offer a certificate of authenticity with each purchase."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 14-day return policy for unworn and undamaged items. The watch must be returned in its original packaging with all accompanying documentation. Refunds will be issued to the original payment method within 10 business days of receiving the returned item."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide. International customers are responsible for any customs duties, taxes, or import fees that may apply. All shipments are fully insured for the full purchase value during transit."
    },
    {
      question: "How does your warranty work?",
      answer: "All our watches come with a 24-month warranty covering manufacturing defects. This warranty does not cover damage from accidents, misuse, or normal wear and tear. Our in-house watchmakers provide premium service for maintenance and repairs."
    },
    {
      question: "Can I sell my watch to Luxury Watches?",
      answer: "Yes, we offer a watch buying service. You can submit details about your timepiece through our 'Sell Your Watch' page. Our experts will evaluate your watch and provide a competitive offer based on its condition, model, and current market value."
    },
    {
      question: "Do you offer watch servicing?",
      answer: "Yes, our certified watchmakers provide comprehensive servicing for luxury timepieces. Services include movement service, water resistance testing, polishing, and more. Please contact our customer service team for details and pricing."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also check your order status by logging into your account on our website or contacting our customer service team."
    },
    {
      question: "Are the prices negotiable?",
      answer: "Our prices reflect the fair market value of each timepiece. While we generally maintain our listed prices, we occasionally offer promotions or special discounts to our newsletter subscribers."
    }
  ];

  return (
    <LegalDrawer
      title="Frequently Asked Questions"
      icon={<HelpCircle className="h-5 w-5" />}
      content={
        <div className="text-gray-300">
          <Accordion type="single" collapsible className="border-gray-800">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
                <AccordionTrigger className="text-white hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      }
    >
      {children}
    </LegalDrawer>
  );
};