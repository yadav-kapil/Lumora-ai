export const getHistory = async (accessToken) => {
  const response = await fetch("/api/generation/history", {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch history");
  }
  return result.data;
};
