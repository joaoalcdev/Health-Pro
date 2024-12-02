// component - import
import Sidebar from './Sidebar';
import Header from './Header';

function index({ children, title }) {
  return (
    <>
      <div className="bg-dry xl:h-screen h-calc-layout-pages flex-colo">
        <div className="xl:grid xl:grid-cols-12 w-full max-w-[2000px]">
          <div className="col-span-2 xl:block hidden">
            <Sidebar />
          </div>
          <div className="col-span-10 xl:h-screen xl:overflow-y-scroll relative">
            <Header title={title} />
            <div className="xs:px-8 px-2 pt-24">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;