// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.0;

contract Tree {
    uint256 public Count = 0;

    struct User {
        address payable inviter;
        address payable self;
    }

    event Summary(
        address indexed member,
        address indexed inviter,
        address subscription,
        uint256 Count
    );

    event Payments(
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 Count
    );

    mapping(address => User) public tree;
    address payable public top;

    constructor() public {
        tree[msg.sender] = User(msg.sender, msg.sender);
        top = msg.sender;
    }

    function enter(address payable _inviter, address payable _subscription)
        public
        payable
    {
        require(msg.value >= 0.001610 ether, "Must be at least 0.001610 ether");
        require(
            tree[msg.sender].inviter == address(0),
            "Sender can't already exist in tree"
        );
        require(tree[_inviter].self == _inviter, "Inviter must exist");
        Count++;

        tree[msg.sender] = User(_inviter, msg.sender);

        bool sent = _subscription.send(msg.value);
        require(sent, "Failed to send Ether");

        emit Summary(msg.sender, _inviter, _subscription, Count);
    }

    function pay(address payable _member) public payable {
        Count++;
        bool sent = _member.send(msg.value);
        require(sent, "Failed to send Ether");

        emit Payments(msg.sender, _member, msg.value, Count);
    }
}
