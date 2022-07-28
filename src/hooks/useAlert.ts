import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function useAlert() {
  const MySwal = withReactContent(Swal);

  function fire(errors: string | string[]) {
    MySwal.fire({
      title: "Ocorreu um erro no cadastro",
      html: Array.isArray(errors)
        ? errors.map<string>((error) => error).join("</br>")
        : errors,
      showCancelButton: true,
      cancelButtonText: "OK",
      showConfirmButton: false,
      icon: "error",
    });
  }

  function toast(
    message = "Sucesso",
    showConfirmButton = false,
    time = 1750,
    position: SweetAlertPosition = "bottom-end",
    icon: SweetAlertIcon = "success"
  ) {
    MySwal.fire({
      showConfirmButton: showConfirmButton,
      toast: true,
      position: position,
      icon: icon,
      background: "#a5dc86",
      color: "white",
      iconColor: "white",
      html: message,
      timer: time,
    });
  }

  function success(title: string) {
    MySwal.fire({
      title,
      icon: "success",
      showConfirmButton: false,
    });
  }

  return { fire, toast, success };
}
