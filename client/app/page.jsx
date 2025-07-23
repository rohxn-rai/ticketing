import { buildClient } from "@/helpers/build-client";

const HomePage = async () => {
  const client = await buildClient();

  const { data } = await client.get("/api/users/currentuser");
  const { currentUser } = data;

  return (
    <div className="container flex mx-auto pt-24 pb-12">
      <div className="max-w-2xl w-full mx-auto">
        {currentUser !== null && (
          <div>
            <p>{currentUser.id}</p>
            <p>{currentUser.email}</p>
            <p>{currentUser.iat}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
