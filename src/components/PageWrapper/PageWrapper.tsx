import { useNavigate } from "react-router-dom";
import AddButton from "../customButton/AddButton";
import { ChevronDown } from "lucide-react";

interface IPageProps {
  pageTitle: string;
  btnText: string;
  href: string;
  // clickHandler: () => void;
  children?: React.ReactNode;
}

function PageWrapper({
  pageTitle,
  btnText,
  href,
  // clickHandler,
  children,
}: IPageProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex justify-between">
        <button
          onClick={handleBackClick}
          className="flex items-center md:space-x-2 py-2 px-4 my-3 bg-gradient-to-r to-blue-500 from-purple-600 text-white rounded-xl hover:shadow-lg transition-all cursor-pointer"
        >
          <ChevronDown className="w-4 h-4 rotate-90"></ChevronDown>
          <span className="text-sm font-medium md:flex hidden">Go Back</span>
        </button>
        <h2 className="dark:text-white md:text-2xl font-black text-center">
          {pageTitle}
        </h2>
        <AddButton
          href={`${btnText.length <= 1 ? "/" : href}`}
          btnText={`${btnText.length <= 2 ? "Home" : btnText}`}
        ></AddButton>
      </div>

      {children}
    </div>
  );
}

export default PageWrapper;
