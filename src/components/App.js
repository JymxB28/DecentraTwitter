import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Decentratwitter from "../abis/Decentratwitter.json";
import address from "../contractsData/decentratwitter_address.json";
import { Spinner, Navbar, Nav, Button, Container } from "react-bootstrap";
import logo from "../logo.png";
import Home from "./Home.js";
import Profile from "./Profile.js";
import "../App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState({});

  const web3Handler = async () => {
    let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);

    // Setup event listeners for metamask
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    window.ethereum.on("accountsChanged", async () => {
      // setLoading(true);
      // setAccount(null);
      window.location.reload();

      // web3Handler();
    });
    setLoading(false);
    loadContract();
  };
  const loadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const networkId = await provider.getNetwork().chainId;
    // const networkData = puraData.networks[networkId];
    // if (networkData) {
    //   const contract = new ethers.Contract(DecentratwitterAddress.address, DecentratwitterAbi.abi, signer);
    //   setContract(contract);
    //   setLoading(false);
    // } else {
    //   window.alert("Contract not Deployed on network");
    // } TRY TO IMPLEMENT THIS , DIG INTO ETHERJS......
    const contract = new ethers.Contract(Decentratwitter.abi, address, signer);
    setContract(contract);
    setLoading(false);
  };

  // const test01 = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   // const signer = provider.getSigner();
  //   const networkId = await provider.getNetwork();
  //   const networkData = puraData.networks[networkId];
  //   // const addres = await networkData.address;
  //   console.log(networkId);
  // };
  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navbar expand="lg" bg="secondary" variant="dark">
            <Container>
              <Navbar.Brand>
                <img src={logo} width="40" height="40" className="" alt="" />
                &nbsp; Decentratwitter
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                </Nav>
                <Nav>
                  {account ? (
                    <Nav.Link href={`https://etherscan.io/address/${account}`} target="_blank" rel="noopener noreferrer" className="button nav-button btn-sm mx-4">
                      <Button variant="outline-light">{account.slice(0, 5) + "..." + account.slice(38, 42)}</Button>
                    </Nav.Link>
                  ) : (
                    <Button
                      onClick={() => {
                        web3Handler();
                      }}
                      variant="outline-light"
                    >
                      Connect Wallet
                    </Button>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
        <div>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
              <Spinner animation="border" style={{ display: "flex" }} />
              <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              {/* <Route path="/" element={<Home contract={contract} />} /> */}
              <Route path="/" element={<Home />} />
              {/* <Route path="/profile" element={<Profile contract={contract} />} /> */}
              <Route path="/profile" element={<Profile />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
