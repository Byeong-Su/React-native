import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { images } from '../images';
//import { TouchableOpacity } from 'react-native';

const Icon = styled.Image`
    tint-color: '#fff';
    width: 15px;
    height: 15px;
`;

const IconImage = ({ type }) => {
    return(
        <Icon source={type}/>
    );
};

IconImage.propTypes = {
    type: PropTypes.oneOf(Object.values(images)).isRequired,
};

export default Icon;