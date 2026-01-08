import axios from "axios";

export async function uploadToIPFS(data) {
  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    data,
    {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY
      }
    }
  );

  return res.data.IpfsHash;
}
