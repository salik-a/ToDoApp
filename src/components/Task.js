
import React,{useState, useEffect} from 'react';
import { TouchableOpacity, Text, SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform, TextInput, Keyboard, ScrollView } from 'react-native';
import VectorImage from 'react-native-vector-image';
import checkcircle from './assets/checkcircle.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const Task = () => {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    useEffect(() => {
        getData();
        
    }, []);

    const removeValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch(e) {
        console.log(e)
    }
    }

    const handleAddTask = () => {
        Keyboard.dismiss();
        storeData(uuidv4(), task)
        setTask(null);
    }

    const completeTask = async (key) => {
        await removeValue(key);
        await getData();
    
    }

    const storeData = async (index,item) => {
        try {
            await AsyncStorage.setItem(index, item)
            await getData();
        } catch (e) {
            console.log(e)
        }
        
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
        });
    }

    const getData = async () => {
        try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        setTaskItems(result)
        await delay(1000);
        setLoading(false);
        } catch (error) {
        console.error(error)
        }
    }

    if (loading) { 
        return <LottieView source= { require('./assets/loading.json')} autoPlay loop/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.sectionTitle}>
                <Text style={styles.title}>Yapılacak Listesi</Text>
            </View>

            <View style={styles.items}>
                <ScrollView style={styles.task}>
                    <View >
                        {
                            taskItems.map((item, index) => {
                                //console.log(item)
                                return (
                                    <View key={index} >
                                        <View style={styles.item}>
                                            <View style={styles.itemleft}>
                                                <TouchableOpacity onPress={() => completeTask(item[0])}>
                                                    <VectorImage style={styles.svg} source={checkcircle} />
                                                </TouchableOpacity>
                                                <Text style={styles.itemText}>{item[1]}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }  
                    </View> 
                </ScrollView>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={ styles.write } >
                <TextInput style={styles.input} placeholder={'Görev giriniz'} value={task} onChangeText={ text => setTask(text) }/>
                <TouchableOpacity onPress={()=>handleAddTask()}>
                    <View style={styles.add}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#E8EAED',
    },
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    itemleft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    itemText: {
        maxWidth: '90%'
    },
    task: {
        paddingHorizontal:20
    
    },
    sectionTitle: {
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical:20,
    },
    items: {
        marginBottom: 50,
        height:'75%'
    },
    write: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: '75%',
    },
    add: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    svg: {
        width: 20,
        height: 20,
        marginRight:15,
    }

});

export default Task;


