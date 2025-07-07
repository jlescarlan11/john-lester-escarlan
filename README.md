This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Access Control

This application includes admin access control that restricts access to only authorized email addresses.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google OAuth (required for authentication)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Admin Access Control (optional - defaults to jlescarlan11@gmail.com)
ADMIN_EMAIL=jlescarlan11@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=jlescarlan11@gmail.com
```

### How it works

1. **Server-side protection**: The NextAuth configuration includes a `signIn` callback that checks if the user's email matches the `ADMIN_EMAIL` environment variable
2. **Client-side protection**: The admin signin page checks authentication status and shows appropriate error messages
3. **Route protection**: The `AuthCheck` component verifies both authentication and email authorization on every admin page load

### Access Flow

- **Unauthorized users**: Will see an error message and be redirected to sign out
- **Authorized users**: Will be automatically redirected to the admin panel after successful authentication
- **Default admin email**: `jlescarlan11@gmail.com` (can be changed via environment variables)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
