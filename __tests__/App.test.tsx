import React from 'react'
import { render, fireEvent, shallow } from '@testing-library/react-native'
import ListScreen from '../src/screens/ListScreen';
import BottomListItems from '../src/component/BottomListItems';
import { Provider } from 'react-redux'
import {store} from '../src/redux/Store';
import { act } from 'react-test-renderer';

let data = require('../src/londonLandmarks.json');

test('All the location markers are shown in the map', () => {
  const { getByTestId } = render(<Provider store={store}><ListScreen /></Provider>)
  const containerElement = getByTestId('map');
  expect(containerElement.children.length).toBe(data.length)
})


test('The list contains all the landmarks', () => {
  const { getAllByTestId} = render(<Provider store={store}><BottomListItems /></Provider>)
  const itm = getAllByTestId('dataItem');
  expect(itm.length).toBe(data.length)
})


test('When pressing a landmark card it navigates to the details screen route.', async () => {
  const pushMock = jest.fn()
  const { getByText} = render(<Provider store={store}><BottomListItems navigation={{ push: pushMock}} /></Provider>)
  const item = data[0]
  fireEvent.press(getByText(item.name).parent);
  await act(() => new Promise((r) => setImmediate(r)));
  expect(pushMock).toBeCalledWith('Detail', {item})

})

test('When ‘hearting’ a landmark this gets added to the hearted list in state.', async () => {
  const { getByTestId } = render(<Provider store={store}><BottomListItems /></Provider>)
  fireEvent.press(getByTestId('1.CLICK').parent);
  const isLike = store.getState().locationsResponse.locations[0].isLike
  expect(isLike).toBeTruthy()
})