import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';

interface Props {
    setTitle: (title: string) => void;
    title: string;
    addTodo: () => void;
    removeAll: () => void;
}

enum buttonColorList {
    primary = '#007bff',
    secondary = '#6c757d',
    success = '#28a745',
    danger = '#dc3545',
}

export function TodoForm({ setTitle, addTodo, title, removeAll }: Props) {
    return (
        <>
            <View style={styles.form}>
                <TextInput value={title} focusable style={styles.input} onChangeText={setTitle} onSubmitEditing={addTodo} />
                <TouchableOpacity style={{ ...styles.button, backgroundColor: buttonColorList.success }} onPress={addTodo} >
                    <Text style={{ color: 'white' }}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ ...styles.button, backgroundColor: buttonColorList.danger }} onPress={removeAll} >
                    <Text style={{ color: 'white' }} >x</Text>
                </TouchableOpacity>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    form: {
        display: 'flex',
        flexDirection: 'row',
        width: '98%',
        padding: 10,
    },
    input: {
        width: '73%',
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: 'black',
        backgroundColor: 'white',
        marginRight: 10,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
});
