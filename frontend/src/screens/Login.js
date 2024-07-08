import React, { useEffect, useState } from "react";
import { Button, Input } from "../components/Form";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { userSignIn } from "../api/signInAPI";
import { getSession } from "../utils/getSession";
import { toast } from 'react-hot-toast';
import { useAuth } from "../hooks/Auth"

function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // get session data if there is an active session in local Storage
    const { session, user, error } = getSession()

    if (error) {
      setLoading(false);
      return;
    } else if (session) {
      setSession(session);
      setLoading(false);
      navigate("/home")
      return;
    }
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const authUser = await userSignIn({ email, password });
      console.log("authUser", authUser);
      if (authUser.session) {
        localStorage.setItem("session", JSON.stringify(authUser));
        setUser(authUser.user)
        toast.success("Usuário logado com sucesso!")
        navigate("/home");
      } else {
        setEmail('')
        setPassword('')
        setLoading(false)
        toast.error(authUser.response.data.message)
      }
    } catch (error) {
      console.log("Erro", error);
    }
  };

  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form onSubmit={handleLogin} className="w-4/5 sm:w-2/5 md:w-8/12 lg:w-3/5 xl:w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo">
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-48 h-16 object-contain"
        />
        <div className="flex flex-col gap-4 w-full mb-6">
          <Input
            label="Email"
            type="email"
            value={email}
            required={true}
            color={true}
            placeholder={"admin@gmail.com"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            color={true}
            required={true}
            placeholder={"senha"}
            autoComplete={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          label="Login"
          Icon={BiLogInCircle}
          type="submit"
          //onClick={handleLogin}
          loading={loading}
        />
      </form>
    </div>
  );
}

export default Login;
