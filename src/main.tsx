import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/root.ts";
import App from "./App";
import { ThemeModeProvider } from "./context/ThemeModeContext.tsx";
import "./index.css";
import AuthListener from "./components/AuthListener.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthListener>
      <BrowserRouter>
        <ThemeModeProvider>
          <App />
        </ThemeModeProvider>
      </BrowserRouter>
    </AuthListener>
  </Provider>
);
