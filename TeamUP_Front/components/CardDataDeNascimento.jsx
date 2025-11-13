import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "@/i18n";
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { Cores } from '../constants/Cores';

export default function CardDataDeNascimento({ control, errors }) {
    const { t } = useTranslation();

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 100 }, (_, i) => 2025 - i);

    return (
            <View style={styles.container}>
                <Controller
                    control={control}
                    name='birthDate'
                    defaultValue={{ day: null, month: null, year: null }}
                    render={({ field }) => {
                        const { value, onChange } = field;

                        const handleChange = (key, val) => {
                            const newValue = { ...value, [key]: val === '' ? '' : Number(val) };
                            console.log('data atualizada', newValue);
                            onChange(newValue);
                        };

                        return (
                            <View style={styles.container}>
                                <View style={styles.linha}>
                                    <View style={[styles.caixaDeEscolha, { borderColor: Cores.light.botao }]}>
                                    <Picker
                                        selectedValue={value.day}
                                        onValueChange={(val) => handleChange('day', val)}
                                        style={[styles.picker, { color: Cores.light.textoAzul }]}
                                        testID="input-dia"
                                    >
                                    <Picker.Item label={t('signup.day')} value={null} color={Cores.light.textoAzul}/>
                                    {days.map(d => (
                                        <Picker.Item key={d} label={String(d)} value={d} />
                                    ))}
                                    </Picker>
                                </View>

                            <View style={[styles.caixaDeEscolha, { borderColor: Cores.light.botao }]}>
                                <Picker
                                    selectedValue={value.month}
                                    onValueChange={(val) => handleChange('month', val)}
                                    style={[styles.picker, { color: Cores.light.textoAzul }]}
                                    testID="input-mes"
                                >
                                <Picker.Item label={t('signup.month')} value={null} color={Cores.light.textoAzul}/>
                                {months.map(m => (
                                    <Picker.Item key={m} label={String(m)} value={m} />
                                ))}
                                </Picker>
                            </View>

                            <View style={[styles.caixaDeEscolha, { borderColor: Cores.light.botao }]}>
                                <Picker
                                    selectedValue={value.year}
                                    onValueChange={(val) => handleChange('year', val)}
                                    style={[styles.picker, { color: Cores.light.textoAzul }]}
                                    testID="input-ano"
                                >
                                <Picker.Item label={t('signup.year')} value={null} color={Cores.light.textoAzul}/>
                                {years.map(y => (
                                    <Picker.Item key={y} label={String(y)} value={y} />
                                ))}
                                </Picker>
                            </View>
                        </View>

                        {errors.birthDate && (
                            <Text style={[styles.error, { color: Cores.light.erro }]}>
                                {t(errors.birthDate.message)}
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
