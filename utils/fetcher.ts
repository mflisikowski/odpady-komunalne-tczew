import { headers } from "next/headers";

interface ExtendedRequestInit extends RequestInit {
  cache?: RequestCache;
  next?: {
    revalidate?: number;
  };
}

async function fetcher(
  endpointName: string,
  endpointOptions: ExtendedRequestInit = {}
) {
  const defaultHostname = "localhost:3000";
  const defaultProtocol = "http";

  const protocol = headers().get("protocol") || defaultProtocol;
  const hostname = headers().get("host") || defaultHostname;

  const defaultOptions = {
    next: {
      revalidate: 0,
    },
  };

  const options: ExtendedRequestInit = {
    ...defaultOptions,
    ...endpointOptions,
  };

  const url = `${protocol}://${hostname}/${endpointName}`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: `API responded with error: ${response.statusText}  `,
        },
      };
    }

    const data = await response.json();

    return {
      data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: {
        message: `API responded with error: ${JSON.stringify(err) || err}`,
      },
    };
  }
}

export default fetcher;
