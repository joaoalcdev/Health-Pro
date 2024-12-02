// icons - imports
import { HiEllipsisVertical } from "react-icons/hi2";

const EventHistoryShimmer = () => {
  return (
    <>
      <div className="is-loading py-2">
        <div className="content">
          <div className="flex w-full justify-center items-center bg-greyed hover:bg-gray-200 rounded-lg p-4 group transitions is-loading hover:select-none" >
            <div className="w-full flex justify-center items-center is-loading">
              {/* N */}
              <span className="flex flex-col justify-center items-center is-loading">
                <h4 className='flex justify-center items-center text-center bg-subMain size-9 group-hover:bg-opacity-85 text-transparent rounded-lg is-loading'>1</h4>
              </span>
              {/* Paciente / Nome */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full justify-items-center">
                {/* Serviço / Profissional */}
                <div className="flex text-center flex-col justify-start items-center sm:items-start">
                  <h2 className='flex text-sm text-transparent mb-1'>LoremIpsum</h2>
                  <h2 className='flex text-xs text-transparent'>Lorem Ipsum</h2>
                </div>
                {/* Tipo de evento */}
                <div className="flex text-center flex-col justify-center items-center sm:items-start">
                  <h2 className='flex text-sm text-transparent'>LOREMIPSUMLOREM IPSUMLO</h2>
                </div>
                {/* Data */}
                <div className="flex text-center flex-col justify-center items-center sm:items-start content">
                  <h2 className='flex text-sm text-transparent is-loading'>__/__/___</h2>
                </div>
              </div>
              {/* Function */}
              <div className="flex flex-col justify-center items-center">
                <button className="flex size-9 justify-center items-center rounded-lg content">
                  <h2><HiEllipsisVertical className="text-2xl text-transparent content" /></h2>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventHistoryShimmer