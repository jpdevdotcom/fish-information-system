import {
    ViewfinderCircleIcon,
    MagnifyingGlassIcon,
    RectangleGroupIcon,
} from "@heroicons/react/20/solid";

const features = [
    {
        name: "View Fish Information.",
        description:
            "Offers details on various fish species, like habitat, behavior, diet, and size, found in fishing, aquarium, or marine biology platforms.",
        icon: ViewfinderCircleIcon,
    },
    {
        name: "Classify Fish.",
        description:
            "Sorts fish by species, size, or habitat, useful in research, fisheries, and fishing apps.",
        icon: MagnifyingGlassIcon,
    },
    {
        name: "Fish Categorization.",
        description:
            "Groups fish by species, size, or habitat for research, fisheries, and fishing.",
        icon: RectangleGroupIcon,
    },
];

export default function LandingPage() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <p className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
                                Fish Information System
                            </p>
                            <p className="mt-2 text-base  text-gray-600">
                                Fish Information System (FIS) is an integrated
                                platform to harmonise data from the fisheries
                                sector and facilitate the work of the different
                                actors in the sector.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div
                                        key={feature.name}
                                        className="relative pl-9"
                                    >
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon
                                                className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                                                aria-hidden="true"
                                            />
                                            {feature.name}
                                        </dt>{" "}
                                        <dd className="inline">
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        src={require("../images/colorful-fish-swimming-underwater.jpg")}
                        alt="Product screenshot"
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>
        </div>
    );
}
