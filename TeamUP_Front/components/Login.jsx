import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Modal, ScrollView} from 'react-native';
import "@/i18n";
import { useTranslation } from 'react-i18next';
import Botao from './Botao';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validation/schemas';
import { useTheme } from '../contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';
import CardEmail from './CardEmail';
import CardSenha from './CardSenha';
import axios from 'axios';

export default function Login() {
  const { temaAtual } = useTheme();
  const { t } = useTranslation();
  const schema = loginSchema(t);
  const router = useRouter();

  const { control, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/login', {
        email: data.email,
        senha: data.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      if (error.response) {
        console.log('Erro no servidor', error.response.data?.message);
      } else if (error.request) {
        console.log('Sem resposta do servidor');
      } else {
        console.log('Erro', error.message);
      }
    };
  };

  return (
    <View style={styles.container}>
      <CardEmail control={control} errors={errors} />

      <CardSenha control={control} errors={errors} />

      <TouchableOpacity onPress={() => Alert.alert('Redefinir senha', 'Funcionalidade ainda não implementada')}>
        <Text style={[styles.forgotPassword, { color: temaAtual.textoSecundario }]}>{t('login.forgotPassword')}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => setAceitouTermos(!aceitouTermos)} 
        activeOpacity={1}
      >

        <Feather 
          name={aceitouTermos ? "check-square" : "square"} 
          size={12} color={temaAtual.textoSecundario} 
          style={styles.icon} />
        <Text style={[styles.checkboxText, { color: temaAtual.checkboxTexto}]}>{t('login.termsOfServiceStart')}{' '} 
          <Text 
            style={[styles.linkText, { color: temaAtual.textoSecundario }]} 
            onPress={() => setModalVisible(true)}> 
            {t('login.termsOfServiceMid')}
          </Text>
          {' '}{t('login.termsOfServiceEnd')}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: temaAtual.caixaTexto }]}>
            <ScrollView>
              <Text style={[styles.modalTitle, { color: temaAtual.textoAzul }]}>{t('login.termsTitle')}</Text>
              <Text style={[styles.modalText, { color: temaAtual.textoAzul }]}>{t('login.termsContent')}</Text>
            </ScrollView>
            <TouchableOpacity 
              style={[styles.closeButton, { backgroundColor: temaAtual.botao }]} 
              onPress={() => setModalVisible(false)}>
              <Text style={[styles.closeButtonText, { color: temaAtual.fundo }]}>{t('login.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Botao
        title={t('login.loginButton')}
        onPress={() => {
          if (!aceitouTermos) {
            return;
          }
          handleSubmit(onSubmit)();
        }}
      />

      <Botao
        title={t('login.createAccountButton')} 
        onPress={() => router.push('/cadastro')}  
        style={{ marginBottom: 10 }} 
      />

      <TouchableOpacity 
        style={[styles.loginGoogle, { borderColor: temaAtual.icones }]} 
        onPress={() => Alert.alert('Login com Google', 'Funcionalidade ainda não implementada')}
      >
        <AntDesign 
          name="google" 
          size={20} 
          color={temaAtual.checkboxTexto}
          style={styles.icon} 
        />
        <Text style={[styles.loginGoogleText, { color: temaAtual.checkboxTexto }]}>{t('login.loginWithGoogle')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignSelf: 'center',
    width: '80%',
    maxWidth: 400,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 1,
    fontSize: 9,
  },
  forgotPassword: {
    textAlign: 'center',
    fontSize: 9,
    marginTop: 10,
    marginBottom: 10,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  linkText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    maxWidth: '50%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
  },
  closeButton: {
    borderRadius: 5,
  },
  closeButtonText: {
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  loginGoogle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loginGoogleText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 9,
  },
});
