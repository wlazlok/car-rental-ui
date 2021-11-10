import Layout from "./components/layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import PricesPage from "./pages/PricesPage";
import AbourPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AboutProductPage from "./pages/AboutProductPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminAddProductPage from "./pages/admin/AdminAddProductPage";
import RegistrationPage from "./pages/RegistrationPage";
import ActivateUserPage from "./pages/ActivateUserPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminEditAccount from "./pages/admin/AdminEditAccount";
import AdminUsersListPage from "./pages/admin/AdminUsersListPage";
import AdminEditUserAccountPage from "./pages/admin/AdminEditUserAccountPage";

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
        <Route path="/register">
          <RegistrationPage />
        </Route>
        <Route path="/products" exact>
          <ProductsPage />
        </Route>
        <Route path="/products/:productId">
          <AboutProductPage />
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
        <Route path="/admin" exact>
          <AdminProductsPage />
        </Route>
        <Route path="/admin/edit/:productId" exact>
          <AdminEditProductPage />
        </Route>
        <Route path="/admin/add">
          <AdminAddProductPage />
        </Route>
        <Route path="/admin/users" exact>
          <AdminUsersListPage />
        </Route>
        <Route path="/admin/user/edit/:userId" exact>
          <AdminEditUserAccountPage />
        </Route>
        <Route path="/admin/account" exact>
          <AdminEditAccount />
        </Route>
        <Route path="/activate/:uuid/:userId" exact>
          <ActivateUserPage />
        </Route>
        <Route path="/reset/password/:uuid/:userId" exact>
          <ResetPasswordPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
