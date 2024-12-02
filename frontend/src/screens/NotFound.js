import React from 'react';
import { Button } from '../components/Form';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex-colo bg-dry text-center">
      <img
        src="/images/404.svg"
        alt="404"
        className="w-full max-h-96 object-contain"
      />
      <h1 className="text-4xl font-bold mt-10">Página não encontrada</h1>
      <p className="text-lg text-textGray my-3">
        A página que você está procurando não existe ou você não tem permissão para acessa-la.
      </p>
      <div className="w-48">
        <Button
          label={'Voltar para o início'}
          Icon={null}
          onClick={() => navigate('/')}
        />
      </div>
    </div>
  );
}

export default NotFound;
