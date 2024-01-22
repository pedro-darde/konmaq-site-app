import Head from "next/head";
import { useEffect } from "react";
import { useWithAuthAdmin } from "../hooks/withAuth";
import Login from "../pages/login";
import Unauthorized from "./unauthorized";
type BaseComponentProps = {
  title: string;
  children: React.ReactNode;
  shouldValidatePermission?: boolean;
};
export default function BaseComponent({ title, children }: BaseComponentProps) {
  return (
    <div>
      <Head>
        <title> {title}</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}
