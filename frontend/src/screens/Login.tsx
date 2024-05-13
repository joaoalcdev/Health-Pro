import React, { useEffect, useState } from "react";
import { Button, Input } from "../components/Form";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { supabaseClient } from "../config/supabase-client";
import { Session } from "@supabase/supabase-js";
import { userSignIn } from "../api/signInAPI";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      // write here
      setSession(session);
    });
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      const userAuth = await userSignIn({ email, password });
      if (userAuth) {
        console.log(userAuth);
        navigate("/home");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form className="w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo">
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
            color={true}
            placeholder={"admin@gmail.com"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setEmail(e.target.value)}
            name={undefined}
            autoComplete={undefined}
            register={undefined}
            required={undefined}
            maxLength={undefined}
            disabled={undefined}
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            color={true}
            placeholder={"senha"}
            autoComplete={password}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setPassword(e.target.value)}
            name={undefined}
            register={undefined}
            required={undefined}
            maxLength={undefined}
            disabled={undefined}
          />
        </div>
        <Button
          label="Login"
          Icon={BiLogInCircle}
          type="button"
          onClick={handleLogin}
          loading={loading}
        />
      </form>
    </div>
  );
}

export default Login;
