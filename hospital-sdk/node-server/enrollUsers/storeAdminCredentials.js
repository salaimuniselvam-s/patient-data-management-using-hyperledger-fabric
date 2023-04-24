const { BASE_URL } = require("../utils/utils");

const storeAdminCredentials = async (records) => {
  const url = `${BASE_URL}/storeAdminCredentials`;
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(records),
  };

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    console.log("Updated Succesfully");
  } catch (error) {
    console.error("Record Update Failed Please Try Again");
  }
};

module.exports = storeAdminCredentials;
