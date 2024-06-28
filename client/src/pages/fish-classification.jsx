import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function FishClassification() {
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [imageResult, setImageResult] = useState([]);
    const [buttonState, setButtonState] = useState(true);

    const componentPDF = useRef();

    useEffect(() => {
        const fetchImageResult = async (param) => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/filter-fish/${param}`
                );
                setImageResult(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchImageResult(imageName);
    }, [imageName]);

    const handleImage = (event) => {
        let file = event.target.files[0];
        let filename = event.target.files[0].name;

        const finalFileName = filename.replace(/[\d]+px-/, "");
        let decoded = decodeURIComponent(finalFileName); // Decode the encrypted image filename
        console.log(decoded);
        setImageName(decoded);
        setImage(file);
        setButtonState(false);
    };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Fish Data",
        pageStyle: "@page {margin: 50px}",
    });

    return (
        <div>
            <div className="sm:px-0 pb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-indigo-600 sm:text-3xl">
                        Classify Fish
                    </h1>
                    <p className="text-sm leading-6 text-gray-500">
                        Classify the information of particular fish
                    </p>
                </div>

                <div>
                    <div>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={generatePDF}
                            hidden={buttonState}
                        >
                            Export to PDF
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col" ref={componentPDF}>
                {image ? (
                    <div className="h-64 w-full">
                        <img
                            className="h-full w-full object-cover rounded-lg"
                            src={URL.createObjectURL(image)}
                            alt=""
                        ></img>
                    </div>
                ) : (
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center px-40 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    Click to upload
                                </span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleImage}
                        />
                    </label>
                )}

                {imageName ? (
                    <div>
                        {imageResult.map((ir) => (
                            <div>
                                <div>
                                    <div className="pt-4 sm:px-0">
                                        <h1 className="text-xl font-bold tracking-tight text-indigo-600 sm:text-2xl">
                                            {ir.name}
                                        </h1>
                                        <p className="mt-1 text-sm leading-6 text-gray-500">
                                            Fish Name
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                                Genera
                                            </dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 w-96 sm:mt-0">
                                                {ir.genera}
                                            </dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                                Scientific Classification
                                            </dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                <div className="flex justify-between">
                                                    <label className="font-bold">
                                                        Domain:
                                                    </label>

                                                    <p className="">
                                                        {ir.domain}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <label className="font-bold">
                                                        Kingdom:
                                                    </label>

                                                    <p className="">
                                                        {ir.kingdom}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <label className="font-bold">
                                                        Phylum:
                                                    </label>

                                                    <p className="">
                                                        {ir.phylum}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <label className="font-bold">
                                                        Family:
                                                    </label>

                                                    <p className="">
                                                        {ir.family}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <label className="font-bold">
                                                        Species:
                                                    </label>

                                                    <p className="">
                                                        {ir.species}
                                                    </p>
                                                </div>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="pt-4 sm:px-0">
                                <h1 className="text-xl font-bold tracking-tight text-indigo-600 sm:text-2xl">
                                    Name of Fish
                                </h1>
                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                    Fish Name
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Genera
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 w-96 sm:mt-0">
                                        Genera Description
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Scientific Classification
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <div className="flex justify-between">
                                            <label className="font-bold">
                                                Domain:
                                            </label>

                                            <p className="">
                                                Domain Description
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-bold">
                                                Kingdom:
                                            </label>

                                            <p className="">
                                                Kingdom Description
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-bold">
                                                Phylum:
                                            </label>

                                            <p className="">
                                                Phylum Description
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-bold">
                                                Family:
                                            </label>

                                            <p className="">
                                                Family Description
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-bold">
                                                Species:
                                            </label>

                                            <p className="">
                                                Species Description
                                            </p>
                                        </div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
