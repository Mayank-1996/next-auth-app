import Header from "@/components/Header";
import Provider from "@/context/AppProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}
