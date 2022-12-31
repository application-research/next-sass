const REQUEST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getHeaders = () => {
  return { ...REQUEST_HEADERS, Authorization: `Bearer -` };
};

export async function placeholder() {
  const response = await fetch('/api', {
    method: 'GET',
    headers: getHeaders(),
  });

  const json = await response.json();
  return json;
}
