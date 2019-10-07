import React, { useEffect, useRef, useState } from 'react';
import Input from './input';

const card = ({id, name, image, currency, currIndex, handlePayment, handleOverlay}) => {
  
  const [amt, setAmt] = useState(10);
  const [payments, setPayments] = useState([10,20,50,100,500]);

  const refs = useRef([React.createRef(), React.createRef()]);

  const overlayRef = useRef();
  const openOverlayRef = useRef();
  const closeOverlayRef = useRef();

  useEffect(() => {

    const handleOverlayOpen = () => {
      overlayRef.current.style.width = '100%';
      refs.current[0].current.checked = "true";
    }
    const handleOverlayClose = () => overlayRef.current.style.width = '0';

    openOverlayRef.current.addEventListener('click', handleOverlayOpen);
    closeOverlayRef.current.addEventListener('click', handleOverlayClose);

    return () => {
      openOverlayRef.current.removeEventListener('click', handleOverlayOpen);
      closeOverlayRef.current.removeEventListener('click', handleOverlayClose);
    }

  }, [])

  return (
    <div className="col-lg-5 col-md-9 col-sm-11 column">
      <div className="card">
        <div ref={overlayRef} className="overlay">
          <a ref={closeOverlayRef} className="float-right mr-3 mt-3 close-btn">x</a>
          <p className="title text-center">Select the amount to donate</p>
          <div className="btn-group d-flex justify-content-center">
            {
              payments.map((amount, index) => {
                return (
                  <Input 
                   className="inpt"
                   key={index}
                   Id={id}
                   index={index}
                   type="radio"
                   value={amount} 
                   currIndex={currIndex}
                   ref={refs.current[index]}
                   id={currIndex===id ? index : ""} 
                   name="customRadioInline1" 
                   onClick={() => setAmt(amount)}
                  />
                )
              })
            }
          </div>
          <button 
           className="btn btn-sm btn-outline-primary mt-5 d-flex mx-auto"
           disabled={currIndex===id ? false : true}
           onClick={handlePayment.bind(
            this,
            id,
            amt,
            currency
           )}
           >Pay
           </button>
        </div>
        <img className="img-fluid" src={require(`../../public/images/${image}`)} />
        <div className="card-body">
          <h5 className="card-title">{name}<a href="#" className="float-right"></a></h5>
          <button ref={openOverlayRef} className="btn btn-sm btn-outline-primary float-right" onClick={handleOverlay}>Donate</button>
        </div>
      </div>
    </div>
  )
}

export default card;





