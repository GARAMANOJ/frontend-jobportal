export async function login(email: string, password: string) {
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  const res = await fetch("http://127.0.0.1:8000/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json(); // access_token
}




// export function getToken() {
//   return localStorage.getItem("token");
// }

// export function isLoggedIn() {
//   return localStorage.getItem("token") !== null;
// }

// export function logout() {
//   localStorage.removeItem("token");
//   window.location.href = "/login"; // Redirect to login after logout
// }
