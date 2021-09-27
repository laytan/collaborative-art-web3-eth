// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RentASpot {

    struct Image {
        string image;
        uint x;
        uint y;
    }

    mapping (uint => Image) public images;
    uint public length = 0;
    
    function rent(string memory _image, uint _x, uint _y) public {
        images[length] = Image(_image, _x, _y);
        length++;
    }

}