"use client"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter();



    return (
        <div className="h-screen w-screen bg-backgroundWhite">
            <div className="grid grid-rows-[auto,1fr,auto] grid-cols-1 gap-4 h-screen">
                {/* Navbar */}
                <div className="grid grid-cols-4 gap-4 pt-4">
                    <div className="col-span-1 flex items-center justify-center h-20 w-96 rounded-lg p-4">
                        <h1 className="text-black text-2xl">PK  DASH</h1>
                    </div>

                    <div className="w-1">

                    </div>

                    <div className="col-span-2 flex justify-between items-center space-x-6 h-20 px-10 rounded-lg">
                        <button className="text-black text-xl">PRICING</button>
                        <button className="text-black text-xl">PRODUCTS</button>
                        <button className="text-black text-xl">ABOUT</button>
                    </div>
                </div>

                {/* Main Content */}
                <main className="grid grid-rows-[2fr,1fr,1fr] gap-4 p-4">
                    {/* Section 1: Main Banner */}
                    <div className="w-full max-w-[95%] mx-auto">

                        <svg className="w-full" viewBox="0 0 1426 583" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_219_442)">
                                <path d="M353.5 234C361.784 234 368.5 227.284 368.5 219V16C368.5 7.71573 375.216 1 383.5 1H1406C1414.28 1 1421 7.71573 1421 16V559C1421 567.284 1414.28 574 1406 574H20C11.7158 574 5 567.284 5 559V249C5 240.716 11.7157 234 20 234H353.5Z" fill="#B5CED5" />
                                <path d="M1420 16V559C1420 566.732 1413.73 573 1406 573H20C12.268 573 6 566.732 6 559V249C6 241.268 12.268 235 20 235H353.5C362.337 235 369.5 227.837 369.5 219V16C369.5 8.26801 375.768 2 383.5 2H1406C1413.73 2 1420 8.26801 1420 16Z" stroke="black" stroke-width="2" />
                            </g>
                            <text x="270" y="80" font-size="24" fill="black">THINK</text>
                            <text x="380" y="80" font-size="24" fill="black">OUTSIDE THE BOX</text>
                            <text x="270" y="140" font-size="24" fill="black">THINK</text>
                            <text x="380" y="140" font-size="24" fill="black">INSIDE THE BOX</text>
                            <text x="780" y="80" font-size="24" fill="black">DO THE MOST, WITH THE SIMPLEST</text>
                            <text x="780" y="140" font-size="18" fill="black">Or whatever, thats what we think. And you should think so too</text>
                            {/**Categories */}
                            <text x="70" y="330" font-size="16" fill="black">Minimized solutions</text>
                            <text x="70" y="410" font-size="16" fill="black">Great developed</text>
                            <text x="70" y="490" font-size="16" fill="black">Synergi</text>

                            <text x="350" y="330" font-size="16" fill="black">collaboratively network fully researched value</text>
                            <text x="350" y="410" font-size="16" fill="black">collaboratively utilize plug-and-play users</text>
                            <text x="350" y="490" font-size="16" fill="black">dynamically utilize visionary architectures</text>

                            <g className="cursor-pointer" onClick={() => router.push('/loginn')}>
                                <rect x="770" y="380" width="250" height="50" fill="#298BA4" stroke="black" rx="5" ry="5" />
                                <text x="895" y="405" font-size="16" fill="white" alignment-baseline="middle" text-anchor="middle">Log inn</text>
                            </g>

                            <g className="cursor-pointer" onClick={() => router.push('/register')}>
                                <rect x="1100" y="380" width="250" height="50" fill="#2E6877" stroke="black" rx="5" ry="5" />
                                <text x="1225" y="405" font-size="16" fill="white" alignment-baseline="middle" text-anchor="middle">Register</text>
                            </g>


                            <defs>
                                <filter id="filter0_d_219_442" x="0" y="0" width="1726" height="683" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2.5" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_219_442" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_219_442" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </div>

                    Section 2: Clients
                    {/* <section className="bg-lightBlue rounded-lg">Clients Content</section> */}

                    {/* Section 3: Customer Feedback */}
                    {/* <section className="bg-lightBlue rounded-lg">Customer Feedback Content</section> */}
                </main>

                {/* Footer */}
                {/* <footer className="bg-darkBlue p-4">Footer Content</footer> */}
            </div>
        </div>
    )
}