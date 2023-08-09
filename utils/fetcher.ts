import { headers } from "next/headers";

interface ExtendedRequestInit extends RequestInit {
  cache?: RequestCache;
  next?: {
    revalidate?: number;
  };
}

/**
 * Makes a fetch request to the specified endpoint with the given options.
 * @param endpointName - The name of the endpoint URL.
 * @param endpointOptions - Additional options for the fetch request.
 * @returns An object containing the response data or an error message.
 */
async function fetcher(
  endpointName: string,
  endpointOptions: ExtendedRequestInit = {}
) {
  const defaultHostname = "localhost:3000";
  const defaultProtocol = "http";

  // Get the protocol and hostname from the headers or use default values
  const protocol = headers().get("protocol") || defaultProtocol;
  const hostname = headers().get("host") || defaultHostname;

  const defaultOptions = {
    next: {
      revalidate: 0,
    },
  };

  // Merge the default options with the endpoint options
  const options: ExtendedRequestInit = {
    ...defaultOptions,
    ...endpointOptions,
  };

  // Construct the URL for the fetch request
  const url = `${protocol}://${hostname}/${endpointName}`;

  try {
    // Make the fetch request
    const response = await fetch(url, options);

    if (!response.ok) {
      // Return an error object if the response is not successful
      return {
        data: null,
        error: {
          message: `API responded with error: ${response.statusText}`,
        },
      };
    }

    // Parse the response body as JSON
    const data = await response.json();

    // Return the response data
    return {
      data,
      error: null,
    };
  } catch (err) {
    // Return an error object if an error occurs during the fetch request
    return {
      data: null,
      error: {
        message: `API responded with error: ${JSON.stringify(err) || err}`,
      },
    };
  }
}

export default fetcher;
