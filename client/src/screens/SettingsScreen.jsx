import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Button from "../components/Button";
import userService from "../services/user";

import ImageUpload from "../components/ImageUploader";


const SettingsScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userService
      .update(user.id, { username })
      .then((returnedUser) =>{ 
        console.log(returnedUser)
        setUsername(returnedUser.username)
        setUser(returnedUser)})
      .catch(() => {
        console.error("Il y a eu une erreur. Veuillez réessayer.")
        setUsername(user.username)
      });
  };

  console.log(user)

  return (
    
    <main className="p-10 flex flex-col justify-center">
      <h1 className="py-2 text-3xl font-bold font-header ">Mon profil</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex p-8 gap-14 items-start">
          <div>
            {/* <img className="w-14" src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/v1687884581/${user.profilePicture}.jpg`} alt="profil" />
            <button className="text-sm text-emerald-500">Modifier</button> */}
            <ImageUpload/>
          </div>
          <div className="flex gap-2">
            <input
              className="text-xl p-2"
              value={username}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button text={"confirmer"} color={"emerald-200"} />
      </form>
    </main>
  );
};

export default SettingsScreen;