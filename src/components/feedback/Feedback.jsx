import React, { useState } from 'react';
import FeedbackTable from './Table';
import FeedbackFormModal from './feedbackForm';


const Feedback = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='m-0 px-12 pt-8 min-h-screen bg-custom-radial w-full h-full bg-cover bg-no-repeat bg-center'>
            <h1 className="text-black text-2xl my-6">Feedback</h1>
            <div className="flex justify-end my-4">
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleModalOpen}
                >
                    Add Feedback
                </button>
            </div>
            <FeedbackFormModal isModalOpen={isModalOpen} setIsModalOpen={handleModalClose} />
            <FeedbackTable />
        </div>
    );
};

export default Feedback;
