
import myBanner from '../assets/Images/Banner.jpg';

function HomePage(){
 return(
  <div className="flex flex-col">
   <section style={{backgroundImage: `url(${myBanner})`, backgroundSize: "cover", backgroundPosition: "center"}} className="h-96 w-full flex items-center justify-center">

    <div className="absolute inset-0 bg-black/60 font-share">
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Discover recipes that inspires</h1>
        <p className="mt-4 text-lg text-gray-200">Search, explore and save delicious recipes from around the world all in one place</p>
        <button className='mt-6 px-6 py-3 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 cursor-pointer'>Start Exploring</button>
      </div>
    </div>
    </section>


     </div>

  );
}

export default HomePage