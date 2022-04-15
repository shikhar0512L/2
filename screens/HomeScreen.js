import React, {  useState , useEffect } from 'react';
import { StyleSheet , ScrollView, SafeAreaView } from 'react-native';
import AddNewPost from '../components/AddNewPost';
import Header from "../components/Header";
import Post from '../components/Post';
import Stories from '../components/Stories';
import {TABS} from '../data/tabs'
import { collectionGroup , getDocs , getFirestore , query , orderBy } from '../firebase';

const HomeScreen = ({navigation}) => {
    const [posts , setPosts] = useState([]);
    const db = getFirestore();

    const getPosts = async () => {
        const posts = query(collectionGroup(db,'posts'),
        orderBy('timestamp','desc')
        )
        const snapshot=await getDocs(posts)
        
        setPosts(snapshot.docs.map(doc => doc.data()))
    }
    useEffect(() => getPosts(),[]);


    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories/>
            <ScrollView>
                {posts.map((post,index)=>(
                    <Post post={post} key={index}/>
                ))}
                
            </ScrollView>
            <BottomTabs 
            icons={TABS}
            />
        </SafeAreaView>
    )
};

export default HomeScreen;

const styles = StyleSheet.create({
container:{
    backgroundColor:"black",
    flex:1
}
})