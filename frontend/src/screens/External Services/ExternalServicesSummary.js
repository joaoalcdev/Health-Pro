import { Button, OutLinedButton } from '../../components/Form';
import { ExternalServicesTable } from '../../components/Tables';
import { MdOutlineCloudDownload } from 'react-icons/md';


export default function ExternalServicesSummary({ data, setIsDrawerOpen, setDrawerData, status, remove, handleExport }) {

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className='flex justify-between items-center'>

          <h1 className="text-md font-medium ">Serviços Externos</h1>
          <div className='grid grid-cols-2 gap-2'>
            <OutLinedButton
              onClick={() => handleExport()}
              type={"button"}
              disabled={data.length > 0 ? false : true}
              className="text-subMain rounded-lg"
              label='Exportar'
              Icon={MdOutlineCloudDownload}
            >
            </OutLinedButton>
            <Button
              onClick={setIsDrawerOpen}
              className="bg-subMain text-white rounded-lg"
            >
              Registrar Serviço
            </Button>

          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ExternalServicesTable data={data} setDrawerData={setDrawerData} status={status} remove={remove} />
        </div>
      </div >
    </>
  )
}