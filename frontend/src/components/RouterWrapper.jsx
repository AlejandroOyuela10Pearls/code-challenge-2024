import PageLoading from "./common/PageLoading";
import Header from "./common/Header";
import SideBar from "./common/SideBar";

const RouterWrapper = ({ globalLoading, children }) => {
  return globalLoading ? (
    <div className="flex justify-center h-[100vh] items-center">
      <PageLoading fixed />
    </div>
  ) : (
    <div className="flex flex-col items-center h-[100vh] w-full">
      <Header />
      <div className="flex w-full h-full">
        <SideBar />
        {children}
      </div>
    </div>
  );
};
export default RouterWrapper;
