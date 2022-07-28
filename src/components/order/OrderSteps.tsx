import { Button, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useAlert from "../../hooks/useAlert";
import { useAuth, UserFromToken } from "../../hooks/useAuth";
import { PaymentType } from "../../interfaces/PaymentType";
import { UserAddress, UserAddressWithId } from "../../interfaces/User";
import { UserPaymentTypeInfo } from "../../interfaces/UserPaymentTypeInfo";
import { baseService } from "../../services/api";
import AddressStep from "./AddressStep";
import PaymentTypeStep from "./PaymentTypeStep";

type OrderStepsComponentProps = {
  paymentTypes: PaymentType[];
};

type OrderSteps = {
  adress_id: number;
  payment_type_id: number;
};
export default function OrderStepsComponent({
  paymentTypes,
}: OrderStepsComponentProps) {
  const [addressess, setAddresses] = useState<UserAddressWithId[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [mainPaymentType, setMainPaymentType] = useState<UserPaymentTypeInfo>(
    {} as UserPaymentTypeInfo
  );
  const alert = useAlert();

  const [orderSteps, setOrderSteps] = useState<OrderSteps>({
    adress_id: -1,
    payment_type_id: -1,
  });

  const handleChangeOrderSteps = (
    adr_id: number | null,
    payment_type_id: number | null = null
  ) => {
    setOrderSteps((curr) => {
      let newOrder = Object.assign({}, curr);
      if (adr_id) newOrder["adress_id"] = adr_id;
      if (payment_type_id) newOrder["payment_type_id"] = payment_type_id;
      return newOrder;
    });
  };

  const { getToken } = useAuth();

  async function fetchDataInformation(user_id: number) {
    const { data: adresses } = await baseService.get<UserAddressWithId[]>(
      `user-addresses/${user_id}`
    );
    setAddresses(adresses);

    const { data: mainPaymentType } =
      await baseService.get<UserPaymentTypeInfo>(
        `user-payment-type-info/${user_id}`
      );

    setMainPaymentType(mainPaymentType);
  }

  const createAddress = (adr: UserAddress) => {
    const { id } = getToken() as UserFromToken;

    const data = { ...adr, user: id };

    baseService
      .post<any, UserAddress>("user-address", { user_address: data })
      .then((res) => {
        fetchDataInformation(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNext = () => setActiveStep((current) => current + 1);
  const handleBack = () => setActiveStep((current) => current - 1);

  const steps = [
    {
      label: "Informe seu endereço.",
      component: (
        <AddressStep
          onCreateAddress={createAddress}
          currentAddress={orderSteps.adress_id}
          userAddresses={addressess}
          onCheckAddress={(addrId) => {
            handleChangeOrderSteps(addrId);
          }}
        />
      ),
    },
    {
      label: "Escolha a forma de pagamento",
      component: (
        <PaymentTypeStep
          mainPaymentType={mainPaymentType}
          currentPaymentType={orderSteps.payment_type_id}
          paymentTypes={paymentTypes}
          handleSelectPaymentType={(payment_type_id) => {
            handleChangeOrderSteps(null, payment_type_id);
          }}
        />
      ),
    },
    {
      label: "Informações adicionais",
      component: <div> FODASE </div>,
    },
  ];

  useEffect(() => {
    const userInfo = getToken();
    if (typeof userInfo !== "string") {
      fetchDataInformation(userInfo.id);
    }
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{ alignItems: "center", width: "45%" }}
        >
          {steps.map(({ label, component }, key) => {
            return (
              <Step key={key} sx={{ width: "95%" }}>
                <StepLabel> {label}</StepLabel>
                <StepContent>
                  <Box sx={{ mb: 2, mt: 2 }}>{component}</Box>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          justifyContent: "center",
        }}
      >
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Voltar
        </Button>
        {activeStep === steps.length ? (
          <Button
            onClick={() => {
              alert.success("Pedido concluido.");
            }}
          >
            Concluir
          </Button>
        ) : (
          <Button onClick={handleNext}>Próximo</Button>
        )}
      </Box>
    </>
  );
}
