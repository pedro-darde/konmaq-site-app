import Image from "next/image";
import { ProductFiles } from "../../interfaces/Product";
import BlurImage from "../../../public/blur.jpg";
import { useState } from "react";
import Lottie from "lottie-react";
import loadAnimation from "../../lotties/128-around-the-world.json";
type ProductImageListShowProps = {
  files: ProductFiles[];
};

export default function ProductImageListShow({
  files,
}: ProductImageListShowProps) {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div>
      <Image
        placeholder="blur"
        blurDataURL={"blur.jpg"}
        onLoad={() => setLoading(false)}
        src={files[0].path}
        layout="responsive"
        width={200}
        height={194}
        alt="Imagem do produto"
      />
      {loading && (
        <Lottie
          animationData={loadAnimation}
          width={200}
          height={194}
          loop={true}
        />
      )}
    </div>
  );
}
