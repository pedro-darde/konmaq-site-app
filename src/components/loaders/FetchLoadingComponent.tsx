import Lottie from "lottie-react";
import jsonLoading from "../../lotties/128-around-the-world.json";
type FetchLoadingComponentProps = {
  isLoading: boolean;
};
import { Dialog } from "@mui/material";
export default function FetchLoadingComponent({
  isLoading,
}: FetchLoadingComponentProps) {
  return (
    <Dialog
      open={isLoading}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Lottie
        width={300}
        height={300}
        animationData={jsonLoading}
        loop={true}
      />
    </Dialog>
  );
}
