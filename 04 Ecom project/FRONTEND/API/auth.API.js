let BASE_URL = "http://localhost:8000/api/v1/auth";

async function commonApiCall(auth, data) {
  const response = await fetch(`${BASE_URL}/${auth}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
}

async function registerAuth(data) {
  // API get("http://hello.com?data=jhuh")
  return await commonApiCall("register", data);
}

async function loginAuth(data) {
  return await commonApiCall("login", data);
}

function logout() {}

export { registerAuth, loginAuth, logout };
