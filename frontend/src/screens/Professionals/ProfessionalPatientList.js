import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../../api/PatientsAPI';
import { PatientsOfProfessionalTable } from '../../components/Tables/PatientsOfProfessionalTable';
import { BiLoaderCircle } from 'react-icons/bi';

function ProfessionalPatientList({ professional }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchPatients = async () => {
    setLoading(true)
    const response = await getPatients('false', professional.id)
    if (response.status !== 200) {
      setLoading(false)
      return
    }
    if (response.status === 200) {
      setData(response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [professional])

  const preview = (id) => {
    navigate(`/patients/preview/${id}`);
  };

  return (
    <div className="flex flex-col gap-6">


      <h1 className="text-md font-medium">Pacientes</h1>
      <div className="w-full ">
        {loading ?
          <div className="flex w-full  top-20 justify-center items-center">
            <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
          </div>
          :
          data.length === 0 ?
            <div className="flex items-center justify-center w-full h-1/2">
              <p className="text-md font-medium">Nenhum registro encontrado</p>
            </div>
            :
            <PatientsOfProfessionalTable
              patientData={data}
              functions={{
                preview: preview,
              }}
            />
        }
      </div>
    </div>
  );
}

export default ProfessionalPatientList;
