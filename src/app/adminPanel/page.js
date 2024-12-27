"use client"

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, getDocs, collection, query, where, orderBy } from "firebase/firestore";
import Loading from "../components/loading";

export default function Adminpage() {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [userData, setUserData] = useState(null); //
    const [users, setUsers] = useState([]); //stores the users in a array and displays them
    const [showPopup, setShowPopup] = useState(false); // State that shows the popup
    const [selectedUser, setSelectedUser] = useState(null); //Tracks the user for popip
    const [newUsers, setNewUsers] = useState([]);
    const [viewingNewUsers, setViewingNewUsers] = useState(false);
    const router = useRouter();
    const auth = getAuth();

    //Einaste emailen som for se denne siden
    const allowedEmail = "karsten.refsdal@icloud.com"

    async function checkUserAuthorization() {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setLoading(false);
                return router.push('/loginn');
            }
    
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
    
            if (!userSnap.exists()) {
                console.error("User not found");
                setLoading(false);
                return router.push('/loginn');
            }
    
            const userInfo = userSnap.data();
            const isAdmin = userInfo.superAdmin === true;
    
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

    // //Function to check if the user is new to eventually grant them 
    // async function fetchNewUsers(){
    //     const oneWeekAgo = new Date();
    //     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    //     const q = query(
    //         collection(db, "users"),
    //         where("createdAt", ">", oneWeekAgo),
    //         orderBy("createdAt", "desc")
    //     );

    //     const querySnapShot = await getDocs(q);
    //     const newUserList = 
    // }


    useEffect(() => {
        const unsubscribe = checkUserAuthorization();
        return () => unsubscribe;
    }, [router]);


    const moveHome = () => { router.push('/dash') }
    const moveTeam = () => { router.push('/adminPanel') }
    const moveTask = () => { router.push('/tasks') }
    const moveSettings = () => { router.push('settingsk') }
    const moveToProfile = () => { router.push('/usrProfile') }

    if(loading){
        return <Loading/>
    }


    return (
        <div className="h-screen w-screen bg-backgroundWhite">
            <div className="grid grid-cols-[auto,1fr] gap-6 p-8 h-full">
                <div className="flex flex-col space-y-6">
                    <div className="bg-kindaBlue flex items-center justify-center h-20 w-96 rounded-lg p-4">
                        {userData ? (
                            <button onClick={moveToProfile} className="text-specialWhite text-2xl">{userData.firstName}</button>
                        ) : (
                            <p>Ingenting å vise</p>
                        )}
                    </div>
                    
                    {/* Sidebar for new users */}
                    <div className="bg-correctBlue flex flex-col items-center space-y-6 w-96 h-auto rounded-lg px-5">
                        <button>New users</button>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-correctBlue flex flex-col items-center space-y-6 h-auto w-96 px-5 py-8 rounded-lg">
                        <button className="text-specialWhite text-lg h-12 w-full" onClick={moveHome}>Oversikt</button>
                        <button className="text-specialWhite text-lg h-12 w-full" onClick={moveTeam}>Team</button>
                        <button className="text-specialWhite text-lg h-12 w-full" onClick={moveTask}>Oppgaver</button>
                        <button className="text-specialWhite text-lg h-12 w-full" onClick={moveSettings}>Innstillinger </button>
                    </div>

                </div>

                <div className="bg-correctBlue p-8 rounded-lg shadow-lg pt-4 mb-6 min-h-[150px] h-auto overflow-y-auto">

                    <div className="rounded-lg flex flex-col h-full">
                        {/* Title */}
                        <h2 className="text-center text-2xl pb-4">TEAM</h2>

                        {/* Fixed White Background Container */}
                        <div className="bg-backgroundWhite rounded-lg p-4 relative h-full">
                            {/* Header Row */}
                            <div className="grid grid-cols-5 gap-1 items-center h-16 px-5">
                                <h1 className="text-black text-center">NAVN</h1>
                                <h1 className="text-black text-center">ETTERNAVN</h1>
                                <h1 className="text-black text-center">EMAIL</h1>
                                <h1 className="text-black text-center">ADMIN</h1>
                                <h1 className="text-black text-center">AKTIV</h1>
                            </div>

                            {/* Scrollable User List */}
                            <div className="overflow-y-auto absolute top-[96px] bottom-4 left-4 right-4 rounded-lg p-2">
                            {users.length > 0 ? (
                                <ul className="space-y-3">
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
        </div >
    );
}