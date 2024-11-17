import React from 'react';
import { ArrowRight } from 'lucide-react';

const NavigationButton = ({ link, text }) => {
    const handleNavigation = () => {
        window.location.href = link;
    };

    return (
        <button
            onClick={handleNavigation}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
            {text}
            {/* <ArrowRight className="w-4 h-4" /> */}
        </button>
    );
};

export default NavigationButton;