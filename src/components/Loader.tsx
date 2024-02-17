import { IconContext } from "react-icons";
import { BiLoaderAlt } from "react-icons/bi";

export const Loader = (props: { className?: string }) => {
  return (
    <div
      className={`animate-spin-slow flex items-center justify-center ${
        props.className || ""
      }`}
    >
      <IconContext.Provider value={{ size: "1.2em" }}>
        <BiLoaderAlt />
      </IconContext.Provider>
    </div>
  );
};
