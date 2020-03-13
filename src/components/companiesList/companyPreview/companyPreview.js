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

const CompanyPreview = ({name, city,id}) => (
    <CompanyPreviewWrapper>
        <Row>
            <CompanyPreviewName>{name}</CompanyPreviewName>
        </Row>
        <Row>
            <CompanyPreviewName>{id}</CompanyPreviewName>
        </Row>
        <Row>
            <CompanyPreviewCity>{city}</CompanyPreviewCity>
        </Row>
    </CompanyPreviewWrapper>
);

export default CompanyPreview;
