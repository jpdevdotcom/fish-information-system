import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FishGenera() {
    const [genera, setGenera] = useState([]);

    useEffect(() => {
        const fetchFishGenera = async () => {
            try {
                const res = await axios.get(
                    "http://http://fish-information-system-production.up.railway.app/fish-data"
                );
                setGenera(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchFishGenera();
    }, []);

    return (
        <>
            <h1 className="text-xl font-bold tracking-tight text-indigo-600 sm:text-2xl mb-10">
                Genera / Binomial
            </h1>

            {genera.map((fishGenera) => (
                <div key={fishGenera.id}>
                    {fishGenera.genera && (
                        <>
                            <div className="sm:px-0">
                                <h1 className="text-xl font-bold tracking-tight text-indigo-600 sm:text-2xl">
                                    {fishGenera.name}
                                </h1>
                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                    Fish Name
                                </p>
                            </div>
                            <div className="border-b border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">
                                            Genera
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 w-96 sm:mt-0">
                                            {fishGenera.genera}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">
                                            Binomial
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 w-96 sm:mt-0">
                                            {fishGenera.binomial_name
                                                ? fishGenera.binomial_name
                                                : "N/A"}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}
