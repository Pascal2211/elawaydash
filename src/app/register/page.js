"use client";
import Image from "next/image";
import elawayLogo from '/public/Elaway.webp';
import { useState } from "react";
import { registerWithEmailAndPassword } from "@/firebase/auth";
import { useRouter } from "next/navigation";  
import { db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore"

export default function Home() {
  const [fornavn, setFornavn] = useState("");
  const [etternavn, setEtternavn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fullName, setFullName] = useState("");

  const router = useRouter(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);  
    setLoading(true);  // Set loading to true when registration begins

    if(password !== confirmPassword) {
        setError("Passordene stemmer ikke overens")
        return;
    }
  
    try {
      setLoading(true)

      const userCredential = await registerWithEmailAndPassword(email, password);
      const user = userCredential.user;  
      console.log("User registered:", user);  
      
      
      await setDoc(doc(db, "users", user.uid), {
        firstName: fornavn,
        lastName: etternavn,
        email: user.email,  
        adminRights: false, 
        superAdmin: false,
        userId: user.uid,
      });

      const userFullName = `${fornavn} ${etternavn}`;
      setFullName(userFullName);
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false);
        router.push('/dash')
      }, 4000);

    } catch (err) {
      console.error("Registration error:", err.message);
      setError(err.message);  
    } finally {
      setLoading(false);  
    }
  };

  const logInn = () => {router.push('/loginn')}

  return (
    <div className="h-screen w-screen bg-backgroundWhite flex items-center justify-center">

      <div className="w-1/3 h-5/6 bg-correctBlue rounded-xl shadow-lg pr-8 pl-8 pt-3" id="Registrer schema">
        <h1 className="text-2xl flex justify-center align-middle pt-2">Registrer deg</h1>
        <form onSubmit={handleRegister} className="grid grid-cols-1 ">

          <label className="pt-4">Fornavn</label>
          <input className="p-2 rounded-md h-16 text-black bg-specialWhite" value={fornavn} onChange={(e) => setFornavn(e.target.value)} type="text" placeholder="Fornavn"/>

          <label className="pt-7">Etternavn</label>
          <input className="p-2 rounded-md h-16 text-black bg-specialWhite" value={etternavn} onChange={(e) => setEtternavn(e.target.value)} type="text" placeholder="Etternavn"/>

          <label className="pt-7">Email</label>
          <input className="p-2 rounded-md h-16 text-black bg-specialWhite" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email"/>

          <label className="pt-7">Passord</label>
          <input className="p-2 rounded-md h-16 text-black bg-specialWhite" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Passord"/>

          <label className="pt-7">Bekreft Passord</label>
          <input className="p-2 rounded-md h-16 text-black bg-specialWhite" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
          type="password"
          placeholder="Bekreft Passord"></input>
          
          {/* Error Handling */}
          {error && <p className="text-red-500 pt-3">{error}</p>}

          {/* Submit Button Inside the Form */}
          <button type="submit" className="bg-specialWhite text-correctBlue rounded-md mt-4 h-16 " disabled={loading}>
            {loading ? "Registerer..." : "Registrer deg"}  {/* Show loading state */}
          </button>
        </form>

        <div className="pt-6 flex justify-center items-center">
          <p className="pr-6">Har du en konto?</p>
          <button type="submit" className="bg-specialWhite text-correctBlue h-10 px-4 rounded-lg" onClick={logInn}>Logg inn</button>
        </div>
        

      </div>


      {/**Elaway logoen */}
      <div className="w-1/4 h-5/6 bg-specialWhite flex items-center justify-center">
        <Image alt="Picture of the Logo" className=""/>
      </div>

      {/**Success PopUp */}
      {showSuccess && (
        <div className="absolute bg-specialWhite text-black p-8 rounded-lg shadow-xl flex flex-col justify-center items-center">
          <h2 className="text-xl">Velkommen til KORK</h2>
          <h3 className="text-xl">Også kjent som KARSTEN`s OBJECTIVES, RESULTS AND KEYS</h3>
          <h2 className="text-xl">{fullName}</h2>
        </div>
      )}

    </div>
  );
}