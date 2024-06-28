import { useState, useEffect } from "react";
import axios from "axios";

export default function ViewFish() {
    const [fish, setFish] = useState([]);

    useEffect(() => {
        const fetchAllFish = async () => {
            try {
                const res = await axios.get(
                    "http://http://fish-information-system-production.up.railway.app/fish-data"
                );
                setFish(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllFish();
    }, []);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="sm:px-0">
                    <h1 className="text-xl font-bold tracking-tight text-indigo-600 sm:text-3xl">
                        Marine Inventory
                    </h1>
                    <p className="text-sm leading-6 text-gray-500">
                        View all the fish available in the system
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {fish.map((f) => (
                        <div key={f.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
                                <img
                                    src={f.img_url}
                                    alt={f.img_url}
                                    className="h-full w-full object-cover object-center lg:h-52 lg:w-80"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700 font-bold">
                                        <a href="/">
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                            />
                                            {f.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {f.binomial_name
                                            ? `Binomial Name: ${f.binomial_name}`
                                            : ""}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {f.family ? `Family: ${f.family}` : ""}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {f.species
                                            ? `Species: ${f.species}`
                                            : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
