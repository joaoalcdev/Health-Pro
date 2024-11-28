import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';
import Layout from '../Layout';
import { UsersTable } from '../components/Tables';
import AddUserModal from '../components/Modals/AddUserModal';
import ViewUserModal from '../components/Modals/ViewUserModal';
import ConfirmationModal from '../components/Modals/ConfirmationModal';
import { deleteUser, getUsers } from '../api/UsersAPI';
import { SelectListBox, InputFilterSelect } from '../components/Form';
import { roleOptions } from '../components/Datas';
import { BiChevronDown, BiLoaderCircle } from 'react-icons/bi';
import { recoveryUser } from '../api/UsersAPI';
import Tab from '../components/Tab';

function Users() {

  //data
  const [allData, setAllData] = React.useState([])
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState();

  //controllers
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(false);
  const [status, setStatus] = React.useState(true);
  const [noData, setNoData] = React.useState(false)
  const [noResult, setNoResult] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [tab, setTab] = React.useState(1);

  //filter and search controllers
  const [filterTerm, setFilterTerm] = React.useState({ id: 0, name: "Todos" });
  const [searchTerm, setSearchTerm] = React.useState("");

  const fetch = async () => {
    setLoading(true)
    const response = await getUsers(tab === 1 ? '' : 'true')
    if (response.status !== 200) {
      setNoData(true)
      setNoResult(true)
      setLoading(false)
    }
    if (response.status === 200) {
      setData(response.data)
      setAllData(response.data)
      setLoading(false)
      setStatus(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [status, tab])

  const handleDelete = async () => {
    setLoading(true)
    const response = await deleteUser(user)
    if (response) {
      toast.success('Usuário deletado com sucesso')
      setStatus(true)
      setIsConfirmationOpen(false)
      setLoading(false)
    } else {
      toast.error('Não foi possível deletar o usuário')
    }
  }

  const onChangeTab = (index) => {
    index === 1 ? setTab(1) : setTab(2);
    setFilterTerm({ id: 0, name: "Todos" });
    setSearchTerm("");
  }

  const onCloseModal = () => {
    setIsOpen(false);
    setIsViewOpen(false);
    setIsAdd(false);
    setIsConfirmationOpen(false);
  };

  const removeUser = (user) => {
    setUser(user)
    setIsConfirmationOpen(true)
  };

  const preview = (data) => {
    setIsViewOpen(true);
    setUser(data)
  };

  const restoreUser = async (data) => {
    setLoading(true);
    const response = await recoveryUser(data.id);
    if (response) {
      toast.success('Profissional restaurado com sucesso');
      onStatus(true);
      setLoading(false);
    } else {
      toast.error('Não foi possível restaurar o profissional');
    }

  };

  const onStatus = () => {
    setStatus(true)
  }

  const onEdit = (user) => {
    setUser(user)
    setIsOpen(true)
    setIsViewOpen(false)
    setIsAdd(false)
  }

  //Search and filter
  useEffect(() => {
    setData(allData.filter((item) => {
      //case 1 - no filter and no search
      if (searchTerm === "" && filterTerm.id === 0) {
        setNoResult(false)
        return item
      }
      //case 2 - no filter but has search
      if (filterTerm.id === 0 && (item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || item.lastName.toLowerCase().includes(searchTerm.toLowerCase()))) {
        setNoResult(false)
        return item
      }
      //case 3 - no search but has filter
      if (searchTerm === "" && filterTerm.id === item.roleId) {
        setNoResult(false)
        return item
      }
      //case 4 - has filter and search
      if ((item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || item.lastName.toLowerCase().includes(searchTerm.toLowerCase())) && filterTerm.id === item.roleId) {
        setNoResult(false)
        return item
      }
    })
    )
  }, [searchTerm, filterTerm])

  useEffect(() => {
    if (data.length === 0) {
      setNoResult(true)
      return
    }
    setNoResult(false)
  }, [data])

  return (
    <Layout>
      {
        //confirmation modal
        isConfirmationOpen && (
          <ConfirmationModal
            title={'Desativar Usuário'}
            closeModal={onCloseModal}
            isOpen={isConfirmationOpen}
            loading={loading}
            question={"Você tem certeza que deseja desativar esse usuário?"}
            onConfirm={handleDelete}
          />
        )
      }
      {
        //view user modal
        isViewOpen && (
          <ViewUserModal
            closeModal={onCloseModal}
            isViewOpen={isViewOpen}
            onEdit={onEdit}
            user={user}
          />
        )
      }
      {
        // add user modal
        isOpen && (
          <AddUserModal
            closeModal={onCloseModal}
            isOpen={isOpen}
            doctor={false}
            datas={isAdd ? data : user}
            status={onStatus}
            isAdd={isAdd}
          />
        )
      }
      {/* add button */}
      <button
        onClick={() => {
          setIsOpen(true)
          setIsAdd(true)
        }}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      {/*  */}
      <div className="sm:flex grid grid-cols-1 gap-4 items-center justify-between">
        <h1 className="text-xl font-semibold">Usuários</h1>
        <Tab selectedTab={tab} functions={{
          onChangeTab: onChangeTab
        }}
        />
      </div>
      {/* datas */}
      {loading ?
        <div className="flex absolute items-center justify-center w-full h-1/2">
          <BiLoaderCircle className="animate-spin text-subMain text-2xl" />
        </div>
        :
        <>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-offset="200"
            className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
          >
            <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
              <input
                type="text"
                placeholder='Pesquise por nome...'
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
              />
              <SelectListBox
                label={''}
                color={true}
                selectedPerson={filterTerm}
                setSelectedPerson={setFilterTerm}
                datas={roleOptions.roles}
                iconButton={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
              />
            </div>
            <div className="mt-8 w-full overflow-x-scroll">
              {noResult ?
                <div className="bg-greyed pt-8 pb-8 flex items-center justify-center h-auto">
                  <p className="text-sm text-main">Nenhum usuário encontrado</p>
                </div>
                :
                <UsersTable
                  doctor={true}
                  data={data}
                  noData={noResult}
                  functions={{
                    preview: preview,
                    deleteUser: removeUser,
                    restoreUser: restoreUser,
                  }}
                />
              }
            </div>
          </div>
        </>
      }
    </Layout >
  );
}

export default Users;


