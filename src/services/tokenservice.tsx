// import axios from "axios";

// const USERNAME = "decoderit";
// const PASSWORD = "40939dad-17e2-4428-8161-5101f635f4c1";
// const TOKEN_URL = "https://dcorpbasics.greythr.com/uas/v1/oauth2/client-token";

// export const fetchClientToken = async (): Promise<string | null> => {
//   const basicAuth = btoa(`${USERNAME}:${PASSWORD}`);

//   try {
//     const response = await axios.post(TOKEN_URL, null, {
//       headers: {
//         Authorization: `Basic ${basicAuth}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });

//     return response.data.access_token || null;
//   } catch (error) {
//     console.error("Failed to fetch token:", error);
//     return null;
//   }
// };

import axios from "axios";

const TOKEN_URL = "https://dcorpbasics.greythr.com/uas/v1/oauth2/client-token";

export const fetchClientToken = async (
  employeeId: string,
  password: string
): Promise<string | null> => {
  const basicAuth = btoa(`${employeeId}:${password}`);

  try {
    const response = await axios.post(TOKEN_URL, null, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token || null;
  } catch (error) {
    console.error("Failed to fetch token:", error);
    return null;
  }
};
