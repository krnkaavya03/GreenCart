const FAQ = () => {
    const faqs = [
      {
        question: "What is GreenCart?",
        answer: "GreenCart is an India-based global grocery platform delivering fresh produce, daily essentials, and imported products to your doorstep with speed and reliability."
      },
      {
        question: "Where do you deliver?",
        answer: "We currently offer delivery services in selected worldwide city ports, with plans to expand rapidly. You can check delivery availability by entering your pin code at checkout."
      },
      {
        question: "How fast is the delivery?",
        answer: "We offer 30-mins delivery in select locations to 1-day delivery based on your city and product availability."
      },
      {
        question: "Are your products fresh?",
        answer: "Yes, we source directly from globally trusted farms and suppliers to ensure premium freshness and quality."
      },
      {
        question: "Do you offer imported goods?",
        answer: "Absolutely. We have a wide range of globally-sourced products including snacks, staples, and gourmet items."
      },
      {
        question: "How do I track my order?",
        answer: "Once your order is confirmed, you’ll receive a tracking link via SMS and email. You can also track it on our website under the 'My Orders' section."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept credit/debit cards and Pay-by-Link payment method. Cash on Delivery is also available in certain areas."
      },
      {
        question: "What is your return policy?",
        answer: "If you’re not satisfied with your order, either reach out to us through our GreenCart Support Assistant or contact us through our mail Id support@greencart.com within 24 hours for assistance. We’re committed to customer happiness."
      },
      {
        question: "How do I cancel my order?",
        answer: "Orders can be cancelled from your account dashboard before they are packed. If you face any issues, our customer support team is here to help."
      },
      {
        question: "Is there a minimum order value?",
        answer: "Some cities may have a minimum order value for free delivery. You’ll see the applicable details during checkout."
      },
      {
        question: "Do you have a mobile app?",
        answer: "Yes! Our mobile app is launching soon on Android and iOS for an even easier shopping experience."
      },
      {
        question: "How do I contact customer support?",
        answer: "You can reach us through our Help Center No.+91 97543 18790 or by emailing support@greencart.com. Our team is available 7 days a week."
      },
      {
        question: "What if a product is out of stock?",
        answer: "If an item is out of stock, we notify you and either refund the amount or offer replacements as per your preference."
      },
      {
        question: "Do you offer any subscription or savings plans?",
        answer: "We are working on subscription models for regular essentials and discounts. Stay tuned for updates on our website and app."
      },
      {
        question: "How do I update my address or contact information?",
        answer: "Log in to your account, navigate to the 'My Profile' section, and update your address or contact details anytime."
      }
    ];
  
    return (
      <div className="faq-container px-6 md:px-16 lg:px-24 xl:px-32 py-10 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h2 className="text-xl font-semibold text-green-700">{faq.question}</h2>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
};
  
export default FAQ;
  