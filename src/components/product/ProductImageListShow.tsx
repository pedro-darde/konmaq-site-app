import Image from "next/image";
import { ProductFiles } from "../../interfaces/Product";

type ProductImageListShowProps = {
  files: ProductFiles[];
};

export default function ProductImageListShow({
  files,
}: ProductImageListShowProps) {
  return <Image src={files[0].path} layout="responsive" width={200} height={120} />;
}
