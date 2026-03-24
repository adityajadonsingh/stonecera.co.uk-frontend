export const getClientInfo = async () => {
  try {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();

    return {
      ip: data.ip,
      country: data.country_code, // "IN", "US", "GB"
    };
  } catch (err) {
    console.error("Failed to fetch client info", err);
    return null;
  }
};