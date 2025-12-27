
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import RecipeDetail from "./Pages/RecipeDetail.jsx";
import Favorites from "./Pages/Favorites.jsx";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";

function App() {

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar/>

        <main className="flex-grow">
          <Routes>
            <Route path = "/" element ={<HomePage />} />
            <Route path="/recipe:id" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App