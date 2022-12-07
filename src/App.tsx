import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './common/hooks';
import PersonCard from './components/PersonCard';
import { fetchPeople, selectPeople } from './store/slices/peopleSlice';

import './App.scss';


function App() {
  const dispatch = useAppDispatch();
  const people = useAppSelector(selectPeople);
  const peopleStatus = useAppSelector(state => state.people.status)

  useEffect(() => {
    if (peopleStatus === 'idle') {
      dispatch(fetchPeople())
    }
  }, [peopleStatus, dispatch])

  if(people){
    return (
      <div className="App">
        <div className="card-wrapper">
          {people.map((person:any, index:number)=>{
            return <PersonCard {...person} index={index + 1}/>
          })}
        </div>
   
      </div>
    );
  }else{
    return <div>Loading...</div>
  }

}

export default App;
