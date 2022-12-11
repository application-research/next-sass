// NOTE(jim)
// To use file system routing, you must have `page.tsx`.
import { headers } from 'next/headers';

import '@root/global.scss';

async function makeExampleRequest({ host }) {
  try {
    const res = await fetch(`http://${host}/api`);
    return res.json();
  } catch (e) {
    return { text: null, example: null };
  }
}

import DefaultLayout from '@components/DefaultLayout';

export default async function Page(props) {
  const currentHeaders = headers();
  const data = await makeExampleRequest({ host: currentHeaders.get('host') });

  return <DefaultLayout>{data.example}</DefaultLayout>;
}
