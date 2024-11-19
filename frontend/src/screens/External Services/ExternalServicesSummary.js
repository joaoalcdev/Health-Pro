import { set } from 'react-hook-form';
import { Button } from '../../components/Form';
import { ExternalServicesTable } from '../../components/Tables';


export default function ExternalServicesSummary({ data, setIsDrawerOpen, setDrawerData, setIsEdit, status }) {

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className='flex justify-between items-center'>

          <h1 className="text-md font-medium ">Empresas Parceiras</h1>
          <div>
            <Button
              onClick={setIsDrawerOpen}
              className="bg-subMain text-white rounded-lg "
            >
              Registrar Serviço
            </Button>

          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ExternalServicesTable data={data} setDrawerData={setDrawerData} setIsEdit={setIsEdit} status={status} />

        </div>
      </div>
    </>
  )
}