import React, {Component} from 'react';
import Navbar from './Navbar/Navbar';
import './Header.css';

class Header extends Component {
    render() {
        return(
            <header>
                <Navbar />
            </header>
        );
    }
}

export default Header;