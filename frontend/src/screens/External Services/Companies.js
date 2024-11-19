import { useEffect, useState } from 'react';
import { Button } from '../../components/Form';
import { ExternalCompaniesTable } from '../../components/Tables';
import { getCompanies } from '../../api/ExternalServices';
import { set } from 'react-hook-form';



export default function Companies({ companies, setIsDrawerOpen, setDrawerData, setIsEdit, status }) {

  const [loading, setLoading] = useState(false);

  const editCompany = (data) => {
    setIsEdit(true)
    setDrawerData(data)
    setIsDrawerOpen(true)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className='flex justify-between items-center'>

          <h1 className="text-md font-medium ">Empresas Parceiras</h1>
          <div>
            <Button
              onClick={setIsDrawerOpen}
              className="bg-subMain text-white rounded-lg "
            >
              Adicionar Empresa
            </Button>

          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ExternalCompaniesTable
            data={companies}
            edit={editCompany}
          />
        </div>
      </div>
    </>
  )
}
