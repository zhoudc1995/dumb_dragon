<!--
 * @Author: 周东晨 mr_zhoudc@163.com
 * @Date: 2022-07-22 16:18:16
 * @LastEditors: 周东晨 mr_zhoudc@163.com
 * @LastEditTime: 2022-09-21 14:36:41
 * @FilePath: /code/vue3/src/views/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="dumb-wrapper">
    <div class="dumb-banner">
      <img src="@/assets/img/index/bg.jpg" />
      <div class="dumb-banner-content">
        <img class="banner-gif" src="@/assets/img/index/banner.gif" />
        <div class="banner-content">
          <div class="support"></div>
          <div class="mint-container">
            <div class="num">
              <input type="number" v-model="currentNum" />
            </div>
            <div class="mint" @click="mint"></div>
          </div>
          <div class="process">
            <div class="title">
              <span>{{ num }}</span> / 10000
            </div>
            <div class="desc">
              <span>2</span> FREE Other <span>0.005E</span>
            </div>
            <div class="desc">MAX <span>5</span> NFTS PER WALLET</div>
          </div>
        </div>
        <!-- <div class="banner-logo"></div> -->
      </div>
    </div>
    <div class="dumb-dragonz">
      <div class="dragons"></div>
      <div class="dragon-content">
        <div class="dragon-content-position">
          <div class="dragon-title"></div>
          <div class="dragon-desc">
            A collection of 10,000 PFPs with useful functions, with rich variety
            and unique rarity characteristics. <br /><br />
            Everyone thinks we're DUMB, but every DumbDragon will enjoy their
            time at DumbLab and create their own Dumb creation.
            <br /><br />
            Who wouldn't want to do Dumb but amazing things with DumbLab
            together!
          </div>
        </div>
      </div>
    </div>
    <div class="banner2">
      <img src="@/assets/img/index/banner2.jpeg" />
    </div>
    <div class="dumb-lab" id="lab">
      <div class="lab-top">
        <div class="left">
          <div class="title"></div>
          <div class="desc">
            What is the difference between a genius and a fool...? <br />
            We’d like to invite you to join and do some fun experiments to get
            the conclusion yourself...
            <br />
            <br />

            Those who are seen as Dumb in the outside world, should show your
            own creativity here and leave your mark by experimenting in our
            DumbDragon world.
            <br />
            <br />
            Assemble, Everyone! Use your imagination and innovation, brainstorm
            your own interesting ideas and experiments in the lab!
          </div>
        </div>
        <div class="right"></div>
      </div>
      <div class="lab-bottom">
        <div class="title">What we can bring you...</div>
        <div class="desc">
          - A whole new interactive experience that will continue to give value
          back to our holders over the long term of this experience.
          <br />
          <br />
          - We will be able to write the story and be a part of the legend of
          DumbDragonz together.
          <br />
          <br />
          -Perhaps a silly idea would spark some flares and your unintentional
          creation ends up turning into a work of art.
          <br />
          <br />
          Aba Aba Aba Aba Aba Aba Aba Aba .......
          <br />
          Enjoy being DUMB
          <br />
          Now…..
          <br />
          Whose experiment explosion turned my lab into a Dumbverse?!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
// const EvmChains = window.EvmChains;
const Fortmatic = window.Fortmatic;

// Web3modal instance
let web3Modal;

// Chosen wallet provider given by the dialog window
let provider; // 钱包 、 infrua

// Address of the selected account
// let selectedAccount;

export default defineComponent({
  setup() {
    const route = useRoute();
    let num = ref(0);
    let currentNum = ref(1);
    const scrollY = (curY, y) => {
      if (curY !== y) {
        // 计算需要移动的距离

        let differ = Math.abs(curY - y);

        let _curY = curY;

        requestAnimationFrame(() => {
          let step = Math.ceil(differ / 5);

          _curY += step;

          window.scrollTo(window.scrollX, curY);

          if (differ > 5 || differ < -5) {
            scrollY(_curY, y);
          } else {
            window.scrollTo(window.scrollX, y);
          }
        });
      }
    };
    const toScroll = () => {
      let curY = document.documentElement.scrollTop || document.body.scrollTop;
      let top = document.getElementById("lab").offsetTop;
      scrollY(curY, top);
    };
    const init = () => {
      console.log("Initializing example");
      console.log("WalletConnectProvider is", WalletConnectProvider);
      console.log("Fortmatic is", Fortmatic);

      // Tell Web3modal what providers we have available.
      // Built-in web browser provider (only one can exist as a time)
      // like MetaMask, Brave or Opera is added automatically by Web3modal
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            // Mikko's test key - don't copy as your mileage may vary
            infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
          },
        },

        fortmatic: {
          package: Fortmatic,
          options: {
            // Mikko's TESTNET api key
            key: "pk_test_391E26A3B43A3350",
          },
        },
      };

      web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
      });
    };
    const mint = async () => {
      provider = await web3Modal.connect();
      const web3 = new window.Web3(provider);
      const abi = [
        {
          inputs: [
            { internalType: "string", name: "_initBaseURI", type: "string" },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "ApprovalCallerNotOwnerNorApproved",
          type: "error",
        },
        { inputs: [], name: "ApprovalQueryForNonexistentToken", type: "error" },
        { inputs: [], name: "ApprovalToCurrentOwner", type: "error" },
        { inputs: [], name: "ApproveToCaller", type: "error" },
        { inputs: [], name: "BalanceQueryForZeroAddress", type: "error" },
        { inputs: [], name: "MintToZeroAddress", type: "error" },
        { inputs: [], name: "MintZeroQuantity", type: "error" },
        { inputs: [], name: "OwnerQueryForNonexistentToken", type: "error" },
        {
          inputs: [],
          name: "TransferCallerNotOwnerNorApproved",
          type: "error",
        },
        { inputs: [], name: "TransferFromIncorrectOwner", type: "error" },
        {
          inputs: [],
          name: "TransferToNonERC721ReceiverImplementer",
          type: "error",
        },
        { inputs: [], name: "TransferToZeroAddress", type: "error" },
        { inputs: [], name: "URIQueryForNonexistentToken", type: "error" },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "approved",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "baseExtension",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "getApproved",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "operator", type: "address" },
          ],
          name: "isApprovedForAll",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "maxMintOneTime",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "maxSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_mintAmount", type: "uint256" },
          ],
          name: "mint",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "ownerOf",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "bytes", name: "_data", type: "bytes" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "saleConfig",
          outputs: [
            { internalType: "uint32", name: "freeMintCount", type: "uint32" },
            {
              internalType: "uint64",
              name: "publicSalePriceWei",
              type: "uint64",
            },
            {
              internalType: "uint256",
              name: "saleStartingTime",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_newBaseExtension",
              type: "string",
            },
          ],
          name: "setBaseExtension",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "string", name: "_newBaseURI", type: "string" },
          ],
          name: "setBaseURI",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_saleStartingTime",
              type: "uint256",
            },
          ],
          name: "setStartingTime",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
          ],
          name: "supportsInterface",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "tokenURI",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ];
      const nftContractAddress = "0x281851c4dd77BAC877bac193fA987BF8D0b3cc95";
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const nftContract = new web3.eth.Contract(abi, nftContractAddress);
      let nums = await nftContract.methods.totalSupply().call();
      console.log(accounts, nums);
      num.value = nums;
    };
    onMounted(async () => {
      init();
      if (route.query.lab) {
        setTimeout(() => {
          toScroll();
        }, 500);
      }
    });
    return {
      scrollY,
      toScroll,
      mint,
      num,
      currentNum,
    };
  },
});
</script>

<style scoped lang="scss">
.dumb-wrapper {
  width: 100%;
  .dumb-banner {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    &-content {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
    }
    .banner-gif {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 134px;
      // transform: translatey(-50%);
      width: 468px;
    }
    .banner-content {
      position: absolute;
      width: 607px;
      height: 483px;
      left: 122px;
      top: 225px;
      background: rgba(255, 255, 255, 0.64);
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      .support {
        width: 267px;
        height: 124px;
        background: url(~@/assets/img/index/support.png) no-repeat center;
        background-size: contain;
        margin: 37px auto 18px;
      }
      .mint-container {
        display: flex;
        padding: 18px 58px 18px 48px;
        justify-content: space-between;
        .num {
          width: 178px;
          height: 90px;
          background: rgba(216, 150, 132, 0.5);
          box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 20px;
          color: #fff;
          font-weight: 400;
          font-size: 54px;
          text-align: center;
          line-height: 90px;
          input {
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 20px;
            background: rgba(216, 150, 132, 0.5);
            text-align: center;
            color: #fff;
            font-size: 54px;
            border: none;
            outline: none;
          }
        }
        .mint {
          width: 297px;
          height: 90px;
          background: url(~@/assets/img/index/mint.png) no-repeat center;
          background-size: contain;
        }
      }
      .process {
        text-align: center;
        .title {
          font-weight: 400;
          font-size: 48px;
          line-height: 61px;
          color: #fff;
          span {
            font-size: 48px;
            color: #fd6e46;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          }
        }
        .desc {
          font-size: 24px;
          color: #fff;
          margin-top: 10px;
          span {
            font-size: 24px;
            color: #fd6e46;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          }
        }
      }
    }
    .banner-logo {
      position: absolute;
      left: 225px;
      top: 50%;
      transform: translateY(-50%);
      width: 465px;
      height: 170px;
      background: url(~@/assets/img/index/dumb_1.png) no-repeat center;
      background-size: contain;
    }
    img {
      width: 100%;
    }
  }
  .dumb-dragonz {
    width: 100%;
    height: 100vh;
    background: #312525;
    display: flex;
    align-items: center;
    .dragons {
      width: 460px;
      height: 460px;
      background: url(~@/assets/img/index/dragons.jpeg) no-repeat center;
      background-size: cover;
      margin-left: 122px;
    }
    .dragon-content {
      position: relative;
      flex: 1;
      height: 100%;
      .dragon-content-position {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
      }
      .dragon-title {
        width: 579px;
        height: 97px;
        background: url(~@/assets/img/index/textLogo.png) no-repeat center;
        background-size: cover;
      }
      .dragon-desc {
        font-family: "Inika";
        margin-top: 70px;
        width: 699px;
        font-weight: 400;
        font-size: 24px;
        line-height: 31px;
        color: #ffffff;
      }
    }
  }
  .banner2 {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .dumb-lab {
    background: #312525;
    padding: 150px 168px 180px 122px;
    .lab-top {
      display: flex;
      .title {
        width: 383px;
        height: 68px;
        background: url(~@/assets/img/index/text1.png) no-repeat center;
        background-size: contain;
      }
      .desc {
        margin-top: 43px;
        width: 680px;
        color: #ffffff;
        font-weight: 400;
        font-size: 24px;
        line-height: 31px;
      }
      .right {
        min-width: 380px;
        width: 400px;
        height: 400px;
        background: url(~@/assets/img/index/dragon1.png) no-repeat center;
        background-size: contain;
        // margin-left: 37px;
        flex: 1;
      }
    }
    .lab-bottom {
      margin-top: 127px;
      .title {
        font-weight: 400;
        font-size: 48px;
        line-height: 61px;
        /* identical to box height */
        color: #ffffff;
      }
      .desc {
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
        color: #ffffff;
      }
    }
  }
}
</style>
