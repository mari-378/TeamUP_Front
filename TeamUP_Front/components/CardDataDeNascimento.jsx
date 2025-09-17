import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "@/i18n";
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validation/schemas';
import { Picker } from '@react-native-picker/picker';

export default function CardDataDeNascimento() {
  const { t } = useTranslation();
  const schema = loginSchema(t);

  const { control, formState: { errors } } = useForm({
    defaultValues: {
      dataDeNascimento: { dia: '', mes: '', ano: '' }
    },
    resolver: yupResolver(schema),
  });

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = Array.from({ length: 12 }, (_, i) => i + 1);
  const anos = Array.from({ length: 100 }, (_, i) => 2025 - i);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name='dataDeNascimento'
        render={({ field }) => {
          const { value, onChange } = field;

          const handleChange = (key, val) => {
            onChange({ ...value, [key]: val });
          };

          return (
            <View style={styles.container}>
                <Text>{t('signup.birthDate')}</Text>
              <View style={styles.row}>
                <View style={styles.pickerBox}>
                  <Picker
                    selectedValue={value.dia}
                    onValueChange={(val) => handleChange('dia', val)}
                  >
                    <Picker.Item label={t('Dia')} value="" />
                    {dias.map(d => (
                      <Picker.Item key={d} label={String(d)} value={String(d)} />
                    ))}
                  </Picker>
                </View>

                <View style={styles.pickerBox}>
                  <Picker
                    selectedValue={value.mes}
                    onValueChange={(val) => handleChange('mes', val)}
                  >
                    <Picker.Item label={t('Mês')} value="" />
                    {meses.map(m => (
                      <Picker.Item key={m} label={String(m)} value={String(m)} />
                    ))}
                  </Picker>
                </View>

                <View style={styles.pickerBox}>
                  <Picker
                    selectedValue={value.ano}
                    onValueChange={(val) => handleChange('ano', val)}
                  >
                    <Picker.Item label={t('Ano')} value="" />
                    {anos.map(y => (
                      <Picker.Item key={y} label={String(y)} value={String(y)} />
                    ))}
                  </Picker>
                </View>
              </View>
              {errors.dataDeNascimento && (
                <Text style={styles.error}>
                  {t(errors.dataDeNascimento.message)}
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerBox: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
