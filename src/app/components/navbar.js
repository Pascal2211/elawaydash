"use client"
import { useRouter } from "next/navigation";  


export default function Navbar(){
    const router = useRouter();

    const moveHome = () => {
        router.push('/')
    }

    const moveTeam = () => {
        router.push('/adminPanel')
    }

    const moveTask = () => {
        router.push('/tasks')
    }

    const moveTeams = () => {
        router.push('usrProfile')
    }
    return(
        //Navbar
        <div className="bg-correctBlue col-span-2 flex justify-between items-center space-x-6 h-20 px-10 rounded-lg">
            <button className="bg-specialWhite text-correctBlue h-12 w-1/6 rounded-lg" onClick={moveHome}>Oversikt</button>
            <button className="bg-specialWhite text-correctBlue h-12 w-1/6 rounded-lg" onClick={moveTeam}>Team</button>
            <button className="bg-specialWhite text-correctBlue h-12 w-1/6 rounded-lg" onClick={moveTask}>Oppgaver</button>
            <button className="bg-specialWhite text-correctBlue h-12 w-1/6 rounded-lg" onClick={moveTeams}>Team</button>
        </div>
    )   
}