const register = async (user) => {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const newUser = await response.json();

  console.log(newUser);

  if (response.status !== 201) {
    throw new Error(newUser.message);
  }

  return newUser;
};

const authService = { register };

export default authService;
