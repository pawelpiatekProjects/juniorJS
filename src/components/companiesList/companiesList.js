import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CompanyPreview from './companyPreview/companyPreview';

const CompaniesListWrapper = styled.div`

`;

const CompaniesListTable = styled.table`

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
                {companiesList.map(company => (
                    <CompanyPreview key={company.id} name={company.name} city={company.city}/>
                ))}
            </CompaniesListTable>

        </CompaniesListWrapper>
    )
};

export default CompaniesList;
