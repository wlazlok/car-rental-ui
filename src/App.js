import Layout from "./components/layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import PricesPage from "./pages/PricesPage";
import AbourPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/prices">
          <PricesPage />
        </Route>
        <Route path="/about">
          <AbourPage />
        </Route>
        <Route path="/gallery">
          <GalleryPage />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
