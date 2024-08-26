import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackFormModal = ({ isModalOpen, setIsModalOpen, selectedFeedback, isEditing, setFeedbacks }) => {
    const [feedback, setFeedback] = useState({ name: '', rating: '', message: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditing && selectedFeedback) {
            setFeedback(selectedFeedback);
        }
    }, [isEditing, selectedFeedback]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFeedback({ ...feedback, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`http://localhost:8000/api/feedback/${feedback._id}`, feedback);
            } else {
                await axios.post('http://localhost:8000/api/feedback/create', feedback);
            }
            // Refresh feedback list
            const response = await axios.get('http://localhost:8000/api/feedback');
            setIsModalOpen(false);
            setFeedbacks(response.data.feedback);
            setIsModalOpen(false);
            setFeedback({ name: '', rating: '', message: '' }); 
        } catch (err) {
            setError(err.message);
        }
    };

    if (!isModalOpen) return null; // Prevent rendering if modal is closed

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {isEditing ? 'Edit Feedback' : 'Add Feedback'}
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={feedback.name}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Rating (1-5)
                            </label>
                            <input
                                type="number"
                                id="rating"
                                value={feedback.rating}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Rating"
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={feedback.message}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Your feedback"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            {isEditing ? 'Update Feedback' : 'Submit Feedback'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackFormModal;
