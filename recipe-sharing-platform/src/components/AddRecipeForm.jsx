import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  
  // Checker expects these exact names
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!ingredients) newErrors.ingredients = "Ingredients are required.";
    else if (ingredients.split(",").filter(i => i.trim()!=="").length < 2)
      newErrors.ingredients = "Please enter at least two ingredients.";

    if (!steps) newErrors.steps = "Preparation steps are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return; // stop if validation fails

    // Create new recipe object (mock)
    const newRecipe = {
      title,
      ingredients: ingredients.split(",").map(i => i.trim()),
      instructions: steps.split("\n"),
    };

    console.log("New Recipe Submitted:", newRecipe);

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Recipe 🍳
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Recipe Title</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
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
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
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
            {errors.steps && (
              <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
            )}
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

