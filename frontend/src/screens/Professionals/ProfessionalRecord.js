import { useState, useEffect } from 'react';
import { Button } from '../../components/Form';
import { BiExport } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { MdFilterList } from 'react-icons/md';
import { getProfessionalRecords, getProfessionalRecordsExport } from '../../api/ProfessionalsAPI';
import { MonthlyPicker } from '../../components/Form';
import { formatDate, formatDateTime } from '../../utils/formatDate';

function ProfessionalRecord({ data }) {
  const today = new Date();

  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const [monthRange, setMonthRange] = useState(new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0));

  const [records, setRecords] = useState([]);

  const fetch = async () => {
    setLoading(true);
    // fetch data
    const response = await getProfessionalRecords(data.id, `01-${monthRange.getMonth() + 1}-${monthRange.getFullYear()}`);
    if (response.status === 400) {
      toast.error('Nenhum registro encontrado');
      setLoading(false);
      return;
    }
    if (response.status === 200) {
      setRecords(response.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, [monthRange]);

  const exportFrequency = async () => {
    setExportLoading(true);
    const res = await getProfessionalRecordsExport(data.id, `01-${monthRange.getMonth() + 1}-${monthRange.getFullYear()}`, data.fullName);
    if (res.status !== 200) {
      toast.error('Erro ao exportar frequência');
      setExportLoading(false);
      return;
    }
    if (res.status === 200) {
      toast.success('Frequência exportada com sucesso');
      setExportLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-md font-medium sm:block hidden">
          Histórico/Frequência
        </h1>
        <div className="grid grid-cols-4 gap-4 items-center">
          {/* date */}
          <MonthlyPicker
            value={monthRange}
            startDate={monthRange}
            endDate={monthRange}
            Icon={MdFilterList}
            bg="bg-dry"
            onChange={(update) => setMonthRange(update)}
          />
          <div className='col-start-4'>
            <Button
              label="Exportar"
              Icon={BiExport}
              disabled={records.length > 0 ? false : true}
              onClick={() => {
                exportFrequency();
              }}
              loading={exportLoading}
            />
          </div>
        </div>
        {loading ?
          <div className="flex items-center justify-center w-full h-1/2">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-subMain"></div>
          </div>
          :
          records.length === 0 ?
            <div className="flex items-center justify-center w-full h-1/2">
              <p className="text-md font-medium">Nenhum registro encontrado</p>
            </div>
            :
            records.map((data) => (
              <div key={data.eventInstanceId} className='grid grid-cols-1 bg-dry rounded-xl border-[1px] border-border p-4 gap-2'>
                <div
                  className=" grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-12 md:col-span-3 flex flex-col gap-2">
                    <p className="text-md text-black font-medium">{formatDate(data.startTime)}</p>
                    <p className="text-md text-black font-medium">{formatDateTime(data.startTime)}</p>
                  </div>
                  <div className="col-span-12 md:col-span-7 flex flex-col gap-2">
                    <p className="text-md text-subMain font-semibold">{data.serviceName}</p>
                    <p className="text-md text-black ">{data.patientFullName} </p>
                  </div>
                  <div className="col-span-12 md:col-span-2 flex flex-col gap-2">
                    <p className="text-md text-subMain font-semibold">{data.agreementName}</p>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className='flex flex-col gap-1'>
                      {data.agAuthCode && <p className="text-xs text-black font-light">Cod. Autorização: {data.agAuthCode}</p>}
                      {data.agAuthDate && <p className="text-xs text-black font-light">Data Autorização: {formatDate(data.agAuthDate)}</p>}
                      {data.agPreCode && <p className="text-xs text-black font-light">Pré Senha: {data.agPreCode}</p>}
                      {data.agPreCodeDate && <p className="text-xs text-black font-light">Data Pré Senha: {formatDate(data.agPreCodeDate)}</p>}

                    </div>
                    <div className="flex flex-col gap-2">
                      <img src={data.checkInSignature} alt="assinatura" className=" rounded-lg object-cover bg-white border border-dashed border-subMain" />
                      <p className="text-xs  text-gray-500 font-medium italic">{data.checkInName} - {formatDate(data.checkInDate)} às {formatDateTime(data.checkInDate)} </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default ProfessionalRecord;
