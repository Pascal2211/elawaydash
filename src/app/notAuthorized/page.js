"use client"
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

export default function notAuthorized() {
    const [userData, setUserData] = useState(null)
    const router = useRouter();

    const sendHimHome = () => { router.push('/loginn') }

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);


                const unsubscribeUserDoc = onSnapshot(userRef, (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const userInfo = docSnapshot.data();

                        if (userInfo.adminRights) {
                            router.push('/dash')
                        } else {
                            setUserData({
                                firstName: userInfo.firstName,
                                lastName: userInfo.lastName,
                            });
                        }
                    } else {
                        console.error("The user document does not exist !");
                        //Lag en waiting page med noen kule animasjoner. 
                        router.push('/dash')
                    }
                });

                return () => unsubscribeUserDoc();
            } else {
                router.push('/loginn');
            }
        });

        return () => unsubscribeAuth();
    }, [auth, router]);

    const moveHome = () => {
        router.push('/')
    }

    return (
        <div className="h-screen w-screen bg-backgroundWhite flex flex-col items-center justify-center">
            <svg width="1432" height="628" viewBox="0 0 1432 628" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_219_442)">
                    <path d="M10 15C10 6.71573 16.7157 0 25 0H373.5H1411C1419.28 0 1426 6.71573 1426 15V141C1426 149.284 1419.28 156 1411 156H1192C1183.72 156 1177 162.716 1177 171V392C1177 400.284 1183.72 407 1192 407H1411C1419.28 407 1426 413.716 1426 422V558C1426 566.284 1419.28 573 1411 573H1177H1057C1048.72 573 1042 566.284 1042 558V450.5C1042 442.216 1035.28 435.5 1027 435.5H388.5C380.216 435.5 373.5 442.216 373.5 450.5V558C373.5 566.284 366.784 573 358.5 573H25C16.7157 573 10 566.284 10 558V343C10 334.716 16.7157 328 25 328H238.5C246.784 328 253.5 321.284 253.5 313V207.5C253.5 199.216 246.784 192.5 238.5 192.5H25C16.7157 192.5 10 185.784 10 177.5V15Z" fill="#2E6877" />
                    <path d="M25 1H373.5H1411C1418.73 1 1425 7.26801 1425 15V141C1425 148.732 1418.73 155 1411 155H1192C1183.16 155 1176 162.163 1176 171V392C1176 400.837 1183.16 408 1192 408H1411C1418.73 408 1425 414.268 1425 422V558C1425 565.732 1418.73 572 1411 572H1177H1057C1049.27 572 1043 565.732 1043 558V450.5C1043 441.663 1035.84 434.5 1027 434.5H388.5C379.663 434.5 372.5 441.663 372.5 450.5V558C372.5 565.732 366.232 572 358.5 572H25C17.268 572 11 565.732 11 558V343C11 335.268 17.268 329 25 329H238.5C247.337 329 254.5 321.837 254.5 313V207.5C254.5 198.663 247.337 191.5 238.5 191.5H25C17.268 191.5 11 185.232 11 177.5V15C11 7.26802 17.268 1 25 1Z" stroke="black" stroke-width="2" />
                </g>
                <text x="590" y="80" font-size="30" fill="White">ACCESS DENIED</text>
                <text x="380" y="150" font-size="24" fill="White">Sorry, {userData ? `${userData.firstName}` : "User"} you don´t have access to the dashboard quite yet</text>
                <text x="570" y="200" font-size="22" fill="White">Please wait for admin approval.</text>
                <defs>
                    <filter id="filter0_d_219_442" x="0.7" y="0" width="1430.6" height="627.3" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dx="-2" dy="47" />
                        <feGaussianBlur stdDeviation="3.65" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_219_442" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_219_442" result="shape" />
                    </filter>
                </defs>
            </svg>
        </div>
    )
}