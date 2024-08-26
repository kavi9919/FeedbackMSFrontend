import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackFormModal from './feedbackForm';

const FeedbackTable = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Fetch feedbacks from API
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/feedback');
                setFeedbacks(response.data.feedback);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFeedbacks();
    }, []);

    const handleDelete = async (id) => {
        console.log(id);
        try {
            await axios.delete(`http://localhost:8000/api/feedback/${id}`);
            setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
            alert('feedback deleted successfully')
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (feedback) => {
        setSelectedFeedback(feedback);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && (
                <FeedbackFormModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={() => setIsModalOpen(false)}
                    selectedFeedback={selectedFeedback}
                    isEditing={isEditing}
                    setFeedbacks={setFeedbacks}
                />
            )}
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {feedbacks.map(feedback => (
                        <tr key={feedback.id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{feedback.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400"><Rating value={feedback.rating}/></td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{feedback.message}</td>
                            <td className="px-6 py-4 text-sm font-medium">
                                <button
                                    onClick={() => handleEdit(feedback)}
                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(feedback._id)}
                                    className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 ms-4"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default FeedbackTable;



 function Rating({value}) {
  return (
    <div>
        <div className="flex items-center">
    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <p className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
</div>
    </div>
  )
}

