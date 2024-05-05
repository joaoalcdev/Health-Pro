import React, { useEffect } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';
import Layout from '../Layout';
import { Button } from '../components/Form';
import { UsersTable } from '../components/Tables';
import AddUserModal from '../components/Modals/AddUserModal';
import ViewUserModal from '../components/Modals/ViewUserModal';
import { getUsers } from '../api/UsersAPI';
import { receptionsData } from '../components/Datas';
import { FaKaaba } from 'react-icons/fa';

function Users() {
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(false);
  const [status, setStatus] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState();

  const fetch = async () => {
    const response = await getUsers()
    setData(response)
    setStatus(false)
  }

  useEffect(() => {
    fetch()
  }, [status])

  const onCloseModal = () => {
    setIsOpen(false);
    setIsViewOpen(false);
    setIsAdd(false)
    //setData({});
  };

  const preview = (data) => {
    setIsViewOpen(true);
    setUser(data)
  };

  const onStatus = () => {
    setStatus(true)
  }

  return (
    <Layout>
      {
        //view user modal
        isViewOpen && (
          <ViewUserModal
            closeModal={onCloseModal}
            isViewOpen={isViewOpen}
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
            datas={data}
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
      <h1 className="text-xl font-semibold">Usuários</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* datas */}

        <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 items-center gap-6">
            <input
              type="text"
              placeholder='Search "Amina Mwakio"'
              className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
            />
          </div>

          {/* export */}
          <Button
            label="Export"
            Icon={MdOutlineCloudDownload}
            onClick={() => {
              toast.error('Exporting is not available yet');
            }}
          />
        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <UsersTable
            doctor={false}
            data={data}
            functions={{
              preview: preview,
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Users;


