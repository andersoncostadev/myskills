import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    Platform,
    FlatList,
    } from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
}

export function Home(){
    const[newSkill, setNewSkill] = useState('');
    const[mySkills, setMySkills] = useState<SkillData[]>([]);
    const[greetings, setGreetings] = useState('');

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }  

        setMySkills(oldState => [...oldState, data ]);
    }


    function handleRemoveSkill(id: string){
        setMySkills(oldstate => oldstate.filter(
            skill => skill.id !== id
        ));
    }  

    useEffect(() => {
        const currenteHour = new Date().getHours();
            if(currenteHour < 12){
                setGreetings('Good Morning!!');
            } else if(currenteHour >= 12 && currenteHour < 18){
                setGreetings('Good Afternoon!!');
            } else{
                setGreetings('Good Night!!');
            }
    },[])


   return(
    <View style={styles.container}> 

      <Text style={styles.title}>Welcome, Anderson</Text>

      <Text style={styles.greetings}>
       {greetings}
    </Text>


      <TextInput
        style={styles.input}
        placeholder='New Skill'
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

    <Button 
        title= 'Add'
        onPress={handleAddNewSkill}   
    />

    <Text style={[styles.title, {marginVertical: 50}]}>
       My Skills
    </Text>

 
    <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
            <SkillCard
                skill={item.name}
                onPress={() => handleRemoveSkill(item.id)}    
            />
        )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingVertical: 70,
        paddingHorizontal: 30
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7
    }, 
    greetings: {
        color: '#FFF'
    }
})