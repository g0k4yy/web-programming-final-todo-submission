import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        sessionStorage.removeItem('credentials');
        navigate('/login');
        // Force a re-render to update the Navbar
        window.location.reload();
    };

    const isLoggedIn = () => {
        return sessionStorage.getItem('credentials') ? true : false;
    };

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Todo App</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/todo/">Todos</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/contact/">Contact</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/map/">Map</NavLink>
                    </NavItem>
                    {!isLoggedIn() ? (
                        <>
                            <NavItem>
                                <NavLink href="/login/">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/register/">Register</NavLink>
                            </NavItem>
                        </>
                    ) : (
                        <>
                            <NavItem>
                                <NavLink href="/add-todo/">Add Todo</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</NavLink>
                            </NavItem>
                        </>
                    )}
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavbarComponent;