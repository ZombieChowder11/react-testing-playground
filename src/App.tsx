import React, { useEffect } from 'react';
import { getPeople } from './store/actions/peopleActions';
import { useAppDispatch, useAppSelector } from './common/hooks';
import PersonCard from './components/PersonCard';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const PeopleReducer = useAppSelector((state: any) => state.PeopleReducer);
  
  useEffect(()=>{
    dispatch(getPeople());  
  },[])

  const people = PeopleReducer?.people;

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
