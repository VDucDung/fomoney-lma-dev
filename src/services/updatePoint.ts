export const updatePoint = async (
  accessToken: string | null,
  score: number,
  season: string,
) => {
  const url = "/api/update-point";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const body = JSON.stringify({
    point: score,
    season: season,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: body,
  });
  return response;
};
