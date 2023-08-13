import React, { useContext, useEffect, useState } from 'react'; // Add the useContext import
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap';
import { AuthContext } from 'auth/AuthContext';

const AdminNavbar = (props) => {
  const { isLoggedIn, userName, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/auth/login'); // Replace '/login' with the appropriate URL
  };
  

  const [userData, setUserData] = useState([]);
  const userProfile = userData.find(user => user.username === userName);
  const profileImage = userProfile ? userProfile.pfp : '';

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching bank data:', error);
      });
  }, []);

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        {isLoggedIn ? (
          <Container fluid>
            <Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to="/">
              {props.brandText}
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      {/* <img
                        alt="..."
                        src={require('../../assets/img/theme/Maybank.jpg')}
                      /> */}
                      {/* {userData.find((user) => user.username === { userName }) && (
                        <img
                          alt="..."
                          src={require('{userData.find((user) => user.username === {userName}).pfp}')}
                        />
                      )} */}
                      {userProfile && (
                        <img
                          alt="..."
                          src={profileImage}
                        />
                      )}

                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">{userName}</span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem onClick={handleLogout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>) : null}
      </Navbar>
    </>
  );
};

export default AdminNavbar;
