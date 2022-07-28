import { Checkbox, Grid, Paper, Box, IconButton } from "@mui/material";
import { useState } from "react";
import { UserAddress, UserAddressWithId } from "../../interfaces/User";
import { estadoOptions } from "../../fixed/estado-options";
import colors from "../../constants/colors";
import { maskCEP } from "../../utils/masks";
import ModalCreateAddress from "../address/ModalCreateAddress";
import { Add } from "@mui/icons-material";
type AddressStepProps = {
  userAddresses: UserAddressWithId[];
  onCheckAddress: (address_id: number) => void;
  currentAddress: number;
  onCreateAddress: (userAddress: UserAddress) => void;
};
export default function AddressStep({
  userAddresses,
  onCheckAddress,
  currentAddress,
  onCreateAddress,
}: AddressStepProps) {
  const [adressId, setAddressId] = useState<number>(currentAddress);
  const [modalCreate, setModalCreate] = useState<boolean>(false);

  const handleCloseModal = () => setModalCreate(false);
  const handleOpenModal = () => setModalCreate(true);

  const getFullUserAddress = (adr: UserAddressWithId) => {
    return `${adr.street_name} - ${adr.street_number}, ${adr.city_name} - ${
      estadoOptions[adr.country].sigla
    } ${maskCEP(adr.cep)}`;
  };

  const handleCheckAddress = (checked: boolean, addr_id: number) => {
    let id = -1;
    if (checked) {
      id = addr_id;
    }
    setAddressId(id);
    onCheckAddress(id);
  };

  const getAddressSelectedBorderColor = (adress_id: number) => {
    if (adressId === adress_id) return colors.border_selected;

    return "";
  };

  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {userAddresses.map((adr, key) => (
        <Paper
          sx={{
            borderColor: getAddressSelectedBorderColor(adr.id),
            borderWidth: 1,
            m: 1,
          }}
          key={key}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box
              sx={{
                p: 1,
              }}
            >
              <Checkbox
                checked={adressId === adr.id}
                onClick={(evt) => {
                  /** @ts-ignore */
                  handleCheckAddress(evt.target.checked, adr.id);
                }}
              />
            </Box>
            <Box
              sx={{
                p: 1,
                m: 1,
              }}
            >
              <span> {getFullUserAddress(adr)} </span>
            </Box>
            {key === 0 && (
              <Box>
                <IconButton
                  onClick={(e) => {
                    handleOpenModal();
                  }}
                >
                  <Add />
                </IconButton>
              </Box>
            )}
          </Box>
        </Paper>
      ))}
      <ModalCreateAddress
        handleClose={handleCloseModal}
        handleSumbit={onCreateAddress}
        isOpen={modalCreate}
      />
    </Box>
  );
}
