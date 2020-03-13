import React from 'react';
import styled from 'styled-components';

const CompanyPreviewWrapper = styled.div`

`;

const CompanyPreviewName = styled.h3`

`;

const CompanyPreviewCity = styled.p`

`;

const CompanyPreview = ({name, city}) =>(
    <CompanyPreviewWrapper>
        <CompanyPreviewName>{name}</CompanyPreviewName>
        <CompanyPreviewCity>{city}</CompanyPreviewCity>
    </CompanyPreviewWrapper>
);

export default CompanyPreview;
