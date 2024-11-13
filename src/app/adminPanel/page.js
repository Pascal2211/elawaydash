"use client"

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

export default function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [userData, setUserData] = useState(null);
    const [users, setUsers] = useState([]);
    const router = useRouter();
    const auth = getAuth();

    //Einaste emailen som for se denne siden
    const allowedEmail = "karsten.refsdal@icloud.com"

    async function checkUserAuthorization() {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userInfo = userSnap.data();

                    const isAdmin = userInfo.superAdmin === true

                    //Ment for å sette dataen 
                    setUserData({
                        email: user.email,
                        firstName: userInfo.firstName,
                        lastName: userInfo.lastName,
                        adminRights: isAdmin,
                    });



                    if (user.email === allowedEmail || isAdmin) {
                        setAuthorized(true);
                        await fetchAllUsers();

                    } else {
                        setAuthorized(false);
                        router.push('/notAuthorized');
                    }
                } else {
                    console.error("Ingen bruker i systemet");
                    setLoading(false);
                    router.push('/loginn')
                }

            } else {
                setLoading(false);
                router.push('/loginn');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }

    async function fetchAllUsers() {
        const querySnapShot = await getDocs(collection(db, "users"));
        const usersList = [];

        querySnapShot.forEach((doc) => {
            usersList.push(doc.data());
        });
        setUsers(usersList)

        console.log("User Info:", usersList);
    }

    useEffect(() => {
        const unsubscribe = checkUserAuthorization();
        return () => unsubscribe;
    }, [router]);


    const moveHome = () => { router.push('/') }
    const moveTeam = () => { router.push('/adminPanel') }
    const moveTask = () => { router.push('/tasks') }
    const moveSettings = () => { router.push('settingsk') }
    const moveToProfile = () => { router.push('/usrProfile') }


    return (
        <div className="h-screen w-screen bg-backgroundWhite">
            <div className="grid grid-cols-[auto,1fr] gap-6 p-8 h-full">
                <div className="flex flex-col space-y-6">
                    <div className="bg-kindaBlue flex items-center justify-center h-20 w-96 rounded-lg p-4">
                        {userData ? (
                            <button className="text-specialWhite text-2xl">{userData.firstName}</button>
                        ) : (
                            <p>Ingenting å vise</p>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="bg-correctBlue flex flex-col items-center space-y-6 h-auto w-96 px-5 py-8 rounded-lg">
                        <button className="text-specialWhite text-lg h-12 w-full" onClick={moveHome}>Oversikt</button>
                        <button className="text-specialWhite text-lg h-12 w-full" onClick={moveTeam}>Team</button>
                        <button className="text-specialWhite text-lg h-12 w-full" onClick={moveTask}>Oppgaver</button>
                        <button className="text-specialWhite text-lg h-12 w-full" onClick={moveSettings}>Innstillinger </button>
                    </div>

                    {/* Second Row: Content Area */}
          <div className="bg-correctBlue rounded-lg p-5 flex flex-col h-full">
            <h2 className="text-center text-2xl mb-8">TEAM</h2>
            <div className="bg-specialWhite flex-grow rounded-lg">
                {/**Displayer alle brukere */}
                <div className="grid grid-cols-5 gap-4 items-center h-16 px-10">
                    <h1 className="text-black text-center">ETTERNAVN</h1>
                    <h1 className="text-black text-center">NAVN</h1>
                    <h1 className="text-black text-center">EMAIL</h1>
                    <h1 className="text-black text-center">ADMIN</h1>
                    <h1 className="text-black text-center">AKTIV</h1>
                </div>

                {users.length > 0 ? (
                    <ul className="space-y-3 pr-5 pl-5">
                        {users.map((user, index) => (
                            <li key={index} className="grid grid-cols-5 gap-4 items-center border-correctBlue border-3 px-10 py-4 border">
                                <div className="text-black text-center">
                                    <p>{user.firstName}</p>
                                </div>

                                 <div className="text-black text-center">
                                    <p>{user.lastName}</p>  
                                </div>

                                <div className="text-black text-center overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    <p>{user.email}</p>
                                </div>

                                <div className="text-black text-center">
                                    <p>{user.adminRights ? 'TRUE' : 'FALSE'}</p>
                                </div>
                                
                                <div className="text-black text-center">
                                    <p>Nei</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    ) : (
                        <p className="text-black">No users found.</p>
                    )}
            </div>
          </div>

                </div>
            </div>
        </div>
    );
}