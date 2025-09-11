import { Button } from "@/Components/ui/button"
import Navbar from "../Components/Home/Navbar"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/main";
import { useLocation, useNavigate } from "react-router-dom";
import UrlModal from "@/Components/Home/UrlModal";


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
    <div className="bg-slate-900 w-screen h-full relative">

        <Navbar/>

        <div className="flex flex-col gap-5 items-center ">
            <h1 className=" mt-8 font-bold text-6xl w-6/12 mx-auto font-poppins text-white text-center leading-snug" >The Only URL Shortener You'll ever need! 👇️</h1> 

            <div className="flex gap-3 mt-8 items-center">
              <input type="text" className="bg-transparent focus-within:outline-none px-4 py-3 border-2 border-slate-600 rounded-lg w-[450px] text-white " placeholder="Enter Your Loooong URL ...." onChange={((e:React.ChangeEvent<HTMLInputElement>) => {seturl(e.target.value)})} value={url} />
              <Button className="bg-green-600 text-white px-6 py-6 rounded-lg hover:bg-green-700 hover:scale-95 font-semibold" onClick={submitHandler}>Shorten!</Button>
            </div>

            <img 
              className="mt-16" 
              src="./banner_new.png" 
              alt="" 
              style={{ width: '70%', height: 'auto' }} // Or '500px', '300px'
            />

            <FAQSection />
            <Footer />

            {
              showModal && <UrlModal url={url} setshowModal={setshowModal}/>
            }

        </div>

    </div>
  )
}


const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is a URL shortener?",
      answer: "A URL shortener is a tool that creates a short, unique URL that redirects to the original, long URL.",
    },
    {
      question: "How does it work?",
      answer: "You enter a long URL, and the tool generates a short URL that you can share. When someone clicks the short URL, they are redirected to the original URL.",
    },
    {
      question: "Is it free to use?",
      answer: "Yes, our URL shortener is completely free to use.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-10/12 mx-auto mt-16">
      <h2 className="text-4xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-slate-800 p-4 rounded-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
              <span className="text-white">{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="mt-2 text-white transition-all duration-300 ease-in-out">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


const Footer = () => {
  return (
    <footer className="bg-slate-800 w-full py-6 mt-16">
      <div className="w-10/12 mx-auto flex justify-between items-center text-white">
        <p>Made with <span className="animate-pulse">❤️</span> by Sujay Rana</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Home