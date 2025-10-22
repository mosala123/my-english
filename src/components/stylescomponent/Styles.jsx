import React from "react";

const Styles = () => {
    return (
        <div className="min-h-screen  flex flex-col items-center py-5 "   >
            <div className="bg-gray-100 px-12 py-12" style={{ borderRadius: "10px", marginTop: "10px" }}>
                <h1 className="text-5xl font-bold mb-10 text-center">BROWSE BY DRESS STYLE</h1>

                <div className="w-full max-w-6xl space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                        <div className="md:col-span-4">
                            <article className="h-[300px] rounded-[20px] bg-white shadow-xl overflow-hidden group flex flex-row items-stretch">
                                <div className="p-6 w-2/5 flex items-center h-full">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 text-left">Casual </h2>
                                    </div>
                                </div>

                                <div className="w-3/5 flex items-stretch justify-center bg-white overflow-hidden">
                                    <img
                                        src="/gallery1.webp"
                                        alt="Gym Wear"
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </article>
                        </div>

                        <div className="md:col-span-8">
                            <article className="h-[300px] rounded-[20px] bg-white shadow-xl overflow-hidden group flex flex-row items-stretch">
                                <div className="p-8 w-2/5 flex items-center h-full">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2 text-left">Formal</h2>
                                    </div>
                                </div>

                                <div className="w-3/5 flex items-stretch justify-center bg-white overflow-hidden">
                                    <img
                                        src="/gallery2-removebg-preview.png"
                                        alt="Formal Dress"
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </article>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                        <div className="md:col-span-8">
                            <article className="h-[300px] rounded-[20px] bg-white shadow-xl overflow-hidden group flex flex-row items-stretch">
                                <div className="p-8 w-2/5 flex items-center h-full">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2 text-left">Party  </h2>
                                    </div>
                                </div>

                                <div className="w-3/5 flex items-stretch justify-center bg-white overflow-hidden">
                                    <img
                                        src="/gallery3-removebg-preview.png"
                                        alt="Party Dress"
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </article>
                        </div>

                        <div className="md:col-span-4">
                            <article className="h-[300px] rounded-[20px] bg-white shadow-xl overflow-hidden group flex flex-row items-stretch">
                                <div className="p-6 w-2/5 flex items-center h-full">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 text-left">Gym</h2>
                                    </div>
                                </div>

                                <div className="w-3/5 flex items-stretch justify-center bg-white overflow-hidden">
                                    <img
                                        src="/gallery4-removebg-preview.png"
                                        alt="Gym Wear"
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Styles;
