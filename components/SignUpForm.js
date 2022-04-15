import React from 'react';
import { View, Text, Platform, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Presseable, Alert } from 'react-native';
import { Formik } from "formik"
import * as Yup from "yup";
import Validator from 'email-validator';
import { getAuth, createUserWithEmailAndPassword ,  getFirestore} from "../firebase"
import {setDoc , doc , getFirebstore} from "../firebase"



const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email.required('Email is required :)'),
    userName: Yup.string().required('User is required :)'),
   
    password: Yup.string()
        .required()
        .min(6, 'Password needs to be atleast 6 characters long :)')
})


const SignUpForm = ({ navigation }) => {
   const auth = getAuth()
   const db = getFirestore()
  const getRandomUserPicture= async () => {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    return data.results[0].picture.large;
  
  }

  const onSignUp = async (email , password , username) => {
    try {
     const authed= await createUserWithEmailAndPassword(auth, email, password)
      console.log('Firebase Signup Successful')
      
      const userDocRef=doc(db,'users',authed.user.email)
      await setDoc(userDocRef,{
        username,
        email,
        pic:authed.user.uid
      })
    }catch (error) {
      Platform.OS != 'web' ? Alert.alert(error.message) : alert(error.message)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '' , username:''}}
        onSubmit={(values) => onSignUp(values.email, values.password)}
        validationSchema={SignupFormSchema}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? '#ccc'
                      : 'red',
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder=" Username"
                autoCapitalize="none"
                textContentType="username"
                autoFocus={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? '#ccc'
                      : 'red',
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>

            <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
              <Text style={{ color: '#6bb8f5' }}>Forget Password?</Text>
            </View>

            <Presseable
              titleSize={20}
              style={styles.button}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </Presseable>

            <View style={styles.signupContainer}>
              <Text>Already a member ? </Text>
              <TouchableOpacity onPress={() => navigation.goBack('')}>
                <Text style={{ color: '#6bb0f5' }}>Log in</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}


export default SignUpForm;


const styles = StyleSheet.create({
    wrapper: {
        marginTop:80,
    },
    inputField: {
        borderRadius:4,
        padding:12,
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:1,
    },
    button: {
        backgroundColor: '#0096f6',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight:42,
        borderRadius:4,
        
    },
    buttonText: {
        color: '#fff',
        fontWeight: 600,
        fontSize: 20,

    },
    signupContainer: {
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'center',
        marginTop:50
    }
})