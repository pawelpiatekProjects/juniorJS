import React from 'react';
import styled from 'styled-components';
import * as colors from '../../../assets/colors';

const CompanyPreviewWrapper = styled.tr`
&:hover{
cursor: pointer;
background-color: ${colors.tableBorderGray2};
}
`;
const Row = styled.td`
padding: 1rem;
`
const CompanyPreviewText = styled.p`
text-align: center;

@media(max-width: 650px){

font-size: 1.4rem;

}

@media(max-width: 450px){

font-size: 1.2rem;

}
`;



const CompanyPreview = ({name, city,id, click}) => (
    <CompanyPreviewWrapper onClick={()=>click(id,name,city)}>
        <Row>
            <CompanyPreviewText >{id}</CompanyPreviewText>
        </Row>
        <Row>
            <CompanyPreviewText>{name}</CompanyPreviewText>
        </Row>
        <Row>
            <CompanyPreviewText>{city}</CompanyPreviewText>
        </Row>
    </CompanyPreviewWrapper>
);

export default CompanyPreview;
