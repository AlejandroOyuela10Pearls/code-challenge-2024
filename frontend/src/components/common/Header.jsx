import Icon from "./Icon";

const Header = () => {
  return (
    <div className="flex justify-between w-full p-[1rem] bg-primary text-white">
      <div className="flex flex-col items-start">
        <p className="text-2xl font-bold">Device Tracking System</p>
        <p className="text-xl">10Pearls</p>
      </div>
      <div className="flex justify-center items-center px-[1rem]">
        <Icon icon="fa-solid fa-circle-user" size="2xl" />
      </div>
    </div>
  );
};

export default Header;
