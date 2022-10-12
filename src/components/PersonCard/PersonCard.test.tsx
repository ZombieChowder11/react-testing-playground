import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen } from '@testing-library/react'
import axios from "axios";
import reducer from '../../store/reducers/peopleReducer';
import { mockData } from '../../mocks/peopleMock';
import  * as actions from '../../store/actions/peopleActions';
import PersonCard from '.';
import { renderWithProviders } from '../../store/mockedStoreWrapper';
import { render } from "@testing-library/react";

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';


// We use msw to intercept the network request during the test,
// and return the response after 150ms
// when receiving a get request to the `/users` endpoint
export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(ctx.json(mockData), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())


describe('Testing the person card', () => {


  it("should fetch data", async () => {
    const {data}  = await axios.get('https://jsonplaceholder.typicode.com/users');
    expect(data).toEqual(mockData);
  });


  it("meaningful test name", async () => {
    const props ={
      id:0,
      name:"",
      email:"", 
      address:{
        street: '',
        city: '',
        suite: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      phone:"",
      website:"",
      company:{
        name: '',
        catchPhrase: '',
        bs: ''
      }
    }
    renderWithProviders(<PersonCard {...props} />)

    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
  });

  it('should successfully delete a person', () => {
    const mockData = {
      people: [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
              lat: '-37.3159',
              lng: '81.1496',
            },
          },
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
          },
        },
      ],
    };

    expect(reducer(mockData, actions.deletePerson(1))).toEqual({ people: [] });
  });

  it('should test the initial reducer state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });


});