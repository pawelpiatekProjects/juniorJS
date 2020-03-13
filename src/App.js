import React from 'react';
import GlobalStyles from './assets/globalStyles';
import CompaniesList from './components/companiesList/companiesList';


function App() {
  return (
    <div className="App">
      <GlobalStyles/>
      <CompaniesList/>
    </div>
  );
}

export default App;
