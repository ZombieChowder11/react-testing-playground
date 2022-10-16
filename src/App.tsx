import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './common/hooks';
import PersonCard from './components/PersonCard';
import { fetchPeople, selectPeople } from './store/slices/peopleSlice';

import './App.scss';


function App() {
  const dispatch = useAppDispatch();
  const people = useAppSelector(selectPeople);
  const PeopleReducer = useAppSelector((state: any) => state.PeopleReducer);

  useEffect(()=>{
   dispatch(fetchPeople())
   console.log(people)
  },[])



  if(people){
    return (
      <div className="App">
        <div className="card-wrapper">
          {people.map((person:any)=>{
            return <PersonCard {...person} />
          })}
        </div>
   
      </div>
    );
  }else{
    return <div>Loading...</div>
  }

}

export default App;
