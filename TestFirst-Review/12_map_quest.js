function mapQuest(route) {
  var opposite = {
    N: 'S',
    E: 'W',
    S: 'N',
    W: 'E',
  };
  return route.reduce(function(directions, dir) {
    if (directions[directions.length - 1] === opposite[dir]) directions.pop();
    else directions.push(dir);
    return directions;
  }, []);
}