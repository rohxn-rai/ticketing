import Header from "@/components/common/Header";

const SignINOUTLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container flex mx-auto pt-24 pb-12">{children}</div>
    </>
  );
};

export default SignINOUTLayout;
