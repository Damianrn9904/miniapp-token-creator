// frontend/pages/_app.tsx
import { MiniKitProvider } from '@worldcoin/minikit-react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <MiniKitProvider appId={process.env.NEXT_PUBLIC_APP_ID!}>
      <Component {...pageProps} />
    </MiniKitProvider>
  );
}
