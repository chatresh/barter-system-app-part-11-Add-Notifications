import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    ScrollView, 
    KeyboardAvoidingView,
    Alert,
    TextInput, 
    Modal,
    FlatList,
} from 'react-native';
import db from "../config";
import firebase from "firebase";
import { ListItem } from 'react-native-elements'
import MyHeader from '../components/MyHeader'



export default class MyRecievedItems extends React.Component {
    constructor(){
        super()
        this.state = {
          userId:firebase.auth().currentUser.email,
          Recieved_Items : []
        }
      this.requestRef= null
      }
      
  MyRecievedItems=()=>{
   this.requestRef =  db.collection("Recieved_Items")
   .where("email_id","==",this.state.userId)
   .where("item_status","==","recieved")
    .onSnapshot((snapshot)=>{
      var Recieved_Items = snapshot.docs.map(document => document.data())
      this.setState({Recieved_Items:Recieved_Items})
    })
  }

  componentDidMount=()=>{
    this.MyRecievedItems();
  }
   
  keyExtractor = ({item,index}) => index.toString() 

  renderItem =({i,item}) => {
   <ListItem
   key ={i}
   title={this.item_name}
   subtitle={this.item_status}
   titleStyle={{color:"black",fontWeigth:"bold"}}
   bottomDivider
   />
  }
  render(){
      return(
          <View>
           {
             this.state.Recieved_Items.length === 0
             ?(
                 <Text>List Of your RecievedItems</Text>
             ) : (
                 <FlatList
                 data={this.state.Recieved_Items}
                 renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                 />
             )
           }
          </View>
      )
  }
}