import { Button } from "@/Components/ui/button";
import Navbar from "../Components/Home/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/main";
import { useLocation, useNavigate } from "react-router-dom";
import UrlModal from "@/Components/Home/UrlModal";
import { motion } from "framer-motion";
import { FiZap, FiBarChart, FiShield, FiGlobe, FiArrowRight, FiCheck } from "react-icons/fi";


const Home = () => {

  const location = useLocation();

  const [url,seturl] = useState('');
  const {token} = useSelector((state:RootState) => state.User)
  const navigate = useNavigate();
  const [showModal,setshowModal] = useState( false);

  useEffect(() => {
    if (location.state) {
      seturl(location.state.InputUrl || '');
      setshowModal(location.state.showModal || false);
    }
  }, [location.state]);


  const submitHandler = async() => {

    if(!token){
      navigate('/signup',{state:{InputUrl:url}});
      return;
    }else{
         setshowModal(true);
    }
     
  }


  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <Navbar/>

        {/* Hero Section */}
        <motion.div 
          className="flex flex-col gap-8 items-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mt-12"
          >
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-6xl mx-auto font-poppins text-white leading-tight mb-4 text-center px-4">
              The Only URL Shortener You'll 
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> Ever Need!</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mt-4 md:mt-6 px-4 text-center">
              Transform your long URLs into powerful, trackable short links. Get detailed analytics and manage all your links in one place.
            </p>
          </motion.div>

          {/* URL Input Section */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8 items-center w-full max-w-4xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative flex-1 w-full">
              <input 
                type="text" 
                className="bg-slate-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 px-4 md:px-6 py-3 md:py-4 border border-slate-600/50 rounded-xl w-full text-white placeholder-slate-400 transition-all duration-300 hover:border-slate-500/70 text-sm md:text-base" 
                placeholder="Enter your long URL here..." 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => seturl(e.target.value)} 
                value={url} 
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 pointer-events-none"></div>
            </div>
            <Button 
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex items-center gap-2 w-full sm:w-auto" 
              onClick={submitHandler}
            >
              <FiZap className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Shorten Now!</span>
              <span className="sm:hidden">Shorten</span>
              <FiArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16 w-full max-w-7xl px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              {
                icon: <FiZap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Generate short URLs instantly with our optimized platform"
              },
              {
                icon: <FiBarChart className="w-8 h-8" />,
                title: "Detailed Analytics",
                description: "Track clicks, locations, and user engagement in real-time"
              },
              {
                icon: <FiShield className="w-8 h-8" />,
                title: "Secure & Reliable",
                description: "Your links are protected with enterprise-grade security"
              },
              {
                icon: <FiGlobe className="w-8 h-8" />,
                title: "Global CDN",
                description: "Fast redirects worldwide with our global infrastructure"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl text-center hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 hover:border-slate-600/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                <div className="text-green-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Simple Banner */}
          <div className="mt-16 w-full max-w-5xl">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-3xl"></div>
              
              {/* Main Content */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Left Side - URL Transformation Visual */}
                <div className="flex-1 space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Transform Your Links
                    </h3>
                    <p className="text-slate-400 text-base md:text-lg">
                      See how your long URLs become powerful, shareable short links
                    </p>
                  </div>
                  
                  {/* URL Transformation */}
                  <div className="space-y-4">
                    {/* Long URL */}
                    <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="flex-1 bg-slate-600/30 rounded-lg p-2">
                          <span className="text-slate-300 text-sm font-mono">
                            https://example.com/very/long/url/with/many/parameters?id=12345&ref=...
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="flex items-center gap-2 text-green-400">
                        <FiArrowRight className="w-6 h-6" />
                        <span className="text-sm font-medium">Shorten</span>
                        <FiArrowRight className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Short URL */}
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="flex-1 bg-green-500/10 rounded-lg p-2">
                          <span className="text-green-300 text-sm font-mono font-bold">
                            short.ly/abc123
                          </span>
                        </div>
                        <FiCheck className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Analytics Visual */}
                <div className="flex-1">
                  <div className="bg-slate-800/30 border border-slate-600/50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <FiBarChart className="w-5 h-5 text-blue-400" />
                      Real-time Analytics
                    </h4>
                    
                    {/* Stats */}
                    <div className="space-y-3">
                      {[
                        { label: "Clicks Today", value: "1,234", color: "bg-green-400" },
                        { label: "Total Visitors", value: "5,678", color: "bg-blue-400" },
                        { label: "Countries", value: "23", color: "bg-purple-400" }
                      ].map((stat, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
                            <span className="text-slate-300 text-sm">{stat.label}</span>
                          </div>
                          <span className="text-white font-semibold">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Chart Bars */}
                    <div className="mt-4 flex items-end gap-2 h-16">
                      {[40, 65, 30, 80, 45, 70, 55].map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-gradient-to-t from-green-400/20 to-green-400/60 rounded-t"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 text-green-400/20">
                <FiGlobe className="w-8 h-8" />
              </div>
              
              <div className="absolute bottom-4 left-4 text-blue-400/20">
                <FiShield className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-20">
          <FAQSection />
          <Footer />
          
          {/* Simple attribution */}
          <div className="text-center py-4 text-slate-400 text-sm">
            Made by Sujay Rana
          </div>
        </div>

        {showModal && <UrlModal url={url} setshowModal={setshowModal}/>}
    </div>
  )
}


const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is a URL shortener?",
      answer: "A URL shortener is a tool that creates a short, unique URL that redirects to the original, long URL. It's perfect for social media, email campaigns, and anywhere you need cleaner, more manageable links.",
    },
    {
      question: "How does it work?",
      answer: "Simply paste your long URL into our tool, and we'll generate a short URL that you can share anywhere. When someone clicks the short URL, they are instantly redirected to your original destination.",
    },
    {
      question: "Is it free to use?",
      answer: "Yes, our URL shortener is completely free to use with no hidden fees. Create an account to access advanced features like analytics, custom domains, and link management.",
    },
    {
      question: "Can I track my link performance?",
      answer: "Absolutely! We provide detailed analytics including click counts, geographic data, referrer information, and click timing to help you understand your audience better.",
    },
    {
      question: "Are the shortened URLs permanent?",
      answer: "Yes, once created, your shortened URLs will work permanently. We maintain our links with 99.9% uptime to ensure your links always work when you need them.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto mt-20 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Frequently Asked <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Questions</span>
        </h2>
        <p className="text-slate-400 text-lg">Everything you need to know about our URL shortener</p>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index} 
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600/70 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div
              className="flex justify-between items-center cursor-pointer p-6 hover:bg-slate-800/50 transition-all duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg md:text-xl font-semibold text-white pr-4">{faq.question}</h3>
              <motion.div
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-green-400 text-2xl font-light flex-shrink-0"
              >
                +
              </motion.div>
            </div>
            <motion.div
              initial={false}
              animate={{
                height: activeIndex === index ? 'auto' : 0,
                opacity: activeIndex === index ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 text-slate-300 leading-relaxed">
                {faq.answer}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};


const Footer = () => {
  return (
    <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50 w-full py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" className="w-12 h-12" alt="Logo" />
              <span className="text-2xl font-bold text-white">URLShortener</span>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              The most powerful URL shortener with advanced analytics, custom domains, and enterprise-grade reliability.
            </p>
              {/* ...existing code... */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'Dashboard', 'Analytics', 'API Docs'].map((link) => (
                <a key={link} href="#" className="block text-slate-400 hover:text-green-400 transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <a key={link} href="#" className="block text-slate-400 hover:text-green-400 transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 URLShortener. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-slate-400 text-sm">Follow us:</span>
            <div className="flex gap-3">
              {['GitHub', 'Twitter', 'LinkedIn'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-slate-400 hover:text-green-400 transition-colors duration-300 text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Home