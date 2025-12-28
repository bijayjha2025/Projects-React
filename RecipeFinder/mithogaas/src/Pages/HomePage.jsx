
import myBanner from '../assets/Images/Banner.jpg';
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
        bg-[#a7f1a0] text-black font-semibold hover:bg-[#58e633] cursor-pointer inline-block'>Start Exploring</Link>
      </div>
    </section>

    <section className='py-16 px-6 max-w-6xl mx-auto'>
     <h2 className='text-3xl font-bold text-center mb-6 font-share'>About <span className='bg-[#a7f1a0]'>मीठो गाँस</span></h2>
     <p className="text-center text-gray-600 max-w-3xl mx-auto font-share">
        <span className='font-extrabold bg-[#a7f1a0]'>मीठो गाँस</span> helps you explore a wide variety of meals using a
        powerful public API. Whether you're a student, home cook, or food
        enthusiast, you can quickly find recipes, view details, and save your
        favorites.</p>
    </section>

    <section className="py-16 bg-[#a7f1a0]">
     <div className="w-full mx-auto px-6">
      <h2 className="text-3xl text-center mb-10 font-share font-extrabold">Features</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
       <FeatureCard title="Smart Search" description="Find recipes instantly with debounced search for smooth performance."/>
       <FeatureCard title="Category Filters" description="Explore recipes easily using visual category selection."/>
       <FeatureCard title="Detailed Recipes" description="View ingredients, instructions, and cuisine details on a dedicated page."/>
       <FeatureCard title="Favorites" description="Save your favorite recipes and access them anytime."/>
       <FeatureCard title="Dark Mode" description="Switch between light and dark themes for comfortable browsing."/>
       <FeatureCard title="Responsive Design" description="Optimized for desktop, tablet, and mobile devices."/>
      </div>
    </div>
   </section>
  </div>
  );
};

const FeatureCard = ({ title, description }) => {
    return(
        <div className='p-6 rounded-lg bg-[#9fcefb]'>
            <h3 className="text-xl font-bold mb-2 font-share">{title}</h3>
            <p className="text-gray-600 font-share">{description}</p>
        </div>
    )
}

export default HomePage