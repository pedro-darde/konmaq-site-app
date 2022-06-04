import BaseComponent from "./BaseComponent";
import Lottie from "lottie-react";
import { Container } from "@mui/material";
import lottieUnauthorized from "../lotties/79206-http-401-unauthorized-client-error.json";
import TitleComponent from "./TitleComponent";

export default function Unauthorized() {
  return (
    <BaseComponent title="Não autorizado!">
      <Container maxWidth="xl" sx={{ alignItems: "center" }}>
        <TitleComponent title="Você não tem acesso à esse recurso" />
        <Lottie animationData={lottieUnauthorized} loop={true} />
      </Container>
    </BaseComponent>
  );
}
