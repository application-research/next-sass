// NOTE(jim)
// To use file system routing, you must have `page.tsx`.
import { headers } from 'next/headers';

import DefaultMetaTags from '@components/DefaultMetaTags';

async function makeExampleRequest({ host }) {
  try {
    const res = await fetch(`http://${host}/api`);
    return res.json();
  } catch (e) {
    return { text: null, example: null };
  }
}

// NOTE(jim):
// example app/[param]/head.js
// params: { param: value }
export default async function Head({ params }) {
  const currentHeaders = headers();
  const { text } = await makeExampleRequest({ host: currentHeaders.get('host') });

  const title = text;
  const description = 'CHANGEME: description for your application using next-sass';
  const url = 'CHANGEME: your-production-url.tld';

  return (
    <>
      <title>{title}</title>
      <DefaultMetaTags />
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="" />
    </>
  );
}
