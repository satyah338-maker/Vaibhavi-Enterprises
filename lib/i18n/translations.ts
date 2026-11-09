export type Language = "en" | "hi" | "mr";

export interface Translations {
  nav: {
    home: string;
    products: string;
    about: string;
    contact: string;
    enquiry: string;
    getQuote: string;
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    requestQuote: string;
    aboutUs: string;
  };
  stats: {
    yearEstablished: string;
    yearsExperience: string;
    solutions: string;
    clientsServed: string;
  };
  products: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  industries: {
    title: string;
    subtitle: string;
  };
  whyUs: {
    title: string;
    subtitle: string;
  };
  clients: {
    title: string;
    subtitle: string;
  };
  cta: {
    title: string;
    description: string;
    sendEnquiry: string;
    callUs: string;
  };
  enquiry: {
    title: string;
    subtitle: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    product: string;
    quantity: string;
    requirements: string;
    submit: string;
    success: string;
    error: string;
  };
  common: {
    readMore: string;
    backToHome: string;
    requestAQuote: string;
    contactUs: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact",
      enquiry: "Enquiry",
      getQuote: "Get a Quote",
    },
    hero: {
      tagline: "Est. 1989 · Mumbai, India",
      title: "Protecting Surfaces. Enabling Industry.",
      description:
        "India's trusted source for Viflon fluoropolymer coatings and Vaicon porous plastic filters — engineered for the harshest industrial environments.",
      requestQuote: "Request a Quote",
      aboutUs: "About Us",
    },
    stats: {
      yearEstablished: "Year Established",
      yearsExperience: "Years of Experience",
      solutions: "Coating & Filter Solutions",
      clientsServed: "Clients Served",
    },
    products: {
      title: "Our Products & Services",
      subtitle:
        "High-performance industrial coatings and filtration solutions organized by application.",
      viewAll: "View All Products",
    },
    industries: {
      title: "Industries We Serve",
      subtitle:
        "Our coatings and filters are trusted across a broad spectrum of demanding industrial sectors.",
    },
    whyUs: {
      title: "Why Choose Vaibhavi Enterprises?",
      subtitle:
        "Decades of expertise, certified quality, and a commitment to solving your toughest surface challenges.",
    },
    clients: {
      title: "Trusted by Industry Leaders",
      subtitle:
        "Proud to serve leading industrial organisations across Maharashtra and India.",
    },
    cta: {
      title: "Ready to Protect Your Components?",
      description:
        "Talk to our coating experts. We'll recommend the right solution for your substrate, environment, and performance requirements.",
      sendEnquiry: "Send an Enquiry",
      callUs: "Call Us",
    },
    enquiry: {
      title: "Request a Quote",
      subtitle:
        "Fill in your requirements below and our technical team will respond within 24 hours with a customised solution.",
      name: "Full Name",
      company: "Company Name",
      email: "Email",
      phone: "Phone",
      product: "Product",
      quantity: "Quantity",
      requirements: "Specific Requirements",
      submit: "Submit Enquiry",
      success:
        "Thank you! Your enquiry has been submitted. We'll get back to you within 24 hours.",
      error: "There was an error submitting your enquiry. Please try again.",
    },
    common: {
      readMore: "Read More",
      backToHome: "Back to Home",
      requestAQuote: "Request a Quote",
      contactUs: "Contact Us",
      phone: "Phone",
      email: "Email",
      address: "Address",
      hours: "Business Hours",
    },
  },
  hi: {
    nav: {
      home: "होम",
      products: "उत्पाद",
      about: "हमारे बारे में",
      contact: "संपर्क",
      enquiry: "जांच",
      getQuote: "कोटेशन लें",
    },
    hero: {
      tagline: "स्थापना 1989 · मुंबई, भारत",
      title: "सतहों की सुरक्षा। उद्योग को सक्षम बनाना।",
      description:
        "भारत का विश्वसनीय स्रोत Viflon फ्लोरोपॉलिमर कोटिंग्स और Vaicon पोरस प्लास्टिक फिल्टर्स के लिए — सबसे कठोर औद्योगिक वातावरण के लिए इंजीनियर किया गया।",
      requestQuote: "कोटेशन का अनुरोध करें",
      aboutUs: "हमारे बारे में",
    },
    stats: {
      yearEstablished: "स्थापना वर्ष",
      yearsExperience: "वर्षों का अनुभव",
      solutions: "कोटिंग और फिल्टर समाधान",
      clientsServed: "सेवित ग्राहक",
    },
    products: {
      title: "हमारे उत्पाद और सेवाएं",
      subtitle:
        "उच्च-प्रदर्शन औद्योगिक कोटिंग्स और निस्पंदन समाधान अनुप्रयोग के अनुसार संगठित।",
      viewAll: "सभी उत्पाद देखें",
    },
    industries: {
      title: "हम जिन उद्योगों की सेवा करते हैं",
      subtitle:
        "हमारे कोटिंग्स और फिल्टर्स मांग वाले औद्योगिक क्षेत्रों की एक विस्तृत श्रृंखला में भरोसेमंद हैं।",
    },
    whyUs: {
      title: "वैभवी एंटरप्राइजेज क्यों चुनें?",
      subtitle:
        "दशकों की विशेषज्ञता, प्रमाणित गुणवत्ता, और आपके सबसे कठोर सतह चुनौतियों को हल करने की प्रतिबद्धता।",
    },
    clients: {
      title: "उद्योग के नेताओं द्वारा भरोसेमंद",
      subtitle:
        "महाराष्ट्र और भारत में अग्रणी औद्योगिक संगठनों की सेवा करने पर गर्व।",
    },
    cta: {
      title: "अपने घटकों की सुरक्षा करने के लिए तैयार?",
      description:
        "हमारे कोटिंग विशेषज्ञों से बात करें। हम आपके सब्सट्रेट, वातावरण और प्रदर्शन आवश्यकताओं के लिए सही समाधान की सिफारिश करेंगे।",
      sendEnquiry: "जांच भेजें",
      callUs: "कॉल करें",
    },
    enquiry: {
      title: "कोटेशन का अनुरोध करें",
      subtitle:
        "नीचे अपनी आवश्यकताएं भरें और हमारी तकनीकी टीम 24 घंटे के भीतर एक अनुकूलित समाधान के साथ जवाब देगी।",
      name: "पूरा नाम",
      company: "कंपनी का नाम",
      email: "ईमेल",
      phone: "फोन",
      product: "उत्पाद",
      quantity: "मात्रा",
      requirements: "विशिष्ट आवश्यकताएं",
      submit: "जांच जमा करें",
      success:
        "धन्यवाद! आपकी जांच जमा कर दी गई है। हम 24 घंटे के भीतर जवाब देंगे।",
      error: "आपकी जांच जमा करने में त्रुटि हुई। कृपया पुनः प्रयास करें।",
    },
    common: {
      readMore: "अधिक पढ़ें",
      backToHome: "होम पर वापस",
      requestAQuote: "कोटेशन का अनुरोध करें",
      contactUs: "संपर्क करें",
      phone: "फोन",
      email: "ईमेल",
      address: "पता",
      hours: "कार्य घंटे",
    },
  },
  mr: {
    nav: {
      home: "होम",
      products: "उत्पादे",
      about: "आमच्याबद्दल",
      contact: "संपर्क",
      enquiry: "तपासणी",
      getQuote: "कोटेशन घ्या",
    },
    hero: {
      tagline: "स्थापना 1989 · मुंबई, भारत",
      title: "पृष्ठभागांचे संरक्षण। उद्योग सक्षम करणे।",
      description:
        "भारताचा विश्वासार्ह स्रोत Viflon फ्लोरोपॉलिमर कोटिंग्स आणि Vaicon पोरस प्लास्टिक फिल्टर्स साठी — सर्वात कठोर औद्योगिक वातावरणासाठी अभियंत्रित।",
      requestQuote: "कोटेशनची मागणी करा",
      aboutUs: "आमच्याबद्दल",
    },
    stats: {
      yearEstablished: "स्थापना वर्ष",
      yearsExperience: "वर्षांचा अनुभव",
      solutions: "कोटिंग आणि फिल्टर उपाय",
      clientsServed: "सेवा प्रदान केलेले क्लायंट",
    },
    products: {
      title: "आमची उत्पादने आणि सेवां",
      subtitle:
        "उच्च-कार्यक्षमता औद्योगिक कोटिंग्स आणि निस्पंदन उपाय अनुप्रयोगानुसार आयोजित।",
      viewAll: "सर्व उत्पादने पहा",
    },
    industries: {
      title: "आम्ही ज्या उद्योगांना सेवा देतो",
      subtitle:
        "आमचे कोटिंग्स आणि फिल्टर्स मागणी असलेल्या औद्योगिक क्षेत्रांच्या विस्तृत श्रेणीत विश्वासार्ह आहेत।",
    },
    whyUs: {
      title: "वैभवी एंटरप्राइजेज निवडण्याचे कारण",
      subtitle:
        "दशकांचा अनुभव, प्रमाणित गुणवत्ता, आणि तुमच्या सर्वात कठोर पृष्ठभाग आव्हानांना सोडवण्याची वचनबद्धता।",
    },
    clients: {
      title: "उद्योग नेत्यांकडून विश्वासार्ह",
      subtitle:
        "महाराष्ट्र आणि भारतातील अग्रणी औद्योगिक संस्थांना सेवा देण्यावर अभिमान।",
    },
    cta: {
      title: "तुमच्या घटकांचे संरक्षण करण्यासाठी तयार?",
      description:
        "आमच्या कोटिंग तज्ज्ञांशी बोला। आम्ही तुमच्या सब्सट्रेट, वातावरण आणि कार्यक्षमता आवश्यकतांसाठी योग्य उपायाची शिफारस करू.",
      sendEnquiry: "तपासणी पाठवा",
      callUs: "कॉल करा",
    },
    enquiry: {
      title: "कोटेशनची मागणी करा",
      subtitle:
        "खालील तुमची आवश्यकता भरा आणि आमची तांत्रिक टीम 24 तासांमध्ये एक अनुकूलित उपायासह प्रतिसाद देईल.",
      name: "पूर्ण नाव",
      company: "कंपनीचे नाव",
      email: "ईमेल",
      phone: "फोन",
      product: "उत्पाद",
      quantity: "प्रमाण",
      requirements: "विशिष्ट आवश्यकता",
      submit: "तपासणी सादर करा",
      success:
        "धन्यवाद! तुमची तपासणी सादर केली गेली आहे. आम्ही 24 तासांमध्ये प्रतिसाद देऊ.",
      error: "तुमची तपासणी सादर करण्यात त्रुटी झाली. कृपया पुन्हा प्रयत्न करा.",
    },
    common: {
      readMore: "अधिक वाचा",
      backToHome: "होमवर परत जा",
      requestAQuote: "कोटेशनची मागणी करा",
      contactUs: "संपर्क साधा",
      phone: "फोन",
      email: "ईमेल",
      address: "पत्ता",
      hours: "व्यवसाय वेळ",
    },
  },
};