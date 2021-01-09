import * as React from 'react';
import {View,Text,StyleSheet, TextInput,TouchableOpacity} from 'react-native';

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      text:'',
      isSearchPressed: false,
      word:'',
      lexicalCategory: '',
      examples : [],
      defination: ""
    }
  }

  getWord=(word)=>{
    var searchKeyword=word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"+searchKeyword+".json"

    return fetch(url)
    .then((data)=>{
      if(data.status===200){
        return data.json()
      }else{
        return null
      }
    })
    .then((response) =>{
      var responseObject = response

      if(responseObject){
        var wordData = responseObject.definations[0];
        var defination = wordData.description;
        var lexicalCategory = wordData.wordType;

        this.setState({
          "word" :this.state.text,
          "defination" :defination,
          "lexicalCategory": lexicalCategory
        })
      }else{
        this.setState({
          "word": this.state.text,
          "lexicalCategory":"Not Found",
          "defination" : "Not Found"
        })
      }
    })
  }
  

  render(){
    return(
      <View>
        <Text style={{backgroundColor:"red",fontSize:40,textAlign:"center",color:"yellow"}}>Dictionary</Text>
        <TextInput 
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word:"Loading...",
              lexicalCategory: '',
              examples : [],
              defination: ""
              
            });
          }}
          value={this.state.text}
          
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => {
          this.setState({ isSearchPressed: true });
          this.getWord(this.state.text)
        }}><Text style={{fontSize:20}}>Search</Text></TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={{fontSize:20}}>Word:{" "}</Text>
          <Text style={{fontSize:20}}>{this.state.word}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={{fontSize:20}}>Type:{" "}</Text>
          <Text style={{fontSize:20}}>{this.state.lexicalCategory}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={{fontSize:20}}>Defination:{" "}</Text>
          <Text style={{fontSize:20}}>{this.state.defination}</Text>
        </View>

        

      </View>


    )
  }
}

const styles=StyleSheet.create({
  inputBox: {
    marginTop: 100,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderRadius:5
  },
  searchButton:{
    alignSelf:"center",
    width:'20%',
    backgroundColor:"gold",
    height:40,
    borderWidth:3,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    margin:20
  },
  detailsContainer:{
    flexDirection:"row",
    marginLeft:50
  }
})