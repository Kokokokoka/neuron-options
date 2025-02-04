import path from 'path'
import { USDT, DAI, WETH, USDC } from '../../constants/externalAddresses'
import { prettyObjectStringify } from '../../utils/log'
import { testDeploy } from '../helpers/fixtures'
import { testMintRedeemSettleFactory } from '../helpers/testMintRedeemSettle'

const oTokenParams = {
  collateralAssets: [USDT, DAI],
  underlyingAsset: WETH,
  strikeAsset: USDC,
  strikePriceFormatted: 3800,
  expiryDays: 7,
  isPut: true,
}

const testsParams = [
  {
    oTokenParams: oTokenParams,
    initialPrices: {
      [USDT]: 1,
      [USDC]: 1.32,
      [DAI]: 1,
      [WETH]: 4200,
    },
    expiryPrices: {
      [USDT]: 1,
      [USDC]: 1,
      [DAI]: 1,
      [WETH]: 3500,
    },
    vaults: [
      {
        collateralAmountsFormatted: [3800, 3800],
        oTokenAmountFormatted: 1,
      },
    ],
  },
  {
    oTokenParams: oTokenParams,
    initialPrices: {
      [USDT]: 1.1,
      [USDC]: 1.1,
      [DAI]: 1,
      [WETH]: 4200,
    },
    expiryPrices: {
      [USDT]: 1,
      [USDC]: 1.4,
      [DAI]: 1,
      [WETH]: 3500,
    },
    vaults: [
      {
        collateralAmountsFormatted: [3800, 0],
        oTokenAmountFormatted: 1,
      },
    ],
  },
  {
    oTokenParams: oTokenParams,
    initialPrices: {
      [USDT]: 1,
      [USDC]: 1.3,
      [DAI]: 1,
      [WETH]: 4200,
    },
    expiryPrices: {
      [USDT]: 0.5,
      [USDC]: 1,
      [DAI]: 0.8,
      [WETH]: 3500,
    },
    vaults: [
      {
        collateralAmountsFormatted: [0, 5000],
        oTokenAmountFormatted: 1,
      },
    ],
  },
  {
    oTokenParams: oTokenParams,
    initialPrices: {
      [USDT]: 1.7,
      [USDC]: 1,
      [DAI]: 1.1,
      [WETH]: 4200,
    },
    expiryPrices: {
      [USDT]: 2.5,
      [USDC]: 1.4,
      [DAI]: 3.1,
      [WETH]: 4900,
    },
    vaults: [
      {
        collateralAmountsFormatted: [2000, 7990],
        oTokenAmountFormatted: 1,
      },
    ],
  },
  {
    oTokenParams: oTokenParams,
    initialPrices: {
      [USDT]: 1,
      [USDC]: 1.2,
      [DAI]: 1,
      [WETH]: 4200,
    },
    expiryPrices: {
      [USDT]: 0.8,
      [USDC]: 1,
      [DAI]: 0.8,
      [WETH]: 3500,
    },
    vaults: [
      {
        collateralAmountsFormatted: [2000, 4000],
        oTokenAmountFormatted: 1,
      },
      {
        collateralAmountsFormatted: [4900, 0],
        oTokenAmountFormatted: 1,
      },
      {
        collateralAmountsFormatted: [2000, 2700],
        oTokenAmountFormatted: 1,
      },
    ],
  },
] as const

describe(path.basename(__filename), function () {
  let deployResult: Awaited<ReturnType<typeof testDeploy>>

  before(async () => {
    deployResult = await testDeploy()
  })

  afterEach(async () => {
    deployResult = await testDeploy()
  })

  const getDeployResults = () => deployResult
  const proceedTest = testMintRedeemSettleFactory(getDeployResults)

  for (const testParam of testsParams) {
    it(`Test mint redeem settle with following params:\n ${prettyObjectStringify(testParam)}`, () =>
      proceedTest(testParam))
  }
})
