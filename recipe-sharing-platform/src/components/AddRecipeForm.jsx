import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !ingredients || !steps) {
      setError("All fields are required.");
      return;
    }

    const ingredientsList = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (ingredientsList.length < 2) {
      setError("Please enter at least two ingredients separated by commas.");
      return;
    }

    setError("");

    // For now we just log it (since we don’t have backend yet)
    const newRecipe = {
      title,
      ingredients: ingredientsList,
      instructions: steps.split("\n"),
    };

    console.log("New Recipe Submitted:", newRecipe);

    // Redirect to home after submission
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Recipe 🍳
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">
              Recipe Title
            </label>
            <input
              type="text"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-1 font-medium">
              Ingredients (separate with commas)
            </label>
            <textarea
              rows="3"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>

          {/* Preparation Steps */}
          <div>
            <label className="block mb-1 font-medium">
              Preparation Steps (one per line)
            </label>
            <textarea
              rows="4"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
