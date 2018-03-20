/**
 * Created by luowen on 2018/2/6
 */

const program = require('commander');
const { boot, isMatchRoom } = require('./index');
const { CHAT_ROOM_STOCK } = require('./const');

program
  .version('0.1.0')
  .option('-q, --query [query]', 'Query')
  .parse(process.argv);

const query = program.query.toLowerCase()

if (isMatchRoom(`<${CHAT_ROOM_STOCK[1]}>`, query)) {
  boot({ query });
}

//
// node start.js  -H 10 -b 250  -s tntbtc -r @10,1
//
