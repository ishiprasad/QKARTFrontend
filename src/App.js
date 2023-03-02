import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Products from "./components/Products";
export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
          {/* <Register /> */}
          <Switch> 
            <Route exact path="/">
              <Products/> 
              </Route>
              <Route path = "/register">
                <Register/> 
                </Route >
                <Route path= "/login">
                  <Login />
                  </Route>
                  <Route path="/checkout" component={Checkout} />
                </Switch>
    </div>
  );
}

export default App;
