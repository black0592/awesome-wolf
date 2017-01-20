一轮包括
  draw {color} => draw {player: this, color}
  guess {player, index, guessRank} => guess {player, index, guessRank, response: true||false}
if response == true
  () => discover {player: guessPlayer, index: guessIndex, rank: guessRank }
else
  discover {index} => discover {player: this, index, rank: index.rank }
共四人进行上述操作
