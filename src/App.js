import React from 'react';
import GlobalStyles from './assets/globalStyles';
import CompaniesList from './components/companiesList/companiesList';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Company from './components/company/company';


function App() {
    return (
        <BrowserRouter>

            <GlobalStyles/>
            <Switch>
                <Route path="/company" component={Company}/>
                <Route path="/" component={CompaniesList}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
