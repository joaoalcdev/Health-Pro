// dependencies - libraries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// data - api
import { useAuth } from "../hooks/Auth"
import { userSignIn } from "../api/signInAPI";
import { getSession } from "../utils/getSession";

// icons
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { BiLogInCircle } from "react-icons/bi";

// components
import { Button, Input } from "../components/Form";
import { toast } from 'react-hot-toast';


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
      if (authUser.session) {
        localStorage.setItem("session", JSON.stringify(authUser));
        setUser(authUser.user)
        toast.success("Usuário logado com sucesso!")
        navigate("/");
      } else {
        setEmail('')
        setPassword('')
        setLoading(false)
        toast.error('Não foi possível fazer login, verifique suas credenciais!')
      }
    } catch (error) {
      console.log('Não foi possível fazer login, verifique suas credenciais!');
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form onSubmit={handleLogin} className="w-4/5 sm:w-2/5 md:w-8/12 lg:w-3/5 xl:w-2/5 max-w-[600px] p-8 rounded-2xl mx-auto bg-white flex-colo gap-6">
        <img
          src="/images/logo_cedejom.svg"
          alt="logo"
          className="w-48 h-22 object-contain"
        />
        <div className="flex flex-col gap-4 w-full ">
          <Input
            label="Email"
            type="email"
            value={email}
            required={true}
            color={true}
            placeholder={"admin@gmail.com"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="">
            <div className="h-full relative">
              <Input
                label="Senha"
                type={showPassword ? "text" : "password"}
                value={password}
                color={true}
                required={true}
                placeholder={"senha"}
                autoComplete={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                aria-label={
                  showPassword ? "Senha visível" : "Senha Invisível"
                }
                className="text-black dark:text-white my-auto absolute top-[50%] right-4"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? (
                  <HiEye className="text-subMain select-none cursor-pointer size-6 my-auto" />
                ) : (
                  <HiEyeSlash className="text-subMain select-none cursor-pointer size-6 my-auto" />
                )}
              </button>
            </div>
          </div>
        </div>
        <Button
          label="Entrar"
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
