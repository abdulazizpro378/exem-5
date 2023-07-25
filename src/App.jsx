import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FrontLayout from "./components/layout/FrontLayout";
import AdminLayout from "./components/layout/AdminLayout";

import HomeP from "./pages/user/HomeP";
import AboutP from "./pages/user/AboutP";
import LoginP from "./pages/user/LoginP";
import RegisterP from "./pages/user/RegisterP";
import PostsP from "./pages/user/PostsP";
import PostP from "./pages/user/PostP";
import MyPostsP from "./pages/user/MyPostsP";
import AccountP from "./pages/user/AccountP";
import NotFoundP from "./pages/NotFoundP";
import DashboardP from "./pages/admin/DashboardP";
import UsersP from "./pages/admin/UsersP";
import AllPosts from "./pages/admin/AllPosts";
import CategoriesP from "./pages/admin/CategoriesP";

import { AuthContext } from "./context/AuthContext";

function App() {
  let { isAuthenticated } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<HomeP />} />
          <Route path="about" element={<AboutP />} />
          <Route path="login" element={<LoginP />} />
          <Route path="register" element={<RegisterP />} />
          <Route path="posts" element={<PostsP />} />
          <Route path="posts/:id" element={<PostP />} />
          {isAuthenticated && (
            <Fragment>
              <Route path="my-posts" element={<MyPostsP />} />
              <Route path="accountp" element={<AccountP />} />
            </Fragment>
          )}
        </Route>
        {isAuthenticated && (
          <Fragment>
            <Route path="/" element={<AdminLayout />}>
              <Route path="account" element={<DashboardP />} />
              <Route path="users" element={<UsersP />} />
              <Route path="categories/:id" element={<CategoriesP />} />
              <Route path="all-posts" element={<AllPosts />} />
            </Route>
          </Fragment>
        )}
        <Route path="*" element={<NotFoundP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// accound dashboard😎