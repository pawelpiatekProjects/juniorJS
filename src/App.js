import React from 'react';
import GlobalStyles from './assets/globalStyles';
import CompaniesList from './components/companiesList/companiesList';
import GoogleFontLoader from 'react-google-font-loader';

//Root file

function App() {
    return (
        <>
            {/*GoogleFontLoader is used to set selected font as global font-family*/}
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
           <CompaniesList/>
       </>
    );
}

export default App;
