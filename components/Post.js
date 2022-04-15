import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions} from 'react-native';
import { ICONS } from "../data/icons"

import {
    getAuth,
    getFirestore,
    doc,
    updateDoc,
    arrayRemove,
    arrayUnion
} from "../firebase";

const Post = ({ post }) => {
    const auth = getAuth();
    const db = getFirestore();
};

const handleLike = async (post) => {
    const currentLikeStatus = !post.liked.includes(auth.currentUser.email);
    const likesRef = doc(db, `users/${post.email}/posts`, post.id);
    try {
        await updateDoc(likesRef, {
            liked: currentLikeStatus ? arrayUnion(auth.currentUser.email) : arrayRemove(auth.currentUser.email)
        })
        console.log('document updated successfully');
    } catch (error) {
        console.log('error updating document: ', error);
    }


    return (

        <View style={{ marginBottom: 30 }}>
            <PostHeader post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <PostImage
                    post={post}
                />

                <PostFooter
                    post={post}
                    handleLike={handleLike}
                />

                <PostLikes
                    post={post}
                />

                <PostCaption
                    post={post}
                />

                <PostCommentSection
                    post={post}
                />

                <PostComments
                    post={post}
                />
            </View>
        </View>
    )
}

const PostImage = ({post})=>{
    return(
        <View
        style={{width:'100%', height:450}}
        >
            <Image
                style={{ height:'100%' , resizeMode:'cover' }}
                source={{ uri: post.imageUrl }}
            />
        </View>
    )
}

const PostFooter = ({handleLike , post})=>{
    const auth = getAuth();
    return(
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 , marginVertical:5 }}>
            <View style={styles.leftFooterIconContainer}>
                <TouchableOpacity onPress={() => handleLike(post)}>
                    <Image style={styles.footerIcon} source={{uri:post.liked.includes(auth.currentUser.email)
                    ? ICONS[0].likedImageUrl :ICONS[0].imageUrl}}/>
                </TouchableOpacity>
         
         <Icon imgStyle={styles.footerIcon} imageUrl={ICONS[1].imageUrl}/>               
         <Icon imgStyle={styles.footerIcon} imageUrl={ICONS[2].imageUrl}/>   

            </View>
            
            <View>
            <Icon imgStyle={styles.footerIcon} imageUrl={ICONS[3].imageUrl}/>
            </View>
        </View>
    )
}

const Icon = ({imgStyle,imageUrl}) => (
<TouchableOpacity>
    <Image style={imgStyle} source={{uri:imageUrl}}/>
</TouchableOpacity>
)


const PostLikes = ({post})=>(
        <View style={{ flexDirection: 'row',  marginTop: 5 }}>
            <Text style={{  color: 'white' , fontWeight:600 }}>{post.liked.length.toLocaleString('en')}likes</Text>
        </View>
    )


const PostCaption = ({post})=>(
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'white'}}>
            <Text style={{fontWeight:600}}>{post.username}</Text>
           <Text>
           {post.caption}
            </Text> 
            
            </Text>
        
    </View>
)

const PostCommentSection = ({post})=>(
    <View style={{ marginTop: 5 }}>
        {!!post.comments.length && (
            <Text style={{color:'gray'}}>
                <View>{post.comments.length>1 ? "all":''} {post.comments.length} {' '} {post.comments.length> 1  ? "comments":'comment'} </View>
                
            </Text>
        )}
    </View>
)

const PostComments = ({post})=>(
    <>
    {post.comments.map((comment,index)=>(
        <View style={{flexDirection:'row' , marginTop:5}} key={index}>
            <Text style={{color:"white"}}>
                <Text style={{fontWeight:600}}>{comment.user}</Text>
                {' '} {comment.comment}
            </Text>
        </View>
    ))}
    
    
    </>
    
    )

export default Post;

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:5,
        alignItems:'center'
    },
    story:{
        width:35,
        height:35,
        resizeMode:'contain',
        borderRadius:50,
        marginLeft:6,
        boderWidh:1.5,
        borderColor:'#ff8501'
    },
    userName:{
        fontWeight:700,
        color:"white",
        marginLeft:5
    },
    footerIcon:{
        height:33,
        width:33,
    },
    leftFooterIconContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'32%'
    }
})