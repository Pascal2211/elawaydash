"use client"
import { loginWithEmailAndPassword } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Loginn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogInn = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try{

            const user = await loginWithEmailAndPassword(email, password);
            console.log("Successfull log inn");
            router.push('/dash')

        } catch (error){
            if(error.code === 'auth/wrong password') {
                setError("Feil passord")
                console.log("Feil passord")
            } else if (error.code === 'auth/user-not-found'){
                setError("Ingen bruker funnet med denne emailen")
                console.log("ingen bruker funnet med denne mailen")
            } else {
                setError(error.message);
                console.log("Du er på bærtur pascal. Noke er feil!")
            }

        } finally {

            setLoading(false);
        } 
    }

    const handleFocus = () => {
        setError(null)
    }
    
    const moveToRegister = () => {
        router.push('/register')
    }

    return(
        <div className="h-screen w-screen bg-backgroundWhite flex items-center justify-center">
            
            <div className="w-1/3 h-3/5 bg-correctBlue rounded-xl shadow-lg p-8">
                <h1 className="text-2xl flex justify-center items-center">Log Inn</h1>
                <form className="grid grid-cols-1 pt-2" onSubmit={handleLogInn}>
                    <label className="pt-8 pb-1">Email</label>
                    <input className="p-2 rounded-md h-16 text-black bg-specialWhite" value={email} onFocus={handleFocus} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email"/>

                    <label className="pt-14 pb-1">Passord</label>
                    <div className="relative">
                        <input className="p-2 rounded-md h-16 text-black w-full bg-specialWhite" onFocus={handleFocus} value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Passord"/>
                        <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-correctBlue pr-2" onClick={() => setShowPassword(!showPassword)}> {showPassword ? "skjul" : "vis"}  </button>
                    </div>

                    {error && <p className="pt-4 text-white text-xl">{error}</p>}
                    <div className="flex justify-between pt-20 space-x-4">
                        {/* Register Button on the right */}
                        <button className="bg-specialWhite text-correctBlue w-2/4 h-16 rounded-lg" type="submit" onClick={moveToRegister}>
                            Registrer deg
                        </button>

                        <button className="bg-specialWhite text-correctBlue w-2/4 h-16 rounded-lg" type="submit" disabled={loading}>
                            {loading ? "Logging inn..." : "Log In"}
                        </button>

                    </div>
                </form>
            </div>
            <div className="bg-specialWhite w-1/4 h-3/5 rounded-xl">
            </div>
        </div>
    )

}