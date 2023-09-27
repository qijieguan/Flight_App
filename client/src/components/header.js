import '../styles/header.css';
import { MdOutlineCellTower } from 'react-icons/md';
import { PiMountainsFill } from 'react-icons/pi';

import { Link } from 'react-router-dom';

const Header = () => {

    const banner_url = "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const profile_url = "https://images.pexels.com/photos/321159/pexels-photo-321159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    const handleNav = () => {
        let main_banner = document.querySelector('.main-header-banner');
        let height = main_banner.clientHeight;
        let factor = 0.6;
        
        if (main_banner.clientWidth <= 800) { factor = 0.75; }
        if (main_banner.clientWidth <= 400) { factor = 0.33; }

        window.scrollTo({top: height * factor, behavior: 'smooth'})
    }

    return (
        <header className='main-header-banner'>
            <img src={banner_url} alt=""/>
            <div className='main-header-overlay flex'>
                <div className='main-header-overlay-wrapper flex'>
                    <h1>
                        <span>Hello! </span>
                        <span>Plan your trip today!</span>
                    </h1>
                    <img src={profile_url} alt=""/>
                    <div className='main-header-banner-links flex'>
                        <Link to='/'>
                            <div className='main-header-banner-link flex' onClick={() => {handleNav(); }}>
                                <span>Realtime Flights</span>
                                <MdOutlineCellTower className='icon'/>
                            </div>
                        </Link>

                        <Link to='/tour-places'>
                            <div className='main-header-banner-link flex'>
                                <span>Tour Locations</span>
                                <PiMountainsFill className='icon' style={{transform: 'translateY(-7.5%)'}}/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>  
        </header>
    )
}

export default Header;