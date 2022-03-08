import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function useAlert() {
  const MySwal = withReactContent(Swal);

  function fire(errors: string | string[]) {
    MySwal.fire({
      title: "Ocorreu um erro no cadastro",
      html: Array.isArray(errors)
        ? errors.map<string>((error) => error + "</br>").toString()
        : errors,
      showCancelButton: true,
      cancelButtonText: "OK",
      showConfirmButton: false,
      icon: 'error'
    });
  }

  return { fire };
}
