import React from 'react';
import GlobalStyles from './assets/globalStyles';
import CompaniesList from './components/companiesList/companiesList';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Company from './components/company/company';
import GoogleFontLoader from 'react-google-font-loader';

function App() {
    return (
        <BrowserRouter>
            <GoogleFontLoader
                fonts={[
                    {
                        font: 'Montserrat',
                        weights: [400, 700],
                    },
                ]}
                subsets={['cyrillic-ext', 'greek','latin']}
            />
            <GlobalStyles/>
            <Switch>
                <Route path="/company" component={Company}/>
                <Route path="/" component={CompaniesList}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
