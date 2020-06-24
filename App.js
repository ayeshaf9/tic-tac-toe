import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert, Button} from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';


export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      gameState:[
        [0,0,0],  
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    }
  };
  
  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () =>{
    this.setState({
      gameState:[
        [0,0,0],  
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1      
    });
 };
 
 renderIcon = (row, col) => {
   var value = this.state.gameState[row][col];
   switch(value)
   {
     case 1: return <Icon name="close" style={styles.selX}/>;
     case -1: return <Icon name="circle-outline" style={styles.selO}/>;
     default: return <View />;
   }
 };

 onBoxPressed = (row, col) =>{

  var value=this.state.gameState[row][col];
   if (value !== 0) {return; }

   var currentPlayer = this.state.currentPlayer;
   var array = this.state.gameState.slice();
   array[row][col] = currentPlayer;
   this.setState({gameState: array});

   var nextPlayer = (currentPlayer == 1) ? -1 : 1;
   this.setState({currentPlayer: nextPlayer});
  
   var winner = this.decideWinner();
   if (winner == 1){
     Alert.alert("Player 1 is the winner!");
     this.initializeGame();
   }else if (winner == -1){
    Alert.alert("Player 2 is the winner!");
    this.initializeGame();
  }

 };

 decideWinner = () =>{
  
  var sum;
  const BOXES = 3;
  var array = this.state.gameState;

  //rows
  for (var i = 0; i< BOXES; i++){
    sum = array[i][0] + array[i][1] + array[i][2];
    if(sum == 3) {return 1;}
    else if (sum == -3){return -1;}
  }

  //columns
  for (var i= 0; i< BOXES; i++){
    sum = array[0][i] + array[1][i] + array[2][i];
    if(sum == 3) {return 1;}
    else if (sum == -3){return -1;}
  }

  //diagonals
  sum = array[0][0] + array[1][1] + array[2][2];
  if(sum == 3) {return 1;}
  else if (sum == -3){return -1;}

  sum = array[2][0] + array[1][1] + array[0][2];
  if(sum == 3) {return 1;}
  else if (sum == -3){return -1;}

 //draw
 return 0;
 };

 newGamePressed = () =>{
   this.initializeGame();
 };

  render(){
  return (
    <View style={styles.container}>
      <Text style={{color: '#404040', fontSize: 50, paddingBottom: 50 }}>Tic Tac Toe</Text>
     <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
      <TouchableOpacity onPress={()=>this.onBoxPressed(0,0)} style={[styles.box, { borderLeftWidth: 0, borderTopWidth: 0}]}>
        {this.renderIcon(0,0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onBoxPressed(0,1)} style={[styles.box, { borderTopWidth: 0}]}>
      {this.renderIcon(0,1)}
       </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onBoxPressed(0,2)} style={[styles.box, { borderRightWidth: 0, borderTopWidth: 0}]}>
      {this.renderIcon(0,2)}
      </TouchableOpacity>
     </View>

     <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=>this.onBoxPressed(1,0)} style={[styles.box, { borderLeftWidth: 0}]}>
      {this.renderIcon(1,0)} 
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onBoxPressed(1,1)} style={styles.box}>
      {this.renderIcon(1,1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onBoxPressed(1,2)} style={[styles.box, { borderRightWidth: 0}]}>
      {this.renderIcon(1,2)}
      </TouchableOpacity>
     </View>

     <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=>this.onBoxPressed(2,0)} style={[styles.box, { borderLeftWidth: 0, borderBottomWidth: 0}]}>
      {this.renderIcon(2,0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onBoxPressed(2,1)} style={[styles.box, { borderBottomWidth: 0}]}>
      {this.renderIcon(2,1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onBoxPressed(2,2)} style={[styles.box, { borderRightWidth: 0, borderBottomWidth: 0}]}>
      {this.renderIcon(2,2)}
      </TouchableOpacity>
     </View>
     <View style={{paddingTop: 80}}/>
     <Button title="New Game" onPress={this.newGamePressed}></Button>
    </View>
   );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2dc',
  },

  box: {
    borderWidth: 6,
    width: 100,
    height: 100,
    borderColor: '#616161',
    alignItems: "center",
    justifyContent: "center"
  },

  selX:{
     color: 'red',
     fontSize: 70,
  },

  selO:{
    color: 'black',
    fontSize: 70,
  }
  
});
