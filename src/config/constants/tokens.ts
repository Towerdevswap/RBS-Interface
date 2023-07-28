import { ChainId, Token } from '@smartdev1990/sdkv4'
import { serializeToken } from 'state/user/hooks/helpers'
import { CHAIN_ID } from './networks'
import { SerializedToken } from './types'

const { BRISE, MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

export const defineTokens = <T extends TokenList>(t: T) => t

export const briseToken = defineTokens({
  wbnb: new Token(
    ChainId.BRISE,
    '0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710',
    18,
    'Wrapped BRISE',
    'WBRISE',
    'https://www.bitgert.com/',
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(
    ChainId.BRISE,
    '0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710',
    18,
    'Wrapped BRISE',
    'WBRISE',
    'https://www.bitgert.com/',
  ),
  rice: new Token(
    ChainId.BRISE,
    '0x1eb697Cb6F457F6a65C682F7f7c65F9f2E622A34',
    18,
    'RICE',
    'Rice Token',
    'https://Riceprotocol.org',
  ),
  busd: new Token(
    ChainId.BRISE,
    '0xd0CE781960c6356A7175988751bfC8d7cd28EA60',
    18,
    'BUSDi',
    'BUSD',
    'https://Brisecom.live',
  ),
  xRice: new Token(
    ChainId.BRISE,
    '0x722f5f012D29Cc4d6464B6a46343fBA3881eaa56',
    18,
    'xRICE',
    'xRice Token',
    'https://Riceprotocol.org',
  ),
  syrub: new Token(
    ChainId.BRISE,
    '0xd6274E2043bce7E2b2B84949e6a84A0a6C5C604D',
    18,
    'Syrub',
    'SyrupBar Token',
    'https://Riceprotocol.org',
  ),
  ypc: new Token(
    ChainId.BRISE,
    '0x11203a00a9134Db8586381C4B2fca0816476b3FD',
    18,
    'YPC',
    'YoungParrot Token',
    'https://Riceprotocol.org',
  ),
} as const)

export const mainnetTokens = defineTokens({
  wbnb: new Token(
    MAINNET,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'BNB', 'BNB', 'https://www.binance.com/'),
  cake: new Token(
    MAINNET,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
  busd: new Token(
    MAINNET,
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    18,
    'BUSD',
    'Binance USD',
    'https://www.paxos.com/busd/',
  ),
  dai: new Token(
    MAINNET,
    '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://www.makerdao.com/',
  ),
  usdt: new Token(
    MAINNET,
    '0x55d398326f99059fF775485246999027B3197955',
    18,
    'USDT',
    'Tether USD',
    'https://tether.to/',
  ),
} as const)

export const testnetTokens = defineTokens({
  wbnb: new Token(
    TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),
  cake: new Token(
    TESTNET,
    '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
  busd: new Token(
    TESTNET,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'BUSD',
    'Binance USD',
    'https://www.paxos.com/busd/',
  ),
  syrup: new Token(
    TESTNET,
    '0xfE1e507CeB712BDe086f3579d2c03248b2dB77f9',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://pancakeswap.finance/',
  ),
  bake: new Token(
    TESTNET,
    '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    18,
    'BAKE',
    'Bakeryswap Token',
    'https://www.bakeryswap.org/',
  ),
} as const)

const tokens = () => {
  const chainId = CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.BRISE) {
    return Object.keys(briseToken).reduce((accum, key) => {
      return { ...accum, [key]: briseToken[key] || testnetTokens[key] || mainnetTokens[key] }
    }, {} as typeof briseToken & typeof testnetTokens & typeof testnetTokens)
  }

  return briseToken
}

const unserializedTokens = tokens()

type SerializedTokenList = Record<keyof typeof unserializedTokens, SerializedToken>

export const serializeTokens = () => {
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {} as SerializedTokenList)

  return serializedTokens
}

export default unserializedTokens
