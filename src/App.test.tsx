import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import store from "./data/redux/store";
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "./theme";
import {ToastContainer} from "react-toastify";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Provider} from "react-redux";
import {unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

let container:any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

act(() => {
  // render components
});

test('renders learn react link', () => {
  const elm = render(
      <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ToastContainer/>
      <CssBaseline/>
      <App />
    </ThemeProvider>
  </Provider>);
  //expect(linkElement).toBeInTheDocument();
});
