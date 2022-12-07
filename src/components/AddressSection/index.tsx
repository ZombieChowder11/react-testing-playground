import React from 'react';
import './AddressSection.scss';

interface IAddressSectionProps {
  street:string,
  city:string,
  suite:string,
  zipcode:string,
  geo:{
    lat:string,
    lng:string
  }
  clicked:boolean;
  toggledCard:()=>void
}

const AddressSection = (props:IAddressSectionProps) => {
  const {street, city, zipcode, clicked, toggledCard} = props;

  return (
    <div className={`address-card-${clicked}`}>
      <div className="content">
        <div>{street}</div>
        <div>{city}</div>
        <div>{zipcode}</div>
        <button className="close-button" onClick={toggledCard}>Close</button>
      </div>
    </div>
  )
}

export default AddressSection;