"use client"

import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logout } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

export default function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [userData, setUserData] = useState(null);
    const [users, setUsers] = useState([]);
    const [showLogOut, setShowLogOut] = useState(false);
    const logoutRef = useRef(null)
    const router = useRouter();
    const moveBack = () => { router.push('/dash') }

    async function checkUser() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userInfo = userSnap.data();

                    setUserData({
                        email: user.email,
                        firstName: userInfo.firstName, // Fixed: Use `userInfo` instead of `user`
                        lastName: userInfo.lastName,
                        dateOfBirth: userInfo.dateOfBirth,
                        adminRights: userInfo.adminRights,
                    });
                } else {
                    console.error("No user found in my system. DU ER HER ULOVLIG. HOW?")
                    router.push('/register');
                }
            } else {
                console.error("User not logged inn. Du må til loginn")
                router.push('/loginn');
            }
            setLoading(false)
        })
    }

    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function
            console.log("Successfully logged out");
            router.push("/"); // Redirect to the login page
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        checkUser();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const userInfo = userSnap.data();
                        setUserData(userInfo);
                        setAuthorized(true); // Set authorized to true
                    } else {
                        router.push('/register');
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                router.push('/loginn');
            }
            setLoading(false);
        });
        return () => unsubscribe(); // Cleanup the listener
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(logoutRef.current && !logoutRef.current.contains(event.target)) {
                console.log('Clicked outside');
                setShowLogOut(false);
            }
        };

        if(showLogOut) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showLogOut]);

    if (loading) {
        return <div className="h-screen w-screen bg-backgroundWhite flex items-center justify-center text-black">Loading...</div>;
    }

    return (
        <div className="h-screen w-screen bg-backgroundWhite p-7 overflow-x-hidden">
            {/** Head */}
            <div className="w-full h-16 bg-coolBlue grid grid-cols-3 items-center rounded-md">
                {/* Back Button */}
                <div className="text-lg text-white text-left pl-5 cursor-pointer w-25" onClick={moveBack}>
                    arrow
                </div>

                {/* User Name */}
                <div className="text-center">
                    {userData && (
                        <h1 className="text-white text-2xl">{userData.firstName} {userData.lastName}</h1>
                    )}
                </div>

                {/* Log Out Button */}
                <div className="text-right pr-5">
                    <button
                        onClick={() => setShowLogOut(!showLogOut)}
                        className="bg-regretRed text-white text-l px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                    >
                        Log out
                    </button>
                </div>
            </div>

            {/** Logout Confirmation Modal */}
            {showLogOut && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <div
                        ref={logoutRef}
                        className="bg-specialWhite h-40 w-100 p-8 rounded-md shadow-md"
                        onClick={(e) => e.stopPropagation()} // Prevent modal close on its content click
                    >
                        <p className="text-black mb-8">
                            Are you sure you want to log out, {userData?.firstName}?
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={handleLogout}
                                className="bg-regretRed text-white px-3 py-1 rounded-md hover:bg-red-700"
                            >
                                LOG OUT
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/** Main Content Container */}
            <div className="flex flex-col space-y-4 h-full overflow-hidden">
                <div className="flex space-x-6 mt-7 h-full">
                    {/** Sidebar */}
                    <div className="bg-correctBlue flex flex-col items-center h-96 w-96 px-5 py-2 rounded-md">
                        {/* Sidebar Content */}
                        <div className="flex flex-col justify-evenly h-full w-full">
                            <button className="text-specialWhite text-lg h-12 w-full">Oversikt</button>
                            <button className="text-specialWhite text-lg h-12 w-full">Team</button>
                            <button className="text-specialWhite text-lg h-12 w-full">Oppgaver</button>
                            <button className="text-specialWhite text-lg h-12 w-full">Innstillinger</button>
                        </div>
                    </div>

                    {/** Assigned Tasks */}
                    <div className="bg-correctBlue flex-grow h-full rounded-md p-4">
                        <div className="rounded-lg flex flex-col h-full">
                            <h2 className="text-white text-xl text-center pb-3">ASSIGNED TASKS</h2>
                            <div className="bg-specialWhite rounded-lg p-4 relative h-full">
                                {/* Tasks Content */}
                            </div>
                        </div>
                    </div>
                </div>
                {/**Notes */}
                <div className="bg-correctBlue w-full h-3/5 rounded-md p-4">
                    <h2 className="text-white text-xl text-center pb-3">NOTES</h2>
                    <div className="bg-specialWhite rounded-md p-4 h-5/6">
                        {/* Notes Content */}
                    </div>
                </div>
            </div>
        </div>
    )
}