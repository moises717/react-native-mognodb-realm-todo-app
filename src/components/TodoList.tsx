import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { todoData } from '../hooks/useTodo';

interface Props {
    data: todoData[];
    handleComplete: (id: number) => void;
    handleDelete: (id: number) => void;
}

export default function TodoList({ data, handleComplete, handleDelete }: Props) {
    return (
        <ScrollView style={{ marginBottom: 15 }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {data?.map((todo) => {
                    return (
                        <View key={todo._id} style={styles.todoContainer}>
                            <View style={{ width: '46%' }}>
                                <Text style={{ textAlign: 'left', fontWeight: '500' }}> {todo.title}
                                </Text>

                                <Text style={styles.date}> {todo.create_at.toLocaleDateString()} {todo.create_at.getHours() + ':' + todo.create_at.getMinutes() + ':' + todo.create_at.getSeconds()}</Text>
                            </View>

                            <View style={styles.btnContainer}>
                                <Text style={todo.completed ? { color: 'green' } : { color: '#f72585' }}>{todo.completed ? 'Completado ✓' : 'Pendiente'}
                                </Text>

                                <TouchableOpacity style={styles.check} onPress={() => handleComplete(todo._id)}>
                                    <Text style={{ color: 'white' }}>{todo.completed ? '\u21B6' : '✓'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ ...styles.check, backgroundColor: '#f72585' }} onPress={() => handleDelete(todo._id)}>
                                    <Text style={{ color: 'white' }}>X</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    todoContainer: {
        backgroundColor: '#eaf4f4',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        width: '96%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'justify',
    },
    check: {
        backgroundColor: '#5a189a',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
        marginLeft: 10,
    },
    btnContainer: {
        minWidth: '45%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    date: {
        marginTop: 10,
        backgroundColor: '#219ebc',
        color: 'white', width: '70%',
        borderRadius: 10,
        fontSize: 12,
    },
});
