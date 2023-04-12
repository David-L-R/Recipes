const resetPassword = async ({ password, confirmPassword, token }) => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/reset-password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  console.log("data", data);

  return data;
};

const forgotPassword = async (email) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

const register = async (user) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const data = await response.json();

  if (response.status !== 201) {
    throw new Error(data.message);
  }

  return data;
};

const login = async (user) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

const authService = { register, login, forgotPassword, resetPassword };

export default authService;
