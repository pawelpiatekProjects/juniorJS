import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const CompanyWrapper = styled.div`

`;

const Company = (props) =>{

    return(
        <CompanyWrapper>
            <h1>{props.location.state.id}</h1>
        </CompanyWrapper>
    )
};

export default Company;
