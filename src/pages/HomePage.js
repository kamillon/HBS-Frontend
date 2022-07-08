import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
// import { ThingsContext } from "../context/AuthContext"
import { Col } from 'react-bootstrap';


const HomePage = () => {    
    return(
        <div>
        <div className='row'>
          <Col sm={7}>
            <img
              className='img-fluid'
              src={require('https://media.istockphoto.com/videos/colored-smoke-on-a-dark-background-blue-and-red-light-with-smoke-video-id1341408852?b=1&k=20&m=1341408852&s=640x640&h=C6ymXpr_Jn6-WqQmHHuS8z6TGBtkWDQ9x6tFs_hsBjs=')}
              alt='ReactHunt'
            />
          </Col>
          <Col sm={5}>
            <h2>React Hunt </h2>
            <p>
              ReactJS is one of the best JavaScript libraries which is widely known
              for its adjustable and extensible nature. We make the best use of its
              exceptional feature of component reusability. Our experts attain
              outcomes by splitting the interface segments into the smaller
              components. This process of breaking down a web app into several
              independent components consumes lesser efforts and results in highly
              scalable and robust ReactJS application. Moreover, it has broadened
              its scope by creating awesome user interfaces and web applications.
              So, hire ReactJS developer from us and let your dreams of having great
              online presence come true.{' '}
            </p>
          </Col>
        </div>
      </div>
)};

export default HomePage;