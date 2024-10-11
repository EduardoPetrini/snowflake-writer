import dotenv from 'dotenv';
dotenv.config();

import snowflake from 'snowflake-sdk';
import { SfConn } from './SfConn';
import { generateFakeTitleAndDescription } from './utils';

const insert = async (sfConn: SfConn) => {
  const sqlText = `INSERT INTO ${sfConn.getTableName()} (name, description)`;
  let values = [];
  for (let i = 0; i < 1000; i++) {
    const data: [string, string] = generateFakeTitleAndDescription();

    values.push(data.reduce((acc, item) => `${acc}'${item}',`, '(').slice(0, -1) + ')');
  }
  await sfConn.write(sqlText + ' VALUES ' + values.join(','));
};

const start = async () => {
  const SF_ACCOUNT = process.env.SF_ACCOUNT;
  const SF_DATABASE = process.env.SF_DATABASE;
  const SF_WAREHOUSE = process.env.SF_WAREHOUSE;
  const SF_USERNAME = process.env.SF_USERNAME;
  const SF_TIMEOUT = process.env.SF_TIMEOUT || '300_000';
  const SF_PASSWORD = process.env.SF_PASSWORD;

  if (!SF_ACCOUNT || !SF_DATABASE || !SF_WAREHOUSE || !SF_USERNAME || !SF_PASSWORD) {
    throw new Error(`Missing required SF Parameters: 
      SF_ACCOUNT: ${!!SF_ACCOUNT}
      SF_DATABASE: ${!!SF_DATABASE}
      SF_WAREHOUSE: ${!!SF_WAREHOUSE}
      SF_USERNAME: ${!!SF_USERNAME}
      SF_PASSWORD: ${!!SF_PASSWORD}`);
  }

  const config: snowflake.ConnectionOptions = {
    account: SF_ACCOUNT,
    database: SF_DATABASE,
    warehouse: SF_WAREHOUSE,
    username: SF_USERNAME,
    timeout: Number(SF_TIMEOUT),
    password: SF_PASSWORD,
  };

  const sfConn = await SfConn.getConnection(config);

  await insert(sfConn);
};

start()
  .then(() => console.log('Done'))
  .catch(console.error)
  .finally(() => console.log('Final!'));
