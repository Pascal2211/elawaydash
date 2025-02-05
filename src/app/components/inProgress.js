"use client"

import { LottiePlayer } from "lottie-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieAnimation = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <DotLottieReact
      src="/animations/manProgramming.lottie"
      loop
      autoplay
    />
        </div>
      );
}

export default LottieAnimation;