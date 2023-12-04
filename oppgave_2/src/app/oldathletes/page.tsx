"use client"
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import type { Athlete, Activity, ApiResponse } from "../types/customer";
import { FaUser, FaVenusMars, FaRunning, FaHeart, FaBolt, FaTachometerAlt } from 'react-icons/fa';


const Page = () => {
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://webapp-api.vercel.app/api/users?page=${currentPage}`);
                const data: ApiResponse = await response.json();

                setAthletes(data.data);
                setTotalPages(data.pages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        void fetchData();
    }, [currentPage]);

    const goToNextPage = () => {
        setCurrentPage(current => Math.min(current + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(current => Math.max(current - 1, 1));
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded">
            <h1 className="text-xl font-semibold mb-4">Utøvere Dashboard</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <FaUser className="mr-2" /> UserID
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <FaVenusMars className="mr-2" /> Kjønn
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <FaRunning className="mr-2" /> Sport
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <FaHeart className="mr-2" /> Heartrate
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <FaBolt className="mr-2" /> Watt
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <FaTachometerAlt className="mr-2" /> Speed
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {athletes.map(athlete => (
                            <React.Fragment key={athlete.id}>
                                <tr>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {athlete.userId}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {athlete.gender}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {athlete.sport}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {athlete.meta.heartrate}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {athlete.meta.watt}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {athlete.meta.speed}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={6} className="px-5 py-2 border-b border-gray-200 bg-gray-100 text-xs font-semibold">
                                        Activities Details
                                    </td>
                                </tr>
                                {athlete.activities.map(activity => (
                                    <tr key={activity.date}>
                                        <td colSpan={6} className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                            <div key={activity.date} className="mb-5 p-4 bg-gray-100 rounded-lg shadow">
                                                <strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}
                                                <br />
                                                <strong>Name:</strong> {activity.name ?? 'Unnamed Activity'}
                                                <br />
                                                <strong>Tags:</strong> {activity.tags ? activity.tags.join(', ') : 'No tags'}
                                                <br />
                                                <strong>Intervals:</strong> {activity.intervals?.length ?? 0}
                                                <br />
                                                <strong>Questions:</strong>
                                                <strong>Questions:</strong>
                                                <ul className="list-disc list-inside">
                                                    {activity.questions?.map(question => (
                                                        <li key={question.id}>{question.question}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button onClick={goToPreviousPage} disabled={currentPage === 1} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Forrige
                </button>
                <p className="text-sm">
                    Side {currentPage} av {totalPages}
                </p>
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Neste
                </button>
            </div>
        </div>

    );
};

export default Page;
