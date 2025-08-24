import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface IProps {
  btnText: string;
  handleClick?: () => void;
  href: string;
}

const BackButton: React.FC<IProps> = ({ btnText, href }) => {
  return (
    <Link
      to={`${href}`}
      className="flex items-center space-x-2 py-2 px-4 my-3 bg-gradient-to-r to-blue-500 from-purple-600 text-white rounded-xl hover:shadow-lg transition-a cursor-pointer"
    >
      <Plus className="w-4 h-4"></Plus>
      <span className="text-sm font-medium">{btnText}</span>
    </Link>
  );
};
export default BackButton;
