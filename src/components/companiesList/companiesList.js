import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CompaniesListWrapper = styled.div`

`;

const CompaniesList = () =>{
    const [companiesList, setCompaniesList] = useState([]);

    useEffect(()=>{
        axios.get('https://recruitment.hal.skygate.io/companies')
            .then(response=>{
                console.log(response.data)
                setCompaniesList(response.data);
            })
    })

    return(
        <CompaniesListWrapper>
            {/*{companiesList.map(company => (*/}
                {/**/}
            {/*))}*/}
        </CompaniesListWrapper>
    )
};

export default CompaniesList;
