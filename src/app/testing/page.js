"use client";

import LottieAnimation from "../components/inProgress";

export default function Testing() {
  return (
    <div className="bg-specialWhite h-screen w-screen flex items-center justify-center">
      <LottieAnimation />
      <p className="text-center text-lg text-gray-700 mt-4">
        Oops! This page is not ready yet.
      </p>
    </div>
  );
}