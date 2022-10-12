import initialPeopleState from '../states/peopleStates';
import { DELETE_PERSON, GET_PEOPLE_SUCCESS } from '../types';

const PeopleReducer = (state:any = initialPeopleState, action:any):object => {
  switch(action.type){
    case GET_PEOPLE_SUCCESS:
      return {...state, people: action.people}
    case DELETE_PERSON:
      return  {...state, people:state.people?.filter((a:any)=>a.id !== action.id)}
    default:
      return state;
  }
}

export default PeopleReducer;