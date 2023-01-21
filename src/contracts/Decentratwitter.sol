//SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21;

contract Decentratwitter {
    uint256 public tokenCount;
    uint256 public postCount;
    mapping(uint256 => Post) public posts;
    // address --> nft id
    mapping(address => uint256) public profiles;

    struct Post {
        uint256 id;
        string hash;
    }
}
