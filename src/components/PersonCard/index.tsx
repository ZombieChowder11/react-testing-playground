import React from 'react';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { deletePerson } from '../../store/actions/peopleActions';
import './PersonCard.scss';

interface IPersonCardProps{
  id:number;
  name:string,
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
}


const PersonCard = (props:IPersonCardProps) =>{
   const {id, name, email, address, phone, website, company} = props;
  
   const dispatch = useAppDispatch();

   const deleteCard=()=>dispatch(deletePerson(id));

  return(
      <div className="card">
        <div>Name: {name}</div>
        <div>Email: {email}</div>
        <div>Phone: <b>{phone}</b></div>
        <div>Web: {website}</div>
        <button className="delete-button" onClick={deleteCard}>DELETE</button>
      </div>

  )
}

export default PersonCard;