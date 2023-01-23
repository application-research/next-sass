import * as Server from '@common/server';

import fs from 'fs';
import FormData from 'form-data';

// NOTE(jim)
// You must use node-fetch with NodeJS 18+ to solve this problem
// You cannot use native fetch.
import fetch from 'node-fetch';

const key = `YOUR_API_KEY`;

const path = `${__dirname}/../../../../your-test-file.json`;

// NOTE(jim):
// An example of handling multipart uploads after reading a file from path.
export async function handler(req, res) {
  await Server.cors(req, res);

  const stream = fs.createReadStream(path);
  const form = new FormData();
  form.append('data', stream);
  const headers = form.getHeaders();
  try {
    // NOTE(jim): We're using Estuary as a Test.
    const apiRes = await fetch(`https://upload.estuary.tech/content/add`, {
      method: 'POST',
      body: form,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${key}`,
        ...headers,
      },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: true });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
