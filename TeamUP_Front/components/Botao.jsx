import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function Botao({ onPress, title }) {
    const { temaAtual } = useTheme();

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: temaAtual.botao}]}>
            <Text style={[styles.buttonText, { color: temaAtual.fundo }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        marginBottom: 15,
        width: '60%',
        maxWidth: 200,
        alignSelf: 'center',
    },
    buttonText: {
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
    },
});
