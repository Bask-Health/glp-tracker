export const Footer = () => {
  return (
    <div className={"flex justify-center py-3 bg-r-gray-100"}>
      <div className={"font-light flex gap-x-1"}>
        <p className={"!text-white"}>Powered by</p>
        <a
          className={"text-bask-100 font-regular hover:text-bask-200"}
          href={"https://bask.health/"}
        >
          Bask
        </a>
      </div>
    </div>
  );
};
