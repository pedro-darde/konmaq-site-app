import {TextFields} from "@mui/icons-material";
import {
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Switch,
    TextField,
} from "@mui/material";
import {useState} from "react";
import {PaymentType, PaymentTypeKeys} from "../../interfaces/PaymentType";

type FormPaymentTypeProps = {
    handleSubmit(paymentType: PaymentType): void;
};

export default function FormPaymentType({
                                            handleSubmit,
                                        }: FormPaymentTypeProps) {
    const [paymentType, setPaymentType] = useState<PaymentType>({
        active: true,
        description: "",
        id: undefined,
    });

    const handleChangeState = (key: PaymentTypeKeys, value: any) => {
        setPaymentType((current) => {
            let newPaymentType = Object.assign({}, current);
            newPaymentType[key] = value;
            return newPaymentType;
        });
    };

    return (
        <div style={{padding: 16, margin: "auto", maxWidth: 800}}>
            <form onSubmit={(event) => {
                event.preventDefault()
                handleSubmit(paymentType)
            }}>
                <Grid container spacing={2} alignItems="flex-start">
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            color="success"
                            variant="standard"
                            required
                            value={paymentType.description}
                            label="Descrição"
                            onChange={(e) => {
                                handleChangeState("description", e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl
                            variant="standard"
                            sx={{m: 1, width: "100%", margin: 0}}
                        >
                            <FormControlLabel
                                control={
                                    <Switch
                                        color={"error"}
                                        value={paymentType.active}
                                        checked={paymentType.active as boolean}
                                        onChange={(event) => {
                                            console.log(event.target.checked);
                                            handleChangeState("active", event.target.checked);
                                        }}
                                    />
                                }
                                label="Ativo"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2} alignSelf={"center"}>
                        <Button type={"submit"} color="error" variant="contained">
                            Cadastrar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
