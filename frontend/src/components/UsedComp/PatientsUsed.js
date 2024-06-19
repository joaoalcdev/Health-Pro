import React from 'react';
import { PatientsTable } from '../Tables';
import { useNavigate } from 'react-router-dom';
import { memberData } from '../Datas';

function PatientsUsed() {
  const navigate = useNavigate();
  // preview
  const preview = (id) => {
    navigate(`/patients/preview/${id}`);
  };
  const edit = (id) => {
    //navigate(`/patients/edit/${id}`);
  };
  return (
    <div className="w-full">
      <h1 className="text-sm font-medium mb-6">Pacientes</h1>
      <div className="w-full ">
        Mostrar lista de pacientes ativos
      </div>
    </div>
  );
}

export default PatientsUsed;
