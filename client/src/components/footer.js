import '../styles/footer.css';
import { BsLinkedin } from 'react-icons/bs';
import { PiAirplaneTiltFill, PiPhone } from 'react-icons/pi';
import { AiOutlineMail } from 'react-icons/ai';
import  { ImLocation2 } from 'react-icons/im';

const Footer = () => {
    
    const openLink = () => {
        window.open("https://www.linkedin.com/in/qi-jie-guan-002924201/", '_blank');
    }

    return (
        <div className='footer grid'>
          
            <div className='footer-logo flex'>
                <h1 className='flex'>Sky Nation  <PiAirplaneTiltFill className='icon'/></h1>
                <p>
                    Powered by Tripadvisor API. Get real time flight prices in no time.
                </p>
            </div>
            
            <div className='footer-contact flex'>
                <div className='contact-list flex'>
                    <h1>Contact</h1>

                    <span className='grid'>
                        <AiOutlineMail className='icon'/>
                        <span>qijieguan7@gmail.com</span>
                    </span>

                    <span className='grid'>
                        <PiPhone className='icon'/>
                        <span>(626)-757-2356</span>
                    </span>

                    <span className='grid'>
                        <ImLocation2 className='icon'/>
                        <span>Los Angeles County, CA</span>
                    </span>

                    <span className='grid linkedin' onClick={() => {openLink()}}>
                        <BsLinkedin className='icon'/>
                        <span>https://www.linkedin.com/in/qi-jie-guan-002924201/</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer;