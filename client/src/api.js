export const nasaApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://your-production-server.com/api"
    : "https://api.nasa.gov/mars-photos/api/v1";

export async function getRovers() {
  try {
    const res = await fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=IcMyvWEjFYsHCcTDcdyjuBfQclCAWxLklTIa5BHe"
    );
    console.log(res);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.rovers;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
