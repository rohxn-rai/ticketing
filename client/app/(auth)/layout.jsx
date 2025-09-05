import Header from "@/components/common/Header";
import { getCurrentUser } from "@/utils/getCurrentUser";

const SignINOUTLayout = async ({ children }) => {
  const currentUser = await getCurrentUser()

  return (
    <>
      <Header currentUser={currentUser} />
      <div className="container flex mx-auto pt-24 pb-12">{children}</div>
    </>
  );
};

export default SignINOUTLayout;
