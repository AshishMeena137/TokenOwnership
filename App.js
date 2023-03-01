import MyToken from "./artifacts/contracts/MyToken.sol/MyToken.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';

function App() {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [owner,setOwner] = useState("");
  const [token,setToken] = useState("0");
  const [address, setAddress] = useState("");


  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xf57e25328E4947247A056C62F2f016Bf25615559";

        const contract = new ethers.Contract(
          contractAddress,
          MyToken.abi,
          signer
        );

        let Owner = await contract.owner();
        setOwner(Owner);
        console.log("contract is : ",contract);
        console.log("Owner is : ",Owner)
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  const Transfer = async() => {
    let address = document.querySelector(".address").value;
    console.log("The Future owner is : ",address);
    let NewOwner = contract.transferOwnership(address);
    setOwner(NewOwner);
  }

  const mintToken = async () => {
    console.log("from address", address);
    console.log("number of token", token);
    await contract.mint(address, token);
    console.log("token minted successfully");
    setToken((prevToken) => String(parseInt(prevToken) + parseInt(token)));
  };

  return (
    <div className="App">
        <h1>ERC20 Token</h1>
        <p style={{color : "purple"}}>
          Account : {account ? account : "Not connected"}
        </p>

        <p>Owner of the Token: {owner}</p>
        <div>
        <p style={{color : "purple"}}>Transfer the ownership to other</p>
        <input type="text" className="address" placeholder="Enter address" />
        <button onClick={() => Transfer()}>GiveOwnerShip</button>
        </div>
        <br />
        <div>
          <form action="">
          <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Number of tokens"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={mintToken}>Mint Token</button>
          </form>
          <p>The token amount mint: {token}</p>
        </div>
    </div>
  );
}

export default App;
