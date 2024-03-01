import path from 'path';

import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import formBuilder from '@payloadcms/plugin-form-builder';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';

import { Pages } from './collections/Pages';
import Users from './collections/Users';

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    autoLogin: {
      email: 'dev@dev.com',
      password: 'dev',
    },
  },
  editor: slateEditor({}),
  collections: [Users, Pages],
  cors: ['http://localhost:3000', process.env.PAYLOAD_PUBLIC_SITE_URL],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  plugins: [
    payloadCloud(),
    formBuilder({
      fields: {
        payments: false,
      },
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
