import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Mensaje(props) {
  toast(props);
}
