import {Container} from "@mui/material";
import {useRouter} from "next/router";
import BaseComponent from "../../../components/BaseComponent";
import FormPaymentType from "../../../components/payment-type/FormPaymentType";
import TitleComponent from "../../../components/TitleComponent";
import {PaymentType} from "../../../interfaces/PaymentType";
import useAlert from "../../../hooks/useAlert";
import {baseService} from "../../../services/api";
import {useState} from "react";
import FetchLoadingComponent from "../../../components/loaders/FetchLoadingComponent";

export default function Create() {
    const alert = useAlert();
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = (paymentType: PaymentType) => {
        setLoading(true)
        baseService.post<{ paymentType: PaymentType }, any>('payment-type', {paymentType}).then(res => {
            setLoading(false)
            alert.toast('Forma de pagamento criada com sucesso.');
        }).catch(err => {
            setLoading(false)
        })
    };
    return (
        <BaseComponent title="Adicionar forma de pagamento">
            <Container maxWidth="xl">
                <TitleComponent title="Criar forma de pagamento"/>
                <FormPaymentType handleSubmit={handleSubmit}/>
            </Container>
            <FetchLoadingComponent isLoading={loading}/>
        </BaseComponent>
    );
}
