import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import RecipeDetail from "./Pages/RecipeDetail.jsx";
import Favorites from "./Pages/Favorites.jsx";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";

function App() {

  return (
    <Router>
      <div>
        <NavBar/>

        <main>
          <Routes>
            <Route path = "/" element ={<HomePage/>} />
            <Route path="" element={<RecipeDetail/> } />
            <Route path="" element={<Favorites/> } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App