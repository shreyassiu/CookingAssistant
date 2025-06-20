import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/custom/Navbar';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const AddRecipePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        extendedIngredients: [''],
        instructions: [''],
        readyInMinutes: '',
        servings: '',
        pricePerServing: '',
        tags: [''],
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const { token } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleListChange = (index, value, field) => {
        const list = [...formData[field]];
        list[index] = value;
        setFormData({ ...formData, [field]: list });
    };

    const addListItem = (field) => {
        const list = [...formData[field], ''];
        setFormData({ ...formData, [field]: list });
    };

    const removeListItem = (index, field) => {
        const list = [...formData[field]];
        list.splice(index, 1);
        setFormData({ ...formData, [field]: list });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.extendedIngredients[0].trim()) {
            toast.error('Please add at least one ingredient.');
            return;
        }

        if (!formData.instructions[0].trim()) {
            toast.error('Please add at least one instruction.');
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const form = new FormData();

            for (const key in formData) {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach((item, i) => {
                        form.append(`${key}[${i}]`, item);
                    });
                } else {
                    form.append(key, formData[key]);
                }
            }

            if (image) {
                form.append('image', image);
            }

            const res = await axios.post(`${apiUrl}/api/v1/addRecipe`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(res.data.message);
        } catch (err) {
            console.error(err);
            toast.error('Failed to submit recipe.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-green-600">
                    🍳 Share Your Recipe
                </h1>
                <p className="text-gray-600 mb-10 text-center">
                    Let the world know your secret recipe!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-semibold mb-1">Title<span className="text-red-500">*</span></label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="border rounded p-3 w-full focus:outline-green-400" required />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Summary<span className="text-red-500">*</span></label>
                            <textarea name="summary" value={formData.summary} onChange={handleChange} className="border rounded p-3 w-full h-24 resize-none focus:outline-green-400" required />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Ready In Minutes<span className="text-red-500">*</span></label>
                            <input type="number" name="readyInMinutes" value={formData.readyInMinutes} onChange={handleChange} className="border rounded p-3 w-full focus:outline-green-400" required />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Servings<span className="text-red-500">*</span></label>
                            <input type="number" name="servings" value={formData.servings} onChange={handleChange} className="border rounded p-3 w-full focus:outline-green-400" required />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Price Per Serving (optional)</label>
                            <input type="number" name="pricePerServing" value={formData.pricePerServing} onChange={handleChange} className="border rounded p-3 w-full focus:outline-green-400" />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Tags</label>
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="flex mb-2">
                                    <input type="text" value={tag} onChange={(e) => handleListChange(index, e.target.value, 'tags')} className="border rounded p-3 flex-grow focus:outline-green-400" />
                                    <button type="button" onClick={() => removeListItem(index, 'tags')} className="ml-2 text-red-500">Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addListItem('tags')} className="text-blue-500 mt-1">Add Tag</button>
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Ingredients<span className="text-red-500">*</span></label>
                        {formData.extendedIngredients.map((ingredient, index) => (
                            <div key={index} className="flex mb-2">
                                <input type="text" value={ingredient} onChange={(e) => handleListChange(index, e.target.value, 'extendedIngredients')} className="border rounded p-3 flex-grow focus:outline-green-400" required />
                                <button type="button" onClick={() => removeListItem(index, 'extendedIngredients')} className="ml-2 text-red-500">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addListItem('extendedIngredients')} className="text-blue-500 mt-1">Add Ingredient</button>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Instructions<span className="text-red-500">*</span></label>
                        {formData.instructions.map((instruction, index) => (
                            <div key={index} className="flex mb-2">
                                <input type="text" value={instruction} onChange={(e) => handleListChange(index, e.target.value, 'instructions')} className="border rounded p-3 flex-grow focus:outline-green-400" required />
                                <button type="button" onClick={() => removeListItem(index, 'instructions')} className="ml-2 text-red-500">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addListItem('instructions')} className="text-blue-500 mt-1">Add Instruction</button>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Upload Recipe Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="border rounded p-2 w-full" />
                        {preview && (
                            <img src={preview} alt="Preview" className="mt-4 w-40 h-40 object-cover rounded" />
                        )}
                    </div>

                    <div className="text-center">
                        <button type="submit" className="bg-green-500 text-white py-3 px-8 rounded-lg font-bold hover:bg-green-600 transition">Submit Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipePage;
