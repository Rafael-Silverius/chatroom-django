import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { getCurrentUser } from "../api/auth,js";

function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(setCurrentUser)
      .catch(() => setCurrentUser(null));
  }, []);

  if (!currentUser) return <p>Loading user...</p>;

  return <Layout currentUser={currentUser} />;
}
export default Home;
