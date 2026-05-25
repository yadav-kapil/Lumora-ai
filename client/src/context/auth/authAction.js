export const verifyUser = async (dispatch) => {
  try {
    // REFRESH TOKEN
    const refreshRes = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/api/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    const refreshData = await refreshRes.json();

    if (!refreshRes.ok || !refreshData.success) {
      dispatch({
        type: "LOGOUT",
      });

      return;
    }

    // GET USER
    const userRes = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/api/auth/me`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${refreshData.accessToken}`,
        },
      },
    );

    const userData = await userRes.json();

    if (!userRes.ok || !userData.success) {
      dispatch({
        type: "LOGOUT",
      });

      return;
    }

    dispatch({
      type: "LOGIN",

      payload: {
        user: userData.user,

        accessToken: refreshData.accessToken,
      },
    });
  } catch (err) {
    dispatch({
      type: "LOGOUT",
    });
  }
};
