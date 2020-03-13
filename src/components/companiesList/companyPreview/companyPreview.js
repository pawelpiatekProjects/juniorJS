import React from 'react';
import styled from 'styled-components';

const CompanyPreviewWrapper = styled.tr`

`;
const Row = styled.td`
padding: 1rem;
`
const CompanyPreviewName = styled.p`
text-align: center;
`;

const CompanyPreviewCity = styled.p`
text-align: center;
`;

const CompanyPreview = ({name, city,id, click}) => (
    <CompanyPreviewWrapper onClick={()=>click(id)}>
        <Row>
            <CompanyPreviewName >{id}</CompanyPreviewName>
        </Row>
        <Row>
            <CompanyPreviewName>{name}</CompanyPreviewName>
        </Row>
        <Row>
            <CompanyPreviewCity>{city}</CompanyPreviewCity>
        </Row>
    </CompanyPreviewWrapper>
);

export default CompanyPreview;
