import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "@/i18n";
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validation/schemas';
import { Picker } from '@react-native-picker/picker';
import { Cores } from '../constants/Cores';

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
                            <View style={styles.linha}>
                                <View style={[styles.caixaDeEscolha, { borderColor: Cores.light.botao }]}>
                                <Picker
                                    selectedValue={value.dia}
                                    onValueChange={(val) => handleChange('dia', val)}
                                    style={[styles.picker, { color: Cores.light.textoAzul }]}
                                >
                                <Picker.Item label={t('signup.day')} value="" color={Cores.light.textoAzul}/>
                                {dias.map(d => (
                                    <Picker.Item key={d} label={String(d)} value={String(d)} />
                                ))}
                                </Picker>
                            </View>

                        <View style={[styles.caixaDeEscolha, { borderColor: Cores.light.botao }]}>
                            <Picker
                                selectedValue={value.mes}
                                onValueChange={(val) => handleChange('mes', val)}
                                style={[styles.picker, { color: Cores.light.textoAzul }]}
                            >
                            <Picker.Item label={t('signup.month')} value="" color={Cores.light.textoAzul}/>
                            {meses.map(m => (
                                <Picker.Item key={m} label={String(m)} value={String(m)} />
                            ))}
                            </Picker>
                        </View>

                        <View style={[styles.caixaDeEscolha, { borderColor: Cores.light.botao }]}>
                            <Picker
                                selectedValue={value.ano}
                                onValueChange={(val) => handleChange('ano', val)}
                                style={[styles.picker, { color: Cores.light.textoAzul }]}
                            >
                            <Picker.Item label={t('signup.year')} value="" color={Cores.light.textoAzul}/>
                            {anos.map(y => (
                                <Picker.Item key={y} label={String(y)} value={String(y)} />
                            ))}
                            </Picker>
                        </View>
                    </View>

                    {errors.dataDeNascimento && (
                        <Text style={[styles.error, { color: Cores.light.erro }]}>
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
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caixaDeEscolha: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  picker: {
    outlineWidth: 0,
    shadowColor: 'transparent',
  },
  error: {
    marginTop: 5,
  },
});
