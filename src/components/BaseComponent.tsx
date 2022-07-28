import Head from "next/head";
type BaseComponentProps = {
  title: string;
  children: React.ReactNode;
};
export default function BaseComponent({ title, children }: BaseComponentProps) {
  return (
    <div>
      <Head>
        <title> {title}</title>
        <meta name="description"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}
