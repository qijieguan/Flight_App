import '../styles/search-results.css';

import { IoMdAirplane } from 'react-icons/io';

const SearchResults = () => {
    return (
        <div className="search-results grid">
            <div className="flight flex">
                <div className="flight-time grid">
                    <span>15:30</span>
                    <span className='flight-time-segment flex'>
                        <span>&#9632;</span>
                        <hr/>
                        <span>&#9632;</span>
                        <IoMdAirplane className='airplane-icon'/>
                        <div className='flight-time-duration'>01h 30m</div>
                    </span>
                    <span>17:00</span>
                </div>
                <div className='flight-points flex'>
                    <span>LAX</span>
                    <span>JFK</span>
                </div>
                <div className='flight-divider'/>
                <div className='flight-airline flex'>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAflBMVEX/7AD/7AQAAAD/7gD/8AD/9QD/8gD66wBnZQD/9wD/+gDz5QDBuAC4sADn2gDt4QDUyQDOxQDc0QB3dABAQACJhQBuawCtpgAIEAAxMwBNTQBycACPigAaGQAYGwClngBfXgAgHgAICQATEgCBfQBWVAAmKACXkQCemAAiJADgESufAAABtklEQVRIie2U23KjMAyGqSTLYMAGAyFJk4bmRPv+L7gyhy3tTGZ3crU7w38T2fiTZPGT6OVJRS/RU1rBFVzBFXwkpRTOMStFUURE+GcQN5tYTyS1mzgjzvM2xW8gouT6nX6I0ANs1bROdgAlIQDQEkSF1ntLHCEHpSlLqJ1zsiBUtmCJUUmqvRm6HUHUrzDooBwc9/mblDoxN8dzXsCl4hg6B+97Pl8ALpfDweIEKumjOm2EzDKYlZsawH8AtPJ7ygGuxfTAz61S2PFalWXmeoBjQboD6JTsJhLEcdvaqwDI73IujXAGwxSCdrE3N6nKyFIgtgC1keayhNlIT57SkGrxOjApmtt9YEOVlNBUAB8tQCNH6yQMQfaZytDHlwHQNX1vjZEuQapAr7UwoKvxylceL7NX3IfxLcDQwbl6PUuVr9lk5hPAHeRqYhg+CcIyXRjX83DKejhb50Zm0Mh14OZVur3vTHffyuwjrj7fMqIhrV0YgBJtrdOKVHgDibMSiinEqTy5dXQqs9Y/vIpB4wxoCB/Zd37y3eTou/iqHrt+oR9fh7THf8X9c/8AK7iCK/i/gE/qF836FjJ9IZXQAAAAAElFTkSuQmCC" alt=""/>
                    <span className='flight-name'>Spirit Airline</span>
                    <span className='flight-price'>$314</span>
                </div>
            </div>
            <div className="flight flex">
                <div className="flight-time grid">
                    <span>15:30</span>
                    <span className='flight-time-segment flex'>
                        <span>&#9632;</span>
                        <hr/>
                        <span>&#9632;</span>
                        <IoMdAirplane className='airplane-icon'/>
                        <div className='flight-time-duration'>01h 30m</div>
                    </span>
                    <span>17:00</span>
                </div>
                <div className='flight-points flex'>
                    <span>LAX</span>
                    <span>JFK</span>
                </div>
                <div className='flight-divider'/>
                <div className='flight-airline flex'>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAflBMVEX/7AD/7AQAAAD/7gD/8AD/9QD/8gD66wBnZQD/9wD/+gDz5QDBuAC4sADn2gDt4QDUyQDOxQDc0QB3dABAQACJhQBuawCtpgAIEAAxMwBNTQBycACPigAaGQAYGwClngBfXgAgHgAICQATEgCBfQBWVAAmKACXkQCemAAiJADgESufAAABtklEQVRIie2U23KjMAyGqSTLYMAGAyFJk4bmRPv+L7gyhy3tTGZ3crU7w38T2fiTZPGT6OVJRS/RU1rBFVzBFXwkpRTOMStFUURE+GcQN5tYTyS1mzgjzvM2xW8gouT6nX6I0ANs1bROdgAlIQDQEkSF1ntLHCEHpSlLqJ1zsiBUtmCJUUmqvRm6HUHUrzDooBwc9/mblDoxN8dzXsCl4hg6B+97Pl8ALpfDweIEKumjOm2EzDKYlZsawH8AtPJ7ygGuxfTAz61S2PFalWXmeoBjQboD6JTsJhLEcdvaqwDI73IujXAGwxSCdrE3N6nKyFIgtgC1keayhNlIT57SkGrxOjApmtt9YEOVlNBUAB8tQCNH6yQMQfaZytDHlwHQNX1vjZEuQapAr7UwoKvxylceL7NX3IfxLcDQwbl6PUuVr9lk5hPAHeRqYhg+CcIyXRjX83DKejhb50Zm0Mh14OZVur3vTHffyuwjrj7fMqIhrV0YgBJtrdOKVHgDibMSiinEqTy5dXQqs9Y/vIpB4wxoCB/Zd37y3eTou/iqHrt+oR9fh7THf8X9c/8AK7iCK/i/gE/qF836FjJ9IZXQAAAAAElFTkSuQmCC" alt=""/>
                    <span className='flight-name'>Spirit Airline</span>
                    <span className='flight-price'>$314</span>
                </div>
            </div>
            <div className="flight flex">
                <div className="flight-time grid">
                    <span>15:30</span>
                    <span className='flight-time-segment flex'>
                        <span>&#9632;</span>
                        <hr/>
                        <span>&#9632;</span>
                        <IoMdAirplane className='airplane-icon'/>
                        <div className='flight-time-duration'>01h 30m</div>
                    </span>
                    <span>17:00</span>
                </div>
                <div className='flight-points flex'>
                    <span>LAX</span>
                    <span>JFK</span>
                </div>
                <div className='flight-divider'/>
                <div className='flight-airline flex'>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAflBMVEX/7AD/7AQAAAD/7gD/8AD/9QD/8gD66wBnZQD/9wD/+gDz5QDBuAC4sADn2gDt4QDUyQDOxQDc0QB3dABAQACJhQBuawCtpgAIEAAxMwBNTQBycACPigAaGQAYGwClngBfXgAgHgAICQATEgCBfQBWVAAmKACXkQCemAAiJADgESufAAABtklEQVRIie2U23KjMAyGqSTLYMAGAyFJk4bmRPv+L7gyhy3tTGZ3crU7w38T2fiTZPGT6OVJRS/RU1rBFVzBFXwkpRTOMStFUURE+GcQN5tYTyS1mzgjzvM2xW8gouT6nX6I0ANs1bROdgAlIQDQEkSF1ntLHCEHpSlLqJ1zsiBUtmCJUUmqvRm6HUHUrzDooBwc9/mblDoxN8dzXsCl4hg6B+97Pl8ALpfDweIEKumjOm2EzDKYlZsawH8AtPJ7ygGuxfTAz61S2PFalWXmeoBjQboD6JTsJhLEcdvaqwDI73IujXAGwxSCdrE3N6nKyFIgtgC1keayhNlIT57SkGrxOjApmtt9YEOVlNBUAB8tQCNH6yQMQfaZytDHlwHQNX1vjZEuQapAr7UwoKvxylceL7NX3IfxLcDQwbl6PUuVr9lk5hPAHeRqYhg+CcIyXRjX83DKejhb50Zm0Mh14OZVur3vTHffyuwjrj7fMqIhrV0YgBJtrdOKVHgDibMSiinEqTy5dXQqs9Y/vIpB4wxoCB/Zd37y3eTou/iqHrt+oR9fh7THf8X9c/8AK7iCK/i/gE/qF836FjJ9IZXQAAAAAElFTkSuQmCC" alt=""/>
                    <span className='flight-name'>Spirit Airline</span>
                    <span className='flight-price'>$314</span>
                </div>
            </div>
        </div>
    )
}

export default SearchResults