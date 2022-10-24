import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen } from '@testing-library/react'
import axios from "axios";
import { mockData } from '../../mocks/peopleMock';
import PersonCard from '.';
import { render } from "@testing-library/react";
import { renderWithProviders } from '../../common/test-utils';

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


test('fetches & receives a user after clicking the fetch user button', async () => {
 
  const cardProps =     {
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
  renderWithProviders(<PersonCard {...cardProps}/>)

  expect(screen.getByText(/Name:/i)).toBeInTheDocument()
  expect(screen.getByText(/Email:/i)).toBeInTheDocument()

  expect(await screen.findByText(/Leanne Graham/i)).toBeInTheDocument()
})