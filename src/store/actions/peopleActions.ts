import peopleService from "../services/peopleService";
import { DELETE_PERSON, GET_PEOPLE_SUCCESS } from "../types";

const PeopleService = new peopleService;


export const getPeopleSuccess = (people: object) => ({type: GET_PEOPLE_SUCCESS, people});
export const getPeople = () => (dispatch:any) => {
    PeopleService.getPeople()
    .then((response: any) => dispatch(getPeopleSuccess(response.data)))
    .catch((error: Error) => {
      console.log(error)
    });
};


export const deletePerson = (id:number) => {
  return {
    type: DELETE_PERSON,
    id
  }
}