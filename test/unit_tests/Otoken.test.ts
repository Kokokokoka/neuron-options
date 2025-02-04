import { 
  Otoken as OtokenInstance, 
  MockERC20 as MockERC20Instance, 
  MockAddressBook as MockAddressBookInstance
} from '../../typechain-types' 

import { artifacts, contract, web3 } from 'hardhat'
import { assert } from 'chai'


const Otoken = artifacts.require('Otoken.sol')
const MockERC20 = artifacts.require('MockERC20.sol')
const MockAddressBook = artifacts.require('MockAddressBook')

import { createTokenAmount } from './helpers/utils'
import { expectRevert, expectEvent, time } from '@openzeppelin/test-helpers'
import { BigNumber } from '@ethersproject/bignumber/lib/bignumber'

contract('Otoken', ([deployer, controller, user1, user2, random]) => {
  let addressBook: MockAddressBookInstance
  let otoken: OtokenInstance
  let usdc: MockERC20Instance
  let weth: MockERC20Instance
  let addressBookAddr: string

  // let expiry: number;
  const strikePrice = createTokenAmount(200)
  const expiry = 1601020800 // 2020/09/25 0800 UTC
  const isPut = true

  before('Deployment', async () => {
    // Need another mock contract for addressbook when we add ERC20 operations.
    addressBook = await MockAddressBook.new()
    addressBookAddr = addressBook.address
    await addressBook.setController(controller)

    // deploy oToken with addressbook
    otoken = await Otoken.new()

    usdc = await MockERC20.new('USDC', 'USDC', 6)
    weth = await MockERC20.new('WETH', 'WETH', 18)
  })

  describe('Otoken Initialization', () => {
    it('should be able to initialize with put parameter correctly', async () => {
      /* init
      address _addressBook,
      address _underlyingAsset,
      address _strikeAsset,
      address[] calldata _collateralAssets,
      uint256 _strikePrice,
      uint256 _expiryTimestamp,
      bool _isPut
      */
      await otoken.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, expiry, isPut, {
        from: deployer,
      })
      assert.equal(await otoken.underlyingAsset(), weth.address)
      assert.equal(await otoken.strikeAsset(), usdc.address)
      assert.equal(await otoken.collateralAssets(0), usdc.address)
      assert.equal((await otoken.strikePrice()).toString(), strikePrice.toString())
      assert.equal(await otoken.isPut(), isPut)
      assert.equal((await otoken.expiryTimestamp()).toNumber(), expiry)
    })

    it('should initilized the put option with valid name / symbol', async () => {
      assert.equal(await otoken.name(), `WETHUSDC 25-September-2020 200Put MULTI01 Collateral`)
      assert.equal(await otoken.symbol(), `oWETHUSDC/MULTI01-25SEP20-200P`)
      assert.equal((await otoken.decimals()), 8)
    })

    it('should get correct otoken details', async () => {
      /* getOtokenDetails
      collateralAssets,
      collateralsAmounts,
      underlyingAsset,
      strikeAsset,
      strikePrice,
      expiryTimestamp,
      isPut,
      collaterizedTotalAmount
      */
      const otokenDetails = await otoken.getOtokenDetails()
      assert.equal(otokenDetails[0][0], usdc.address, 'getOtokenDetails collateral asset mismatch')
      assert.equal(otokenDetails[1][0].toString(), '0', 'getOtokenDetails collateralsAmounts must be zero')
      assert.equal(otokenDetails[2], weth.address, 'getOtokenDetails underlying asset mismatch')
      assert.equal(otokenDetails[3], usdc.address, 'getOtokenDetails strike asset mismatch')
      assert.equal(otokenDetails[4].toString(), strikePrice.toString(), 'getOtokenDetails strike price mismatch')
      assert.equal(otokenDetails[5].toNumber(), expiry, 'getOtokenDetails expiry mismatch')
      assert.equal(otokenDetails[6], isPut, 'getOtokenDetails isPut mismatch')
      assert.equal(otokenDetails[7].toString(), '0', 'getOtokenDetails collaterizedTotalAmount must be zero')
    })

    it('should revert when init is called again with the same parameters', async () => {
      await expectRevert(
        otoken.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, expiry, isPut),
        'Initializable: contract is already initialized',
      )
    })

    it('should revert when init is called again with different parameters', async () => {
      await expectRevert(
        otoken.init(addressBookAddr, usdc.address, weth.address, [weth.address], strikePrice, expiry, false),
        'Initializable: contract is already initialized',
      )
    })

    it('should set the right name for calls', async () => {
      const callOption = await Otoken.new()
      await callOption.init(addressBookAddr, weth.address, usdc.address, [weth.address], strikePrice, expiry, false, {
        from: deployer,
      })
      assert.equal(await callOption.name(), `WETHUSDC 25-September-2020 200Call MULTI01 Collateral`)
      assert.equal(await callOption.symbol(), `oWETHUSDC/MULTI01-25SEP20-200C`)
    })

    it('should set the right name and symbol for option with strikePrice < 1', async () => {
      // strike price with lots of ending zeros
      const strikePrice = createTokenAmount(5, 7)
      const o1 = await Otoken.new()
      await o1.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, expiry, true, {
        from: deployer,
      })
      assert.equal(await o1.name(), `WETHUSDC 25-September-2020 0.5Put MULTI01 Collateral`)
      assert.equal(await o1.symbol(), `oWETHUSDC/MULTI01-25SEP20-0.5P`)
    })

    it('should set the right name and symbol for option with strikePrice < 1, with 8 decimals', async () => {
      // strike price with 8 decimals
      const strikePrice2 = createTokenAmount(10052, 0)
      const o2 = await Otoken.new()
      await o2.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice2, expiry, true, {
        from: deployer,
      })
      assert.equal(await o2.name(), `WETHUSDC 25-September-2020 0.00010052Put MULTI01 Collateral`)
      assert.equal(await o2.symbol(), `oWETHUSDC/MULTI01-25SEP20-0.00010052P`)
    })

    it('should set the right name and symbol for option with strikePrice < 1, with starting and trailing zeroes.', async () => {
      const strikePrice3 = createTokenAmount(729, 4)
      const o3 = await Otoken.new()
      await o3.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice3, expiry, true, {
        from: deployer,
      })
      assert.equal(await o3.name(), `WETHUSDC 25-September-2020 0.0729Put MULTI01 Collateral`)
      assert.equal(await o3.symbol(), `oWETHUSDC/MULTI01-25SEP20-0.0729P`)
    })

    it('should set the right name for option with strikePrice 0', async () => {
      const strikePrice = '0'
      const oToken = await Otoken.new()
      await oToken.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, expiry, true, {
        from: deployer,
      })
      assert.equal(await oToken.name(), `WETHUSDC 25-September-2020 0Put MULTI01 Collateral`)
      assert.equal(await oToken.symbol(), `oWETHUSDC/MULTI01-25SEP20-0P`)
    })

    it('should set the right name for non-eth options', async () => {
      const weth = await MockERC20.new('WETH', 'WETH', 18)
      const putOption = await Otoken.new()
      await putOption.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, expiry, isPut, {
        from: deployer,
      })
      assert.equal(await putOption.name(), `WETHUSDC 25-September-2020 200Put MULTI01 Collateral`)
      assert.equal(await putOption.symbol(), `oWETHUSDC/MULTI01-25SEP20-200P`)
    })

    it('should revert when init asset with non-erc20 address', async () => {
      /* This behavior should've been banned by factory) */
      const put = await Otoken.new()
      await expectRevert(
        put.init(addressBookAddr, random, usdc.address, [usdc.address], strikePrice, expiry, isPut, {
          from: deployer,
        }),
        'revert',
      )
    })

    it('should set the right name for options with 0 expiry (should be banned by factory)', async () => {
      /* This behavior should've been banned by factory) */
      const otoken = await Otoken.new()
      await otoken.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 0, isPut, {
        from: deployer,
      })
      assert.equal(await otoken.name(), `WETHUSDC 01-January-1970 200Put MULTI01 Collateral`)
      assert.equal(await otoken.symbol(), `oWETHUSDC/MULTI01-01JAN70-200P`)
    })

    it('should set the right name for options expiry on 2345/12/31', async () => {
      /** This is the largest timestamp that the factoy will allow (the largest bokkypoobah covers) **/
      const otoken = await Otoken.new()
      const _expiry = '11865394800' // Mon, 31 Dec 2345
      await otoken.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, _expiry, isPut, {
        from: deployer,
      })
      assert.equal(await otoken.name(), `WETHUSDC 31-December-2345 200Put MULTI01 Collateral`)
      assert.equal(await otoken.symbol(), `oWETHUSDC/MULTI01-31DEC45-200P`)
    })

    it('should set the right symbol for year 220x ', async () => {
      const expiry = 7560230400 // 2209-07-29
      const otoken = await Otoken.new()
      await otoken.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, expiry, true, {
        from: deployer,
      })
      assert.equal(await otoken.symbol(), 'oWETHUSDC/MULTI01-29JUL09-200P')
      assert.equal(await otoken.name(), 'WETHUSDC 29-July-2209 200Put MULTI01 Collateral')
    })

    it('should set the right name and symbol for expiry on each month', async () => {
      // We need to go through all decision branches in _getMonth() to make a 100% test coverage.
      const January = await Otoken.new()
      await January.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1893456000, isPut, {
        from: deployer,
      })
      assert.equal(await January.name(), 'WETHUSDC 01-January-2030 200Put MULTI01 Collateral')
      assert.equal(await January.symbol(), 'oWETHUSDC/MULTI01-01JAN30-200P')

      const February = await Otoken.new()
      await February.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1896134400, isPut, {
        from: deployer,
      })
      assert.equal(await February.name(), 'WETHUSDC 01-February-2030 200Put MULTI01 Collateral')
      assert.equal(await February.symbol(), 'oWETHUSDC/MULTI01-01FEB30-200P')

      const March = await Otoken.new()
      await March.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1898553600, isPut, {
        from: deployer,
      })
      assert.equal(await March.name(), 'WETHUSDC 01-March-2030 200Put MULTI01 Collateral')
      assert.equal(await March.symbol(), 'oWETHUSDC/MULTI01-01MAR30-200P')

      const April = await Otoken.new()
      await April.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1901232000, isPut, {
        from: deployer,
      })
      assert.equal(await April.name(), 'WETHUSDC 01-April-2030 200Put MULTI01 Collateral')
      assert.equal(await April.symbol(), 'oWETHUSDC/MULTI01-01APR30-200P')

      const May = await Otoken.new()
      await May.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1903824000, isPut, {
        from: deployer,
      })
      assert.equal(await May.name(), 'WETHUSDC 01-May-2030 200Put MULTI01 Collateral')
      assert.equal(await May.symbol(), 'oWETHUSDC/MULTI01-01MAY30-200P')

      const June = await Otoken.new()
      await June.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1906502400, isPut, {
        from: deployer,
      })
      assert.equal(await June.name(), 'WETHUSDC 01-June-2030 200Put MULTI01 Collateral')
      assert.equal(await June.symbol(), 'oWETHUSDC/MULTI01-01JUN30-200P')

      const July = await Otoken.new()
      await July.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1909094400, isPut, {
        from: deployer,
      })
      assert.equal(await July.name(), 'WETHUSDC 01-July-2030 200Put MULTI01 Collateral')
      assert.equal(await July.symbol(), 'oWETHUSDC/MULTI01-01JUL30-200P')

      const August = await Otoken.new()
      await August.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1911772800, isPut, {
        from: deployer,
      })
      assert.equal(await August.name(), 'WETHUSDC 01-August-2030 200Put MULTI01 Collateral')
      assert.equal(await August.symbol(), 'oWETHUSDC/MULTI01-01AUG30-200P')

      const September = await Otoken.new()
      await September.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1914451200, isPut, {
        from: deployer,
      })
      assert.equal(await September.name(), 'WETHUSDC 01-September-2030 200Put MULTI01 Collateral')
      assert.equal(await September.symbol(), 'oWETHUSDC/MULTI01-01SEP30-200P')

      const October = await Otoken.new()
      await October.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1917043200, isPut, {
        from: deployer,
      })
      assert.equal(await October.name(), 'WETHUSDC 01-October-2030 200Put MULTI01 Collateral')
      assert.equal(await October.symbol(), 'oWETHUSDC/MULTI01-01OCT30-200P')

      const November = await Otoken.new()
      await November.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1919721600, isPut, {
        from: deployer,
      })
      assert.equal(await November.name(), 'WETHUSDC 01-November-2030 200Put MULTI01 Collateral')
      assert.equal(await November.symbol(), 'oWETHUSDC/MULTI01-01NOV30-200P')

      const December = await Otoken.new()
      await December.init(addressBookAddr, weth.address, usdc.address, [usdc.address], strikePrice, 1922313600, isPut, {
        from: deployer,
      })
      assert.equal(await December.name(), 'WETHUSDC 01-December-2030 200Put MULTI01 Collateral')
      assert.equal(await December.symbol(), 'oWETHUSDC/MULTI01-01DEC30-200P')
    })

    it('should display strikePrice as $0 in name and symbol when strikePrice < 10^18', async () => {
      const testOtoken = await Otoken.new()
      await testOtoken.init(addressBookAddr, weth.address, usdc.address, [usdc.address], 0, expiry, isPut, {
        from: deployer,
      })
      assert.equal(await testOtoken.name(), `WETHUSDC 25-September-2020 0Put MULTI01 Collateral`)
      assert.equal(await testOtoken.symbol(), `oWETHUSDC/MULTI01-25SEP20-0P`)
    })
  })

  describe('Token operations: Mint', () => {
    const amountToMint = createTokenAmount(10)
    const collateralAmount = 10
    const collateralValue = 5
    

    it('should be able to mint tokens from controller address', async () => {
      /* 
        address account,
        uint256 amount,
        uint256[] calldata collateralsAmountsForMint,
        uint256[] calldata collateralsValuesForMint
      
      */
      await otoken.mintOtoken(user1, amountToMint, [collateralAmount], [collateralValue], { from: controller })
      const balance = await otoken.balanceOf(user1)
      assert.equal(balance.toString(), amountToMint.toString())
      assert.equal((await otoken.getCollateralsAmounts())[0].toString(), collateralAmount.toString())
      assert.equal((await otoken.getCollateralsValues())[0].toString(), collateralValue.toString())

      const collateralAmount2 = 5
      const collateralValue2 = 5
      await otoken.mintOtoken(user1, amountToMint, [collateralAmount2], [collateralValue2], { from: controller })
      assert.equal((await otoken.getCollateralsAmounts())[0].toString(), (collateralAmount + collateralAmount2).toString())
      assert.equal((await otoken.getCollateralsValues())[0].toString(), (collateralValue + collateralValue2).toString())

    })

    it('should revert when minting from random address', async () => {
      await expectRevert(
        otoken.mintOtoken(user1, amountToMint,[collateralAmount], [collateralValue], { from: random }),
        'Otoken: Only Controller can mint Otokens',
      )
    })

    it('should revert when someone try to mint for himself.', async () => {
      await expectRevert(
        otoken.mintOtoken(user1, amountToMint, [collateralAmount], [collateralValue], { from: user1 }),
        'Otoken: Only Controller can mint Otokens',
      )
    })
  })

  describe('Token operations: Transfer', () => {
    const amountToMint = createTokenAmount(10)
    it('should be able to transfer tokens from user 1 to user 2', async () => {
      await otoken.transfer(user2, amountToMint, { from: user1 })
      const balance = await otoken.balanceOf(user2)
      assert.equal(balance.toString(), amountToMint.toString())
    })

    it('should revert when calling transferFrom with no allownace', async () => {
      await expectRevert(
        otoken.transferFrom(user2, user1, amountToMint, { from: random }),
        'ERC20: transfer amount exceeds allowance',
      )
    })

    it('should revert when controller call transferFrom with no allownace', async () => {
      await expectRevert(
        otoken.transferFrom(user2, user1, amountToMint, { from: controller }),
        'ERC20: transfer amount exceeds allowance',
      )
    })

    it('should be able to use transferFrom to transfer token from user2 to user1.', async () => {
      await otoken.approve(random, amountToMint, { from: user2 })
      await otoken.transferFrom(user2, user1, amountToMint, { from: random })
      const user2Remaining = await otoken.balanceOf(user2)
      assert.equal(user2Remaining.toString(), '0')
    })
  })

  describe('Token operations: Burn', () => {
    const amountToMint = createTokenAmount(10)
    it('should revert when burning from random address', async () => {
      await expectRevert(
        otoken.burnOtoken(user1, amountToMint, { from: random }),
        'Otoken: Only Controller can burn Otokens',
      )
    })

    it('should revert when someone trys to burn for himeself', async () => {
      await expectRevert(
        otoken.burnOtoken(user1, amountToMint, { from: user1 }),
        'Otoken: Only Controller can burn Otokens',
      )
    })

    it('should be able to burn tokens from controller address', async () => {
      const balanceBeforeBurn = await otoken.balanceOf(user1)
      assert.equal(balanceBeforeBurn.toString(), (BigNumber.from(amountToMint).mul(2)).toString())
      await otoken.burnOtoken(user1, balanceBeforeBurn, { from: controller })
      const balance = await otoken.balanceOf(user1)
      assert.equal(balance.toString(), '0')
    })
  })
})
