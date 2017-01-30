initDraw
{
  east,
  south,
  west,
  north,
  deck,
  log: []
}

adjustHand =>
{
  east,
  south,
  west,
  north,
  deck,
  log: []
}

开始

log 中的一项如下
{
  player: player[this],
  draw: {color},
  insert: {index},
  guess: {player, index, guessRank, response: rank[index] === guessRank},
  discover: guess.response ? {} : { index, rank: rank[index] }
}
