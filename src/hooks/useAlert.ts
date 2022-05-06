import Swal, { SweetAlertPosition } from "sweetalert2";
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
    position: SweetAlertPosition = "bottom-end"
  ) {
    MySwal.fire({
      showConfirmButton: showConfirmButton,
      toast: true,
      position: position,
      icon: "success",
      background: '#a5dc86',
      color: 'white',
      iconColor: 'white',
      html: message,
      timer: time,
    });
  }

  return { fire, toast };
}
