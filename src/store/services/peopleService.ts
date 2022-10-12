import proxie from '../proxie';

export default class peopleServices {

  getPeople():Promise<Object>{
    return proxie.get('/users');
  }
} 