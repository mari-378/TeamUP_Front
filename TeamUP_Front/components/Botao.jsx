import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Cores } from '../constants/Cores';

export default function Botao({ onPress, title, style }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        backgroundColor: Cores.azul,
        marginBottom: 15,
        width: '60%',
        alignSelf: 'center',
    },
    buttonText: {
        color: Cores.branco,
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
    },
});
