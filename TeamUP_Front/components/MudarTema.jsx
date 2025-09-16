import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function MudarTema () {
    const { alternarTema } = useTheme();
    
    return (
        <TouchableOpacity onPress={alternarTema}>
            <Text>Mudar tema</Text>
        </TouchableOpacity>
    );
};
