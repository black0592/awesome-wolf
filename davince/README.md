一轮包括
{
  player: player[this],
  draw: {color},
  insert: {index},
  guess: {player, index, guessRank, response: rank[index] === guessRank},
  discover: guess.response ? {} : { index, rank: rank[index] }
}
共四人进行上述操作
