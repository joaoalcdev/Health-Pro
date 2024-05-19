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
  return (
    <div className="w-full">
      <h1 className="text-sm font-medium mb-6">Patients</h1>
      <div className="w-full overflow-x-scroll">
        <PatientsTable
          data={memberData}
          functions={{
            preview: preview,
          }}
          used={false}
        />
      </div>
    </div>
  );
}

export default PatientsUsed;
