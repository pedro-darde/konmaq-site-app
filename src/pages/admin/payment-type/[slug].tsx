import { Container } from "@mui/material";
import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import useSWR from "swr";
import AdminAuth from "../../../components/adminAuth";
import BaseComponent from "../../../components/BaseComponent";
import FormPaymentTypeEdit from "../../../components/payment-type/FormPaymentTypeEdit";
import TitleComponent from "../../../components/TitleComponent";
import useAlert from "../../../hooks/useAlert";
import { PaymentType } from "../../../interfaces/PaymentType";
import { baseService } from "../../../services/api";
import { KONMAQ_TOKEN_KEY, storage } from "../../../services/konmaq_storage";

type PaymentTypeInformationProps = {
  id: string;
};

export default function PaymentTypeInformation({
  id,
}: PaymentTypeInformationProps) {
  const alert = useAlert();
  const handleSubmit = (paymentType: PaymentType) => {
    delete paymentType["id"];
    baseService
      .patch("payment-type", paymentType.id?.toString()!, {
        paymentType,
      })
      .then((res) => {
        alert.toast("Forma de pagamento editada com sucesso.");
      })
      .catch((err) => {});
  };

  return (
    <BaseComponent title="Editar forma de pagamento">
      <Container maxWidth={"xl"}>
        <TitleComponent title="Editar forma de pagamento" />
        <FormPaymentTypeEdit paymentTypeId={id} handleSubmit={handleSubmit} />
      </Container>
    </BaseComponent>
  );
}

export async function getServerSideProps({ query }: any) {
  if (typeof window !== "undefined") {
    const { role } = jwtDecode<{ role: string; id: number }>(
      storage.get(KONMAQ_TOKEN_KEY, false)
    );

    if (role !== "admin") {
      return {
        redirect: {
          permanent: false,
          destination: "/unauthorized",
        },
      };
    }
  }

  return {
    props: {
      id: query.slug,
    },
  };
}
