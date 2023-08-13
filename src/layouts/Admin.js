import React, { useContext, useRef, useEffect } from 'react';
import { useLocation, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import routes from 'routes.js';
import { AuthContext } from 'auth/AuthContext.js';

const Admin = (props) => {
  const mainContent = useRef(null);
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext); // Use the isLoggedIn state from AuthContext

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={isLoggedIn ? routes : routes.filter((route) => !route.protected)} // Show all routes if logged in, otherwise filter protected routes
        logo={{
          innerLink: '/admin/index',
          imgSrc: require('../assets/img/brand/pantau.png'),
          imgAlt: '...',
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;