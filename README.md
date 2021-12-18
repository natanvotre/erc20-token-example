# Asset Tokenization Using ERC-20

## DotEnv template

1. Create `.env` file into the root folder.
2. Add the variables using the following template:

```
INITIAL_SUPPLY=<INTEGER_VALUE>
WALLET_MNEMONIC=<STR_TEXT>
MAIN_PK=<PRIVATE_KEY>
```

## Dev environment

Deploy the dev environment using Ganache.

The following command setups the ganache using the MAIN_PK with already some ethers on it.

Make sure that you are using the .env on your terminal.


```
ganache-cli -h 0.0.0.0 -i 5777 --account $MAIN_PK,100000000000000000000
```
