import { useEffect, useState } from "react";
import { getRovers } from "../api";

export default function Rover() {
  const [rovers, setRovers] = useState([]);

  useEffect(() => {
    async function loadRovers() {
      const data = await getRovers();
      setRovers(data);
    }
    loadRovers();
  }, []);

  return (
    <div>
      <h2>Browse Rovers</h2>
      {rovers.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {rovers.map((rover) => (
            <li key={rover.id}>
              {rover.name} — Status: {rover.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
