// import { useContext, useEffect, useState } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, Button, theme, Avatar } from "antd";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// import { AuthContext } from "../../context/AuthContext";
// import { EXPIRE_DATE, ROLE, TOKEN } from "../../const";

// const { Header, Sider, Content } = Layout;

// const AdminLayout = () => {
//   const navigate = useNavigate();
//   const { setIsAuthenticated, setRole } = useContext(AuthContext);
//   const [collapsed, setCollapsed] = useState(false);

//   const [key, setKey] = useState(location.pathname);

//   useEffect(() => {
//     setKey(location.pathname);
//   }, []);

//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   const logout = () => {
//     setIsAuthenticated(false);
//     setRole(null);
//     Cookies.remove(TOKEN);
//     Cookies.remove(ROLE);
//     Cookies.remove(EXPIRE_DATE);
//     navigate("/");
//   };

//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="demo-logo-vertical">Logo</div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[key]}
//           onClick={({ key }) => {
//             setKey(key);
//           }}
//           items={[
//             {
//               key: "/dashboard",
//               icon: <UserOutlined />,
//               label: <Link to="/dashboard">Dashboard</Link>,
//             },
//             {
//               key: "/categories",
//               icon: <VideoCameraOutlined />,
//               label: <Link to="/categories">Categories</Link>,
//             },
//             {
//               key: "/users",
//               icon: <UploadOutlined />,
//               label: <Link to="/users">Users</Link>,
//             },
//             {
//               icon: <UploadOutlined />,
//               label: (
//                 <Button onClick={logout} type="primary" danger>
//                   Logout
//                 </Button>
//               ),
//             },
//           ]}
//         />
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//             }}
//           />
//           <Link to="/admin-account">
//             <Avatar shape="square" size={32} icon={<UserOutlined />} />
//           </Link>
//         </Header>
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//           }}
//         >
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
// export default AdminLayout;


import  { useState } from "react";
import {
  PieChartOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  SnippetsOutlined,
  CalendarOutlined,
  // FileSyncOutlined
  
} from "@ant-design/icons";
import {  Breadcrumb, Layout, Menu, theme } from "antd";
const {  Content, Footer, Sider } = Layout;

// import logo from "../../assets/images/news (1).png";
// import Search from "antd/es/input/Search";
import DashboardPage from "../../pages/admin/DashboardPage";
import Account from "../shared/Account";
import UsersPage from "../../pages/admin/userPage/UsersPage";
// import AllPosts from "../../pages/admin/AllPosts";
// import CategoriesPage from "../../pages/admin/CategoriesPage";
// import DashboardPage from "../../pages/admin/DashboardPage";
// import Account from "../../pages/admin/Account";
// import UsersPage from "../../pages/admin/usersPage/UsersPage";
// import PostsPage from "../../pages/admin/PostsPage";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1", <PieChartOutlined size={50} />),
  getItem("Account", "2", <UserOutlined />),
  getItem("Users", "3", <UsergroupAddOutlined />),
  getItem("Category", "4", <SnippetsOutlined />),
  getItem("Posts", "5", <CalendarOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="demo-logo-vertical"
          style={{
            display: "flex",
            justifyContent: "start",
            gap: "5px",
            alignItems: "center",
            background: "orange",
            marginBottom: "10px",
          }}
        ></div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={items}
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
        />
      </Sider>
      <Layout>
    
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
  
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 550,
              background: colorBgContainer,
            }}
          >
            {selectedKey === "1" && <DashboardPage/>}
            {selectedKey === "2" && <Account/>}
            {selectedKey === "3" && <UsersPage/>}
         
            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Blog-websayt 
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;

