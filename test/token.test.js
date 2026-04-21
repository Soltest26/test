const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
  let Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2] = await ethers.getSigners();

    token = await Token.deploy(1000);
  });

  it("should assign initial supply to owner", async function () {
    const ownerBalance = await token.balances(owner.address);
    expect(ownerBalance).to.equal(1000);
  });

  it("should transfer tokens correctly", async function () {
    await token.transfer(addr1.address, 100);
    const balance1 = await token.balances(addr1.address);
    expect(balance1).to.equal(100);
  });

  it("should fail when sender doesn’t have enough balance", async function () {
    await expect(
      token.connect(addr1).transfer(addr2.address, 50)
    ).to.be.revertedWith("Not enough balance");
  });

  it("should not allow transfer to zero address", async function () {
    await expect(
      token.transfer("0x0000000000000000000000000000000000000000", 100)
    ).to.be.reverted;
  });

  it("should emit Transfer event", async function () {
    await expect(token.transfer(addr1.address, 100))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, 100);
  });

  it("should track totalSupply", async function () {
    const supply = await token.totalSupply();
    expect(supply).to.equal(1000);
  });

  it("should allow owner to mint tokens", async function () {
    await token.mint(addr1.address, 200);
    const balance = await token.balances(addr1.address);
    expect(balance).to.equal(200);
  });

  it("should not allow non-owner to mint", async function () {
    await expect(
      token.connect(addr1).mint(addr1.address, 100)
    ).to.be.reverted;
  });

  it("should allow users to burn tokens", async function () {
    await token.burn(100);
    const balance = await token.balances(owner.address);
    expect(balance).to.equal(900);
  });

  it("should reduce totalSupply on burn", async function () {
    await token.burn(100);
    const supply = await token.totalSupply();
    expect(supply).to.equal(900);
  });
});