import {Vibration} from 'react-native';
import {useEffect, useState} from 'react';
import Realm from 'realm';

import SoundPlayer from 'react-native-sound-player';

import {TodosSchema} from '../schemas/todo';

let realm: Realm;

export interface todoData {
  _id: number;
  title: string;
  completed: boolean;
  create_at: Date;
}

export default function useTodo() {
  const [data, setData] = useState<todoData[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const getRealmInstance = async () => {
      try {
        realm = await Realm.open({
          path: 'myrealm',
          schema: [TodosSchema],
          deleteRealmIfMigrationNeeded: true,
        });
        setData(realm?.objects('Todos').sorted('create_at', false).toJSON());

        realm?.addListener('change', () => {
          const todos = realm.objects('Todos').sorted('create_at', false);
          setData(todos.toJSON());
        });
      } catch (e) {
        console.log(e);
      }
    };
    getRealmInstance();

    return () => {
      realm?.removeAllListeners();
      realm?.close();
    };
  }, []);

  const addTodo = () => {
    if (!title) {
      playSound('error');
      Vibration.vibrate(100);
      return;
    }

    realm?.write(() => {
      realm.create('Todos', {
        _id: Math.random().toString(),
        title: title,
        completed: false,
        create_at:
          new Date().toDateString() +
          ' ' +
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds(),
      });
      playSound('add');

      setTitle('');
    });
  };
  const handleComplete = (id: number) => {
    Vibration.vibrate(100);
    realm?.write(() => {
      const todo = realm?.objectForPrimaryKey<todoData>('Todos', id);
      todo!.completed = !todo!.completed;
      if (todo!.completed) {
        playSound('completed');
      }
    });
  };

  const handleDelete = (id: number) => {
    realm?.write(() => {
      realm?.delete(realm?.objectForPrimaryKey('Todos', id));
      playSound('remove');
    });
  };

  const removeAll = () => {
    realm?.write(() => {
      realm?.deleteAll();
      playSound('remove');
    });
  };

  const playSound = (name: string) => {
    try {
      SoundPlayer.setVolume(0.2);
      SoundPlayer.playSoundFile(name, 'mp3');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    data,
    title,
    setTitle,
    addTodo,
    handleComplete,
    handleDelete,
    removeAll,
  };
}
