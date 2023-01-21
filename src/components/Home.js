import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Form, Button, Card, ListGroup } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";

const tDb = require("../ipfs/twittDb");

// const Home = ({ contract }) => {
const Home = () => {
  const [post, setPost] = useState("");
  // const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    tDb.onready = () => {
      console.log(tDb.orbitDb.indentity.id);
    };
    tDb.create();
  });
  const uploadPost = async () => {
    if (!post) return window.alert("Cannot Twitt an Empty Thought!");
    // let hash;
    // // Upload post to IPFS
    // try {
    //   const result = await client.add(JSON.stringify({ post }));
    //   setLoading(true);
    //   hash = result.path;
    // } catch (error) {
    //   window.alert("ipfs upload error: ", error);
    // }
    // // upload post to blockchain
  };

  if (loading)
    return (
      <div className="text-center">
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading...</h2>
        </main>
      </div>
    );
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: "1000px" }}>
          <div className="content mx-auto">
            <Row className="g-3">
              <Form.Control onChange={(e) => setPost(e.target.value)} placeholder="Write out your thoughts" size="lg" required as="textarea" />
              <div className="d-grid px-0">
                <Button onClick={uploadPost} variant="primary" size="lg">
                  TwittIt!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>

      {/* <p>&nbsp;</p> */}
      <hr />
      <p className="my-auto">&nbsp;</p>
      <div className="text-center">
        <main style={{ padding: "1rem 0" }}>
          <h2>No posts yet</h2>
        </main>
      </div>
    </div>
  );
};

export default Home;
