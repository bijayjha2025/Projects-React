
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import RecipeDetail from "./Pages/RecipeDetail.jsx";
import Favorites from "./Pages/Favorites.jsx";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";
import Recipes from "./Pages/Recipes.jsx";
import { FavoritesProvider } from "./Hooks/useFavorites.jsx";
import { MealPlannerProvider } from "./Hooks/useMealPlanner.jsx";
import MealPlanner from "./Pages/MealPlanner.jsx";

function App() {

  return (
    <FavoritesProvider>
      <MealPlannerProvider>
     <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />

        <main className="flex-grow">
          <Routes>
            <Route path = "/" element ={<HomePage />} />
            <Route path="/recipes" element = {<Recipes /> } />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/mealplanner" element={<MealPlanner />} />
          </Routes>
        </main>

        <Footer />
      </div>
     </Router>
     </MealPlannerProvider>
    </FavoritesProvider>
  )
}

export default App