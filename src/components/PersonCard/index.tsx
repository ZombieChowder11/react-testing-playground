import React, { useState } from 'react';
import { useAppDispatch } from '../../common/hooks';
import { deletePeople } from '../../store/slices/peopleSlice';
import AddressSection from '../AddressSection';
import './PersonCard.scss';

export interface IPersonCardProps{
  id:number;
  name:string,
  username: string,
  email:string,
  address:{
    street:string,
    city:string,
    suite:string,
    zipcode:string,
    geo:{
      lat:string,
      lng:string
    }
  }
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
  index:number;
}


const PersonCard = (props:IPersonCardProps) =>{
   const {id, name, email, address, phone, website, index} = props;
    
   const dispatch = useAppDispatch();
   const [clicked, setClicked] = useState<boolean>(false);

   const toggledCard = () => {
    if(id === index){
      setClicked(!clicked)
    }
   }
   
   const addressSectionProps = {
     ...address,
     clicked,
     toggledCard
   }

  return(
      <div className="card">
        <div>Name: {name}</div>
        <div>Email: {email}</div>
        <div>Phone: <b>{phone}</b></div>
        <div>Web: {website}</div>
        <button className="delete-button" onClick={()=> dispatch(deletePeople(id))}>DELETE</button>
        <button className="address-button" onClick={toggledCard}>INFO</button>
        <AddressSection {...addressSectionProps} />
      </div>

  )
}

export default PersonCard;