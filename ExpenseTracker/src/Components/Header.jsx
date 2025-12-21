import headerLogo from '../assets/Images/headerImage.png'

function Header(){
    return(
        <header className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border-gray-100 max-w-2xl mx-auto mt-10 overflow-hidden">
         <div className="shrink-0 flex items-center justify-center">
            <img src={headerLogo} alt="Title Image" className="w-24 md:w-48 object-contain drop-shadow-md sm:w-24"/>
         </div>

         <div className="flex flex-col flex-1 justify-center">
            <h1 className="text-center font-extrabold font-story text-4xl text-amber-900 sm:text-2xl">Expense Tracker</h1>
            <p className="font-story text-2xl text-gray-500 text-center mt-1 sm:text-xl">Track your treasures, manage your joy!</p>
         </div>
        </header>
    );
}

export default Header