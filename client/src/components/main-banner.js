import '../styles/main-banner.css';
import { MdOutlineCellTower } from 'react-icons/md';
import { PiMountainsFill } from 'react-icons/pi';

import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const MainBanner = () => {

    const banner_url = "https://images.pexels.com/photos/3660892/pexels-photo-3660892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const profile_url = "https://images.pexels.com/photos/321159/pexels-photo-321159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    const location = useLocation();

    useEffect(() => {
        scrollHeaderAnimation();
    }, [location]);

    window.addEventListener('resize', () => {
        scrollHeaderAnimation();
    });

    const scrollHeaderAnimation = () => {
        let main_banner = document.querySelector('.main-banner');
        let main_banner_wrapper_overlay = document.querySelector('.main-banner-overlay-wrapper');
        let main_banner_links = document.querySelector('.main-banner-links');

        let height_delta = main_banner.clientHeight - main_banner_wrapper_overlay.clientHeight;
        let lastKnownScrollPosition = 0;
    
        setTimeout(() => {
            window.addEventListener('scroll', () => {
                lastKnownScrollPosition = window.scrollY;

                if (main_banner.clientWidth <= 800) { 
                    height_delta = main_banner.clientHeight - main_banner_links.clientHeight;
                }

                if (lastKnownScrollPosition <= height_delta) {
                    main_banner.style.transform = 'translateY(-' + lastKnownScrollPosition + "px)";
                }
            });
        }, 500);
    }

    const handleNav = () => {
        let main_banner = document.querySelector('.main-banner');
        let height = main_banner.clientHeight;
        let factor = 0.6;
        
        if (main_banner.clientWidth <= 800) { factor = 0.75; }
        if (main_banner.clientWidth <= 400) { factor = 0.33; }

        window.scrollTo({top: height * factor, behavior: 'smooth'})
    }

    return (
        <header className='main-banner'>
            <img src={banner_url} alt=""/>
            <div className='main-banner-overlay flex'>
                <div className='main-banner-overlay-wrapper flex'>
                    <h1>
                        <span>Hello! </span>
                        <span>Plan your trip today!</span>
                    </h1>
                    <img src={profile_url} alt=""/>
                    <div className='main-banner-links flex'>
                        <Link to='/'>
                            <div className='main-banner-link flex' onClick={() => {handleNav(); }}>
                                <span>Realtime Flights</span>
                                <MdOutlineCellTower className='icon'/>
                            </div>
                        </Link>

                        <Link to='/tour-places'>
                            <div className='main-banner-link flex'>
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

export default MainBanner;