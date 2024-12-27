"use client"

export default function Loading() {
    return (
        <div className="w-screen h-screen bg-white flex justify-center items-center">
            <button
                type="button"
                className="px-5 py-2.5 rounded-lg flex items-center justify-center text-white text-sm tracking-wider font-semibold border-none outline-none bg-correctBlue hover:bg-blue-700 active:bg-blue-600"
            >
                Loading
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    fill="#fff"
                    className="ml-2 inline animate-spin"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                        data-original="#000000"
                    />
                </svg>
            </button>
        </div>
    )
}