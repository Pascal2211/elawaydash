"use client"

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function adminPage(){
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [userData, setUserData] = useState(null);
    const router = useRouter();
    const auth = getAuth();
    
    //Einaste emailen som for se denne siden
    const moveHome = () => {router.push('/')}
    const moveTeam = () => {router.push('/adminPanel')}
    const moveTask = () => {router.push('/tasks')}
    const moveSettings = () => {router.push('settingsk')}
    const moveToProfile = () => {router.push('/usrProfile')}
  

    return(
        <div className="h-screen w-screen bg-backgroundWhite">
        <div className="grid grid-rows-[auto,1fr] gap-6 p-8 h-full">
          <div className="grid grid-cols-3 gap-4">
            
            <div className="bg-correctBlue col-span-1 flex items-center justify-center h-20 w-96 rounded-lg p-4">
              {userData ? (
                <button className="text-specialWhite text-2xl" onClick={moveToProfile}>God morgen {userData.firstName}</button>
                ) : (
                <p>Ingenting å vise</p>
                )}
              </div>

            {/* Navbar */}
            <div className="bg-correctBlue col-span-2 flex justify-between items-center space-x-6 h-20 px-10 rounded-lg">
              <button className="bg-specialWhite text-correctBlue h-12 w-1/6 rounded-lg" onClick={moveHome}>Oversikt</button>
              <button className="bg-specialWhite text-correctBlue h-12 w-1/6 rounded-lg" onClick={moveTeam}>Team</button>
              <button className="bg-specialWhite text-correctBlue h-12 w-1/6 rounded-lg" onClick={moveTask}>Oppgaver</button>
              <button className="bg-specialWhite text-correctBlue h-12 w-1/6 rounded-lg" onClick={moveSettings}>Innstillinger</button>
            </div>

          </div>

          {/* Second Row: Content Area */}
          <div className="bg-correctBlue rounded-lg p-5 flex flex-col h-full">
            <h2 className="text-center text-2xl mb-8">Oppgaver for denne sesong</h2>
            <div className="bg-specialWhite flex-grow rounded-lg">

            </div>
          </div>
        </div>
      </div>
    );
}