import { AnimatePresence } from "framer-motion";
import "../styles/globals.css";
import "../styles/normalize.min.css";
export default function MyApp({ Component, pageProps }) {

  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />;
    </AnimatePresence>
  );
}
