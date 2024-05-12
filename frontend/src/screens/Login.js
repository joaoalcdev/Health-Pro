import React, { useState } from 'react';
import { Button, Input } from '../components/Form';
import { BiLogInCircle } from 'react-icons/bi';


import { userSignIn } from '../api/signInAPI';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();

    const {session, user} = await userSignIn({ email, password })
    console.log(session,user)
  }


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
            placeholder={'admin@gmail.com'}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            color={true}
            placeholder={'*********'}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          label="Login"
          Icon={BiLogInCircle}
          type="submit"
          onClick={handleLogin}
        />
      </form>
    </div>
  );
}

export default Login;
