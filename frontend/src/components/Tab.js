import { on } from "rsuite/esm/DOMHelper";

function Tab({ selectedTab, functions }) {

  const tabs = [{ name: "Ativos" }, { name: "Arquivados" }]
  console.log(selectedTab)



  return (
    <div className="flex sm:w-[50%] xl:w-[30%] md:max-w-xl  rounded shadow">
      <button aria-current="page"
        className={`w-full flex justify-center font-medium rounded-l px-5 py-2 border-t border-b ${selectedTab === 1 ? `bg-subMain text-white border-subMain hover:opacity-80` : ` bg-white text-gray-800  border-gray-200 hover:bg-gray-100`}`}
        onClick={() => functions.onChangeTab(1)}
      >
        Ativos
      </button>

      <button aria-current="page"
        className={`w-full flex items-center gap-x-2 justify-center font-medium rounded-r px-5 py-2 border-t border-b ${selectedTab === 1 ? `bg-white text-gray-800  border-gray-200 hover:bg-gray-100` : `bg-subMain text-white border-subMain hover:opacity-80`}`}
        onClick={() => functions.onChangeTab(2)}
      >
        Arquivados
      </button>
    </div>

  )
};

export default Tab;