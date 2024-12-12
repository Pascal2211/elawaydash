"use client"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from 'react';
import Ticker from './components/ticker';

export default function Home() {
    const router = useRouter();



    return (
        <div className="min-h-screen w-screen bg-backgroundWhite flex flex-col">
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
            <main className="flex-grow grid grid-rows-[2fr] gap-4 p-4 pb-10">
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

                        <g className="cursor-pointer" onClick={() => router.push('/dash')}>
                            <rect x="940" y="460" width="250" height="50" fill="#2E6877" stroke="black" rx="5" ry="5" />
                            <text x="1065" y="485" font-size="16" fill="white" alignment-baseline="middle" text-anchor="middle">DASHBOARD</text>
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
            </main>
            {/**Happy Clients */}
            <div className="flex flex-col items-center pt-5 pb-10">
                <div className="">
                    <h1 className="text-correctBlue text-3xl">HAPPY CLIENTS</h1>
                </div>
                <Ticker />
            </div>

            <footer class="bg-correctBlue pt-12 pb-6 px-10 font-[sans-serif] tracking-wide">
                <div class="max-w-screen-xl mx-auto">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="lg:flex lg:items-center">
                            <a href="javascript:void(0)">
                                <h1>PK DASH</h1>
                            </a>
                        </div>

                        <div class="lg:flex lg:items-center">
                            <ul class="flex space-x-6">
                                <li>
                                    <a href="javascript:void(0)">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-gray-300 hover:fill-white w-7 h-7" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd"
                                                d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-gray-300 hover:fill-white w-7 h-7" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd"
                                                d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="fill-gray-300 hover:fill-white w-7 h-7"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M22.92 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.83 4.5 17.72 4 16.46 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.9 20.29 6.16 21 8.58 21c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="text-lg mb-6 text-white">Useful links</h4>
                            <ul class="space-y-4 pl-2">
                                <li>
                                    <a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Featured</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">New Arrivals</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">New Arrivals</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="text-lg mb-6 text-white">Information</h4>
                            <ul class="space-y-4 pl-2">
                                <li>
                                    <a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">About Us</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Terms &amp; Conditions</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Sale</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Documentation</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p class='text-gray-300 text-sm mt-10'>© PKDASH. All rights reserved.
                    </p>
                </div>
            </footer>


        </div>
    )
}