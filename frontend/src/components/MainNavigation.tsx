import { NavLink } from "react-router-dom";
import { IconButton, Nav, Navbar, Tag } from "rsuite";
import {useAuth} from "../hooks/Auth"
import OffRoundIcon from "@rsuite/icons/OffRound";

function MainNavigation() {
  const { user } = useAuth();
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };
  return (
    <Navbar>
      <Nav>
        {user ? (
          <Nav.Item as={NavLink} to="#">
            <IconButton
              size="sm"
              onClick={handleLogout}
              appearance="primary"
              icon={<OffRoundIcon />}
              className="text-red-600"
            >
              Logout
            </IconButton>
          </Nav.Item>
        ) : (
          <Nav.Item as={NavLink} to="/login">
            <Tag className="text-red-600">Not Logged In</Tag>
          </Nav.Item>
        )}
      </Nav>
      <Nav pullRight>
        {user && (
          <Nav.Item className="text-green-600">
            <p>Olá {user?.email}</p>
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  );
}

export default MainNavigation;
