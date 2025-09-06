import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Modal, ScrollView} from 'react-native';
import "@/i18n";
import { useTranslation } from 'react-i18next';
import Botao from './Botao';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Cores } from '../constants/Cores';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('O email é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
});

export default function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { t } = useTranslation();

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = data => {
    Alert.alert('Dados enviados', `Email: ${data.email}\nSenha: ${data.senha}`);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={18} color={Cores.azul} style={styles.icon} />
              <TextInput
                style={[styles.input, { outline: 'none' }]}
                placeholder={t('login.email')}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, value } }) => (
          <>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color={Cores.azul} style={styles.icon} />
              <TextInput
                style={[styles.input, { outline: 'none' }]}
                placeholder={t('login.password')}
                value={value}
                onChangeText={onChange}
                secureTextEntry={!mostrarSenha}
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.icon}>
                <Ionicons name={mostrarSenha ? "eye-outline" : "eye-off-outline" } size={18} color={Cores.azul} />
              </TouchableOpacity>
            </View>
            {errors.senha && <Text style={styles.error}>{errors.senha.message}</Text>}
          </>
        )}
      />

      <TouchableOpacity onPress={() => Alert.alert('Redefinir senha', 'Funcionalidade ainda não implementada')}>
        <Text style={styles.forgotPassword}>{t('login.forgotPassword')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAceitouTermos(!aceitouTermos)} activeOpacity={1}>
        <Feather name={aceitouTermos ? "square" : "check-square"} size={12} color={Cores.azul} style={styles.icon} />
        <Text style={styles.checkboxText}>{t('login.termsOfServiceStart')}{' '} 
          <Text style={styles.linkText} onPress={() => setModalVisible(true)}> 
            {t('login.termsOfServiceMid')}
            </Text>{' '} 
            {t('login.termsOfServiceEnd')}</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>{t('login.termsTitle')}</Text>
              <Text style={styles.modalText}>{t('login.termsContent')}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>{t('login.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Botao title={t('login.loginButton')} onPress={() => {
        if (!aceitouTermos) {
          Alert.alert('Termos de uso', 'Você deve aceitar os termos de uso para continuar.');
          return;
        }
        handleSubmit(onSubmit)();
      } }/>

      <Botao title={t('login.createAccountButton')} onPress={() => Alert.alert('Criar conta', 'Funcionalidade ainda não implementada')} style={{ marginBottom: 10 }} />

      <TouchableOpacity style={styles.loginGoogle} onPress={() => Alert.alert('Login com Google', 'Funcionalidade ainda não implementada')}>
        <AntDesign name="google" size={20} color={Cores.azul} style={styles.icon} />
        <Text style={styles.loginGoogleText}>{t('login.loginWithGoogle')}</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 10,
    marginBottom: 20,
    borderRadius: 50,
    backgroundColor: Cores.verde,
    opacity: 0.5,
    color: Cores.azul,
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: Cores.azul,
  },
  error: {
    color: Cores.azul,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 1,
    color: 'rgba(0,0,255,0.5)',
    fontSize: 9,
  },
  checkboxSquare: {
    borderWidth: 1,
    borderColor: Cores.azul,
  },
  forgotPassword: {
    color: Cores.azul,
    textAlign: 'center',
    fontSize: 9,
    marginTop: 10,
    marginBottom: 10,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  linkText: {
    color: Cores.azul,
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
    maxWidth: '30%',
    backgroundColor: Cores.verde,
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Cores.azul,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
    color: Cores.azul,
  },
  closeButton: {
    backgroundColor: Cores.azul,
    borderRadius: 5,
  },
  closeButtonText: {
    color: Cores.branco,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  loginGoogle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Cores.azul,
    width: '100%',
  },
  loginGoogleText: {
    color: Cores.azul,
    textAlign: 'center',
    padding: 5,
    fontSize: 9,
  },
});
