
import myBanner from '../assets/Images/Banner.jpg';
import myLogo from '../assets/Images/Logo.png'
import { Link } from 'react-router-dom'

function HomePage(){

 return(
  <div className="flex flex-col">
   <section style={{backgroundImage: `url(${myBanner})`, backgroundSize: "cover", backgroundPosition: "center"}} className="relative h-96 w-full flex items-center justify-center">

    <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 max-w-3xl px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-share">Discover recipes that inspire</h1>
        <p className="mt-4 text-lg text-gray-200 font-share">Search, explore and save delicious recipes from around the world all in one place</p>
        <Link to="/recipes" className='mt-6 px-6 py-3 rounded 
        bg-[#a7f1a0] text-black font-semibold hover:bg-[#58e633] cursor-pointer inline-block font-share'>Start Exploring</Link>
      </div>
    </section>

    <section className='py-16 px-6 max-w-6xl mx-auto'>
     <h2 className='text-3xl font-bold text-center mb-6 font-share'>About <span className='bg-[#a7f1a0]'>मीठो गाँस</span></h2>

     <div className='flex flex-col md:flex-row items-center justify-center gap-10'>
        <div className="md:w-1/2 text-center md:text-left">
        <p className="text-center text-gray-600 max-w-3xl mx-auto font-share">
        <span className='font-extrabold bg-[#a7f1a0]'>मीठो गाँस</span> is your joyful companion for exploring a world of delicious possibilities! Powered by a vast global API, our app is designed for students, home cooks, and food enthusiasts who believe every meal should be a celebration. Whether you're craving a taste of home or a new international adventure, we help you quickly find in-depth recipes, watch helpful videos, and save your favorite recipes to enjoy again and again. With a beautiful responsive design and a cozy Dark Mode, we make finding your next favorite dish as happy and easy as the first bite!</p>
        </div>

        <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-[#a7f1a0]/40
">
        <img src={myLogo} alt="Mithogaas logo" className='w-48 h-48 object-contain rounded'/>
        </div>
     </div>
    </section>

    <section className="py-10 bg-gray-50">
     <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-share font-bold text-center">Why Choose <span className="bg-[#a7f1a0]">मीठो गाँस</span> ?</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mt-4 font-share">Discover, save, and enjoy your favorite recipes effortlessly. Everything you need, in one place.</p>
      <div className="w-20 h-1 bg-[#a7f1a0] mx-auto m-2 rounded-full"></div>

      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
       <FeatureCard emoji="🔍" title="Smart Search" description="Find recipes instantly with debounced search for smooth performance."/>
       <FeatureCard emoji="🧭" title="Category Filters" description="Explore recipes easily using visual category selection."/>
       <FeatureCard emoji="📝" title="Detailed Recipes" description="View ingredients, instructions, and cuisine details on a dedicated page."/>
       <FeatureCard emoji="❤️" title="Favorites" description="Save your favorite recipes and access them anytime."/>
       <FeatureCard emoji="🎥" title="Video Guides" description="Watch step-by-step video tutorial to master your favorite dishes."/>
       <FeatureCard emoji="🌍" title="Global Cuisines" description="Enjoy traditional recipes from around the world."/>
       <FeatureCard emoji="🌙" title="Dark Mode" description="Switch between light and dark themes for comfortable browsing."/>
       <FeatureCard emoji="📱" title="Responsive Design" description="Optimized for desktop, tablet, and mobile devices."/>
      </div>
    </div>
   </section>

   <section className='py-10 bg-white'>
    <div className='max-w-6xl mx-auto px-6 text-center'>
      <h2 className='text-3xl font-extrabold font-share mb-12'>Impact of <span className="bg-[#a7f1a0]">मीठो गाँस</span> in Numbers</h2>
      <div className='grid gap-10 sm:grid-cols-3'>
        <StatCard number="5,000+" label="Active Users" />
        <StatCard number="12,000+" label="Recipes Searched" />
        <StatCard number="4.5/5 ⭐" label="Average Ratings" />
      </div>
    </div>

   </section>

   <section className='py-10 bg-white'>
    <div className='max-w-6xl mx-auto px-6 text-center'>
      <h2 className='text-3xl font-extrabold font-share mb-3'>What <span className="bg-[#a7f1a0]">मीठो गाँस</span> Users are Saying</h2>
      <p className='text-gray-600 max-w-2xl mx-auto mb-2 font-share'>Hear from people who love exploring recipes with <span className="bg-[#a7f1a0]">मीठो गाँस</span>.</p>
      <div className="w-20 h-1 bg-[#a7f1a0] mx-auto m-2 rounded-full"></div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <TestimonialCard avatar="https://i.pravatar.cc/150?img=1" name="Elon Mosque" message="I save all my favorite recipes here, perfect for meal planning." />
        <TestimonialCard avatar="https://i.pravatar.cc/150?img=2" name="Tim Pen" message="Loved the Smart Search! Found my favorite dishes in seconds." />
        <TestimonialCard avatar="https://i.pravatar.cc/150?img=3" name="Satya Mandela" message="The recipe details are so clear, cooking has never been easier." />
      </div>
    </div>
   </section>

  </div>
  );
};

const FeatureCard = ({ emoji, title, description }) => {
    return(
      <div className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#a7f1a0]/40 mb-5 text-3xl">{emoji}</div>
          <h3 className="text-xl font-bold mb-2 font-share text-gray-900">{title}</h3>
          <p className="text-gray-600 font-share leading-relaxed">{description}</p>
        </div>
    )
}

const TestimonialCard = ({ avatar, name, message }) => {
  return(
    <div className='bg-gray-50 p-6 rounded-2xl shadow-md text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
      <div className='flex items-center mb-4'>
        <img src={avatar} alt={name} className='w-12 h-12 rounded-full mr-4' />
        <h4 className='font-bold font-share text-gray-900'>{name}</h4>
      </div>
      <p className='text-gray-700 font-share'>{message}</p>
    </div>
  )
}

const StatCard = ( { number, label }) => {
  return(
    <div className='bg-white text-center rounded-2xl shadow-md p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
      <p className='text-4xl font-extrabold font-share text-gray-900 mb-2'>{number}</p>
      <p className='text-gray-700 font-share'>{label}</p>
    </div>
  )
}

export default HomePage