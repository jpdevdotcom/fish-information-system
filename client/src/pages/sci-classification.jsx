import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ScientificClassification() {
    const [sciFish, setSciFish] = useState([]);

    useEffect(() => {
        const fetchSciFish = async () => {
            const res = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/fish-data`
            );
            setSciFish(res.data);
        };

        fetchSciFish();
    }, []);

    return (
        <>
            <div className="px-96 w-full">
                {sciFish.map((sci) => (
                    <div className="mt-6 border-t border-gray-100 py-3">
                        <dl>
                            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Fish Name
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {sci.name}
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Domain
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {sci.domain}
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Kingdom
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {sci.kingdom}
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Phylum
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {sci.phylum}
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Family
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {sci.family}
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Species
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {sci.species}
                                </dd>
                            </div>
                        </dl>
                    </div>
                ))}
            </div>
        </>
    );
}
