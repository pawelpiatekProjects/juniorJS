import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CompanyPreview from './companyPreview/companyPreview';

const CompaniesListWrapper = styled.div`

`;

const CompaniesListTable = styled.table`
width: 50%;
margin: 1rem auto;
border: 1px solid #333;
`;

const CompaniesListFirstRow = styled.tr`
border-bottom: 1px solid #333;
`;

const CompaniesListFirstRowItem = styled.th`
padding: 1rem;

`;

const CompaniesList = () => {
    const [companiesList, setCompaniesList] = useState([]);

    useEffect(() => {
        axios.get('https://recruitment.hal.skygate.io/companies')
            .then(response => {
                console.log(response.data)
                setCompaniesList(response.data);
            })
    })

    return (
        <CompaniesListWrapper>
            <CompaniesListTable>
                <CompaniesListFirstRow>
                    <CompaniesListFirstRowItem>Name</CompaniesListFirstRowItem>
                    <CompaniesListFirstRowItem>City</CompaniesListFirstRowItem>
                </CompaniesListFirstRow>
                {companiesList
                    .sort((a,b)=>b.id - a.id)
                    .map(company => (
                    <CompanyPreview key={company.id} name={company.name} city={company.city} id={company.id}/>
                ))}
            </CompaniesListTable>

        </CompaniesListWrapper>
    )
};

export default CompaniesList;
