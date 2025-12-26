
import React from "react";
import { useParams } from 'react-router-dom'

const RecipeDetail = () => {
    const {id} = useParams();

    return(
        <div>
            <h1>Detail Page</h1>
            <p>something</p>
            
        </div>
    );
}

export default RecipeDetail