import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen } from '@testing-library/react'

import PersonCard from '.';
import { renderWithProviders } from '../../common/test-utils';
import reducer, { deletePeople } from '../../store/slices/peopleSlice';

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

export const handlers = [
  rest.get('/users', (req, res, ctx) => {
    return res(ctx.json('Leanne Graham'), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

const cardProps = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496"
    }
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets"
  }
}

describe('Person Card', ()=>{
  it('shoud fetch & receives a user after the component renders', async () => {
 
    renderWithProviders(<PersonCard {...cardProps}/>)
  
    expect(screen.getByText(/Name:/i)).toBeInTheDocument()
    expect(screen.getByText(/Email:/i)).toBeInTheDocument()
    expect(screen.getByText(/Phone:/i)).toBeInTheDocument()
  
    expect(await screen.findByText(/Leanne Graham/i)).toBeInTheDocument()
  });

  it('should check if the button is rendered.', () => {
    const { getByText } =  renderWithProviders(<PersonCard {...cardProps}/>);
    const deleteButton = getByText('DELETE');
    expect(deleteButton).toBeTruthy();
  });

  it('should test the DELETE button`s functionality.', () => {
    const people:any = [
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
    ]

    expect(reducer({ people: people, status:'' }, deletePeople(1))).toEqual({ people: [], status:'' });
  });

});

