import React , { useState }from 'react';
import { View , Text , StyleSheet , TouchableOpacity , ScrollView , Image , Dimensions} from 'react-native';

const BottomTabs = ({icons}) => {
    const [activeTab , setActiveTab] = useState('Home');
    
    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
          <Image
            source={{
              uri: activeTab === icon.name ? icon.active : icon.inactive,
            }}
            style={[
              styles.icon,
              icon.name === 'Profile' ? styles.profilePic : null,
            ]}
          />
        </TouchableOpacity>
      )
      return (
        <View style={styles.wrapper}>
          <View style={styles.container}>
            {icons.map((icon, index) => (
              <Icon key={index} icon={icon} />
            ))}
          </View>
        </View>
      )
    }
    

export default BottomTabs

const styles = StyleSheet.create({
    wrapper:{
        position:'sticky',
        bottom:0,
        backgroundColor:'#000',
        width:'100%'
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:50,
        padding:10
    },
    icon:{
        width:30,
        height:30,
    },
    profilePic:{
        borderRadius:50,
        boderWidth:2,
        borderColor:'#fff'
    }
})