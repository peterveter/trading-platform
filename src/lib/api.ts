import { QueryClient } from "@tanstack/react-query";
import ky, { Options } from "ky";

export const queryClient = new QueryClient();

export async function dispatchRequest<TData>(
  endpoint: string,
  options?: Options
) {
  const response = await ky(`http://13.41.72.245/${endpoint}`, {
    // timeout: 1, // Uncomment this line to simulate an error.
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  // Artifical delay.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: await response.json<TData>(),
    headers: response.headers,
  };
}
