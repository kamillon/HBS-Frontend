import React, { useContext } from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {


    return (
        <div className='errorPage container'>

                <div className="text-center row">
                    <div className=" col-md-6">
                        <img src="https://stories.freepiklabs.com/storage/42123/oops-404-error-with-a-broken-robot-cuate-6558.png" alt=""
                            className="img-fluid" />
                    </div>
                    <div className=" col-md-6 mt-5 mb-5">
                        <p className="fs-3"> <span className="text-danger">Opps!</span> Nie znaleziono strony!</p>
                        <p className="lead">
                            Strona której szukasz, nie została znaleziona. Sprawdź czy wprowadziłeś poprawy adres.
                        </p>
                        <Link to='/'><button className="btn btn-primary">POWRÓT DO STRONY GŁÓWNEJ</button></Link>
                    </div>

                </div>
 
        </div>
    )
};

export default ErrorPage;