import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen } from '@testing-library/react'
import axios from "axios";
import { mockData } from '../../mocks/peopleMock';
import PersonCard from '.';
import { render } from "@testing-library/react";

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

