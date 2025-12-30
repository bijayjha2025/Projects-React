
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import RecipeDetail from "./Pages/RecipeDetail.jsx";
import Favorites from "./Pages/Favorites.jsx";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";
import Recipes from "./Pages/Recipes.jsx";
import { useTheme } from "./Hooks/useTheme.jsx";
import { FavoritesProvider } from "./Hooks/useFavorites.jsx";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <FavoritesProvider>
     <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar theme={theme} toggleTheme={toggleTheme}/>

        <main className="flex-grow">
          <Routes>
            <Route path = "/" element ={<HomePage />} />
            <Route path="/recipes" element = {<Recipes /> } />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        <Footer />
      </div>
     </Router>
    </FavoritesProvider>
  )
}

export default App