import { View, StyleSheet, Image, Text, Alert } from "react-native";
import Cadastro from "../components/Cadastro";
import MudarLingua from "../components/MudarLingua";
import Botao from "../components/Botao";
import { Feather } from "@expo/vector-icons";
import { Cores } from "../constants/Cores";
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validation/schemas';
import axios from 'axios';

export default function PaginaDeCadastro() {
  const { t } = useTranslation();
  const schema = loginSchema(t);
  const { handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('https://teamup.com/api/cadastro', { // só um exemplo de url, será trocada pela real depois
        email: data.email,
        senha: data.senha,
        nascimento: data.nascimento,
        genero: data.genero,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    // const result = response.data; para usar num momento futuro
    Alert.alert('Sucesso', 'Login realizado com sucesso!');
  } catch (error) {
    if (error.response) {
      Alert.alert('Erro', error.response.data?.message || 'Erro no servidor');
    } else if (error.request) {
      Alert.alert('Erro', 'Sem resposta do servidor');
    } else {
      Alert.alert('Erro', error.message);
    }
  };
};

  return (
    <View style={[styles.container, { backgroundColor: Cores.light.fundo }]}>
      <View style={styles.head}>
        <Feather 
          name="arrow-left"
          size={24}
          color={Cores.light.texto}
        />
        <Image 
          source={require('../assets/images/logo.png')}
          style={styles.logoImg}
          resizeMode="contain"
        />
      </View>

      <View style={styles.mid}>
        <Text style={styles.text}>{t('signup.signup')}</Text>
        <MudarLingua />
      </View>

      <View style={styles.tail}>
        <Cadastro />
      </View>

      <>
        <Text>{t('signup.message')}</Text>
      </>

      <>
        <Botao
          title={t('signup.sign')}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}   
        />
      </>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  head: {
    width: '100%',
    height: '10%',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '30%',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  mid: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 30,
    gap: '30%',
  },
  logoImg: {
    width: '50%',
    maxWidth: 120,
    aspectRatio: 1,
    height: undefined,
  },
  text: {
    marginBottom: 20,
    fontSize: 20,
  },
  tail: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});