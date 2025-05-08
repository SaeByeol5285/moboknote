import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;