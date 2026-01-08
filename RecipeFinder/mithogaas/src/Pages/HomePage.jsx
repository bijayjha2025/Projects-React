
import myBanner from '../assets/Images/Banner.jpg';
import myLogo from '../assets/Images/Logo.png'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

function HomePage(){
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

 return(
  <div className="flex flex-col">
   <section style={{backgroundImage: `url(${myBanner})`, backgroundSize: "cover", backgroundPosition: "center"}} className="relative h-96 w-full flex items-center justify-center overflow-hidden">

    <div className="absolute inset-0 bg-black/40 animate-fade-in"></div>
      <div className="relative z-10 max-w-3xl px-4 text-center animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-share">Discover recipes that inspire</h1>
        <p className="mt-4 text-lg text-gray-200 font-share">Search, explore and save delicious recipes from around the world all in one place</p>
        <Link to="/recipes" className='mt-6 px-6 py-3 rounded 
        bg-[#a7f1a0] text-black font-semibold hover:bg-[#58e633] cursor-pointer inline-block font-share transition-all duration-300 hover:scale-105 hover:shadow-lg'>Start Exploring</Link>
      </div>
    </section>

    <section className='py-16 px-6 max-w-6xl mx-auto'>
     <h2 className='text-3xl font-bold text-center mb-6 font-share animate-fade-in-up'>About <span className='bg-[#a7f1a0]'>मीठो गाँस</span></h2>

     <div className='flex flex-col md:flex-row items-center justify-center gap-10'>
        <div className="md:w-1/2 text-center md:text-left animate-fade-in-left">
        <p className="text-center text-gray-600 max-w-3xl mx-auto font-share">
        <span className='font-extrabold bg-[#a7f1a0]'>मीठो गाँस</span> is your joyful companion for exploring a world of delicious possibilities! Powered by a vast global API, our app is designed for students, home cooks, and food enthusiasts who believe every meal should be a celebration. Whether you're craving a taste of home or a new international adventure, we help you quickly find in-depth recipes, watch helpful videos, and save your favorite recipes to enjoy again and again. With a beautiful responsive design and being simple to use, we make finding your next favorite dish as happy and easy as the first bite!</p>
        </div>

        <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md transition-all  duration-500 hover:scale-110 hover:shadow-2xl hover:ring-4 hover:ring-[#a7f1a0]/40 hover:rotate-6 animate-float">
        <img src={myLogo} alt="Mithogaas logo" className= "w-48 h-48 object-contain rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:ring-4 hover:ring-[#a7f1a0]/40 hover:rotate-6 animate-float" onLoad={() => setIsLogoLoaded(true)} />
        </div>
     </div>
    </section>

    <section className="py-10 bg-gray-50">
     <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-share font-bold text-center animate-fade-in-up">Why Choose <span className="bg-[#a7f1a0]">मीठो गाँस</span> ?</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mt-4 font-share animate-fade-in-up animation-delay-100">Discover, save, and enjoy your favorite recipes effortlessly. Everything you need, in one place.</p>
      <div className="w-20 h-1 bg-[#a7f1a0] mx-auto m-2 rounded-full"></div>

      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
       <FeatureCard emoji="🔍" title="Smart Search" description="Find recipes instantly with debounced search for smooth performance." delay="0"/>
       <FeatureCard emoji="🧭" title="Category Filters" description="Explore recipes easily using visual category selection." delay="100"/>
       <FeatureCard emoji="📝" title="Detailed Recipes" description="View ingredients, instructions, and cuisine details on a dedicated page." delay="200"/>
       <FeatureCard emoji="❤️" title="Favorites" description="Save your favorite recipes and access them anytime." delay="300"/>
       <FeatureCard emoji="🎥" title="Video Guides" description="Watch step-by-step video tutorial to master your favorite dishes." delay="400"/>
       <FeatureCard emoji="🌍" title="Global Cuisines" description="Enjoy traditional recipes from around the world." delay="500"/>
       <FeatureCard emoji="📋" title="Plan & Shop" description="Weekly meal planning with automatic shopping list generation." delay="600"/>
       <FeatureCard emoji="📱" title="Responsive Design" description="Optimized for desktop, tablet, and mobile devices." delay="700"/>
       <FeatureCard emoji="🔗" title="View Source" description="Visit the original recipe source directly, when available." delay="800"/>
      </div>
    </div>
   </section>

   <section className='py-10 bg-white'>
    <div className='max-w-6xl mx-auto px-6 text-center'>
      <h2 className='text-3xl font-extrabold font-share mb-3 animate-fade-in-up'>Impact of <span className="bg-[#a7f1a0]">मीठो गाँस</span> in Numbers</h2>
      <div className="w-20 h-1 bg-[#a7f1a0] mx-auto m-2 rounded-full animate-expand"></div>
      <div className='grid gap-10 sm:grid-cols-3'>
        <StatCard number="5,000+" label="Active Users" delay="0" />
        <StatCard number="12,000+" label="Recipes Searched" delay="100" />
        <StatCard number="4.5/5 ⭐" label="Average Ratings" delay ="200" />
      </div>
    </div>

   </section>

   <section className='py-10 bg-white'>
    <div className='max-w-6xl mx-auto px-6 text-center'>
      <h2 className='text-3xl font-extrabold font-share mb-3 animate-fade-in-up'>What <span className="bg-[#a7f1a0]">मीठो गाँस</span> Users are Saying</h2>
      <p className='text-gray-600 max-w-2xl mx-auto mb-2 font-share animate-fade-in-up animation-delay-100'>Hear from people who love exploring recipes with <span className="bg-[#a7f1a0]">मीठो गाँस</span>.</p>
      <div className="w-20 h-1 bg-[#a7f1a0] mx-auto m-2 rounded-full animate-expand"></div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <TestimonialCard avatar="https://i.pravatar.cc/150?img=1" name="Elon Mosque" message="I save all my favorite recipes here, perfect for meal planning." delay ="0" />
        <TestimonialCard avatar="https://i.pravatar.cc/150?img=2" name="Tim Pen" message="Loved the Smart Search! Found my favorite dishes in seconds." delay ="100" />
        <TestimonialCard avatar="https://i.pravatar.cc/150?img=3" name="Satya Mandela" message="The recipe details are so clear, cooking has never been easier." delay="200" />
      </div>
    </div>
   </section>

   <style>{`
     @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
     @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
     @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }@keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
     @keyframes expand { from { width: 0; opacity: 0; } to { width: 5rem; opacity: 1; } }

     .animate-fade-in {
        animation: fadeIn 1s ease-out; }

     .animate-slide-up {
        animation: slideUp 1s ease-out 0.2s both; }

     .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out both; }

     .animate-fade-in-left {
        animation: fadeInLeft 1s ease-out 0.3s both; }

     .animate-float {
        animation: float 3s ease-in-out infinite, fadeInUp 1s ease-out 0.5s both; }

     .animate-expand {
        animation: expand 1s ease-out 0.5s both; }

     .animation-delay-100 {
        animation-delay: 0.1s; }

     .animation-delay-200 {
        animation-delay: 0.2s; }
    `}</style>

  </div>
  );
};

const FeatureCard = ({ emoji, title, description, delay }) => {
    return(
      <div className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }} >
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#a7f1a0]/40 mb-5 text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">{emoji}</div>
          <h3 className="text-xl font-bold mb-2 font-share text-gray-900">{title}</h3>
          <p className="text-gray-600 font-share leading-relaxed">{description}</p>
        </div>
    )
}

const TestimonialCard = ({ avatar, name, message, delay }) => {
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  return(
    <div className='bg-gray-50 p-6 rounded-2xl shadow-md text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up' style={{ animationDelay: `${delay}ms` }}>
      <div className='flex items-center mb-4'>
        <img src={avatar} alt={name} className={`w-12 h-12 rounded-full object-cover transition-all duration-700 ${isAvatarLoaded ? 'scale-100 opacity-100 blur-0' : 'scale-110 opacity-0 blur-sm'}`} onLoad={() => setIsAvatarLoaded(true)} />
        <h4 className='font-bold font-share text-gray-900 ml-4'>{name}</h4>
      </div>
      <p className='text-gray-700 font-share'>{message}</p>
    </div>
  )
}

const StatCard = ( { number, label, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const target = parseInt(number.replace(/[^0-9]/g, ''));
    if (isNaN(target)) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, number]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), parseInt(delay));
    return () => clearTimeout(timer);
  }, [delay]);

  const displayNumber = number.includes('/')
    ? number
    : count.toLocaleString() + number.replace(/[0-9]/g, '').replace(',', '');

  return(
    <div className='bg-white text-center rounded-2xl shadow-md p-8 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up' style={{ animationDelay: `${delay}ms` }}>
      <p className='text-4xl font-extrabold font-share text-gray-900 mb-2'>{number}</p>
      <p className='text-gray-700 font-share'>{label}</p>
    </div>
  )
}

export default HomePage