import Header from "@/components/common/Header";
import AuthHomePage from "@/components/home/AuthHomePage";
import NoAuthHomePage from "@/components/home/NoAuthHomePage";
import { getCurrentUser } from "@/utils/getCurrentUser";

const HomePage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header />
      <div className="container flex mx-auto pt-24 pb-12">
        {currentUser ? <AuthHomePage /> : <NoAuthHomePage />}
      </div>
    </>
  );
};

export default HomePage;
