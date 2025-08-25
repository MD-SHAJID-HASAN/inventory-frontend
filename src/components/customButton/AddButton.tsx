import { Home, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface IProps {
  btnText: string;
  handleClick?: () => void;
  href: string;
}

const AddButton: React.FC<IProps> = ({ btnText, href }) => {
  return (
    <Link
      to={`${href}`}
      className="flex items-center md:space-x-2 py-2 px-4 my-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-a cursor-pointer"
    >
      {btnText.length <= 1 ? <Home className="w-4 h-4"></Home> : <Plus className="w-4 h-4"></Plus>}
      <span className="text-sm font-medium md:flex hidden">{btnText}</span>
    </Link>
  );
};
export default AddButton;
