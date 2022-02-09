import { Typography } from "@mui/material";

type TitleProps = {
  title: string;
};

export default function TitleComponent({ title }: TitleProps) {
  return (
    <Typography
      variant="h3"
      gutterBottom
      component="div"
      style={{ textAlign: "center" }}>
      {title}
    </Typography>
  );
}
