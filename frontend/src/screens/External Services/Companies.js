import { Button } from '../../components/Form';
import { ExternalCompaniesTable } from '../../components/Tables';

export default function Companies({ companies, setIsDrawerOpen, setDrawerData, setIsEdit, status }) {
  const editCompany = (data) => {
    setIsEdit(true)
    setDrawerData(data)
    setIsDrawerOpen(true)
  }

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
