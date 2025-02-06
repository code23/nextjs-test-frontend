"use client"; // This component is a client component

import { useState } from "react";
import { Code } from "@heroui/react";

interface LoadMoreMessagesProps {
    messages: any[];
}

const LoadMoreMessages: React.FC<LoadMoreMessagesProps> = ({ messages }) => {
    const [visibleCount, setVisibleCount] = useState(2);

    const loadMoreMessages = () => {
        setVisibleCount(prevCount => prevCount + 2);
    };

    return (
        <div className="flex flex-col gap-6 w-full justify-center items-center">
            <h1 className="text-4xl font-bold ">Load More Messages</h1>
            <div className="grid grid-cols-2 gap-5 w-full">
                {messages.slice(0, visibleCount).map((chanel: any, index: number) => (
                    <Code key={index} className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
                        {JSON.stringify(chanel, null, 2)}
                    </Code>
                ))}
            </div>
            {visibleCount < messages.length && (
                <button onClick={loadMoreMessages} className="mt-4 p-2 bg-blue-500 text-white rounded">
                    Load More
                </button>
            )}
        </div>
    );
};

export default LoadMoreMessages;