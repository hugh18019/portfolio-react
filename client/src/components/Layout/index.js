import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import moment from 'moment';

import Footer from '../Footer'

import cpu from '../../public/images/cpu2.svg';
import clock from '../../public/images/clock.svg';


class Layout extends Component {

  constructor() {
      super();

      this.state = { time: 0 };
      this.timer;
  }  

  componentDidMount () {
      this.timer = setInterval(() => this.setState({ time: moment().format("h:mm:ss a")}), 100);
  }

  componentWillUnmount () {
      clearTimeout(this.timer);
  }

  render () {

    const { children } = this.props;
    const { time } = this.state;

    return (
        <div className='layout'>
            <header>
                <nav className="nav">
                    <div className='name-tag'> <Image src={clock} alt="clock"/>  {`${time}`}</div>
                    <div className="nav-content-container">
                    <div id="navbar-content">
                        <ul>
                        <li className='nav-item'>
                            <Image src={cpu} alt="cpu" />
                            <Link href="/Hobbies" passHref>
                                <a className="link">Hobbies</a>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Image src={cpu} alt="cpu" />
                            <Link href="/Works" passHref>
                                <a className="link">Works</a>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Image src={cpu} alt="cpu" />
                            <Link href="/Messages/messages" passHref>
                                <a className="link">Message</a>
                            </Link>
                        </li>
                        </ul>
                    </div>     
                    </div>
                </nav>
            </header>
            {children}
            <Footer />
        </div>
    )
  }
}

export default Layout;