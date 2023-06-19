import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginService from "../services/login";

import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser ] = useState(null)
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem(localStorage.getItem("loggedUser") || false)
  );
  

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
        const user = await loginService.login({
            username,
            password
        })
        
        // local storage
        setAuthenticated(true)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        setUser(user);
        setUsername('')
        setPassword('') 
        navigate('/profile')
    } catch (err){
        toast.error('informations erronées', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
  }


  return (
    <main className="h-screen flex items-center justify-center">
      <section className="font-header bg-zinc-200 p-8">
        <h1 className="py-2 text-3xl font-bold font-header ">Se connecter</h1>
        <form
          method="post"
          className="flex flex-col py-6"
          onSubmit={handleLogin}
        >
          <input
            className="p-4  rounded-lg mb-4"
            placeholder="Nom d'utilisateur"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            className="p-4 rounded-lg mb-4"
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}

          />
          <button className="bg-emerald-100 p-4  rounded-lg mb-4" type="submit">
            Connectez-vous
          </button>
        </form>
        <span>
          Vous n'avez pas encore de compte?{" "}
          <Link to="/register" className="text-emerald-500 underline">
            Inscrivez-vous
          </Link>
        </span>

        <div className="border-t border-zinc-400 pt-6">
          <button className="m-auto flex gap-4 p-4 items-center bg-white">
            <FcGoogle /> Se connecter avec Google
          </button>
        </div>
      </section>
    </main>
  );
};

export default LoginScreen;
