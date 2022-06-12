import NavBar from "./components/NavBar";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Vehicles from "./components/Vehicles";
import React from 'react';
import AddVehicle from "./components/AddVehicle";
import AddCustomer from "./components/AddCustomer";


const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: cache
})

function App() {
  return (
    <ApolloProvider client={client}>
      <NavBar />
      <div className="container">
        <AddVehicle />
        <Vehicles />
        <AddCustomer />
      </div>    
    </ApolloProvider>
  );
}

export default App;
