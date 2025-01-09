/* eslint-disable no-console */

// Function to submit the score
export const submitScore = async (
  accessToken: string | null,
  score: number,
  season: string,
) => {
  // const accessToken = useUserStore.getState().accessToken;

  const url = "/api/update-point";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const body = JSON.stringify({
    point: score,
    season: season,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (response.ok) {
      const data = await response.json();
      // alert('You have successfully submit your game!')
      console.log("Score submitted successfully:", data);
      return response.status;
    } else {
      // alert('Submit failed')

      console.error("Error submitting score:", response.statusText);
    }
  } catch (error) {
    // alert('Submit failed')

    console.error("Request failed", error);
  }

  return;
};
