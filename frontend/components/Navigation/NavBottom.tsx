import {
    Button,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from 'hooks/auth';

export const NavBarBottom = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const router = useRouter();
    const quizID = router.query.id;
    return (
        <Navbar
            bg="light"
            variant="light"
            expand="md"
            fixed="bottom"
            style={{ height: '2.5rem' }}>
            <Nav.Link
                className="justify-content-center mx-auto position-relative"
                style={{ bottom: '2.75rem' }}>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: '150px' }}
                    onClick={() => {
                        router.push(`/host/gameplay`);
                    }}>
                    START
                </button>
            </Nav.Link>
        </Navbar>
    );
};

export default NavBarBottom;
