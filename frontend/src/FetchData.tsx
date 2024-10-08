interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

import { useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //const localUrl = "http://localhost:8080/api/user";
  const apiUrl = "https://cd48c9e8-e4fc-4728-ae3d-eeb050886734-dev.e1-eu-north-azure.choreoapis.dev/crm-app/backend/v1.0/api/user";

  //const correctUrl = localUrl ? localUrl : apiUrl;

  console.log("here is the url being used for the frontend; "+ apiUrl);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json: User[] = await response.json();
        console.log("Fetched data:", json);
        setData(json);
      } catch (error: unknown) {
        console.error("Fetch error:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Contact Management System</h1>
      <div>
        {data.map((user) => (
          <div
            key={user.id}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <h2>
              {user.name} ({user.username})
            </h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>
              Website:{" "}
              <a
                href={`http://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
            </p>
            <p>
              Address: {user.address.street}, {user.address.suite},{" "}
              {user.address.city}, {user.address.zipcode}
            </p>
            <p>Company: {user.company.name}</p>
            <p>Catch Phrase: {user.company.catchPhrase}</p>
            <p>BS: {user.company.bs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchData;
