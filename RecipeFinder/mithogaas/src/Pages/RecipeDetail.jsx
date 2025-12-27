import { useParams } from "react-router-dom";

const RecipeDetail = () => {
    const {id} = useParams();

    return(
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 font-share">Detail Page</h1>
            <p className="text-gray-600 font-share">Recipe ID: {id}</p>
            <p className="mt-4 font-share text-gray-700">
            This page will display detailed recipe information including ingredients,
            instructions, and nutritional information.</p>
        </div>
    );
}

export default RecipeDetail