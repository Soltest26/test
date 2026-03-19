# Blockchain Smart Contract Fix & Implementation Test

## Scenario Overview
You are provided with a Git repository containing a partially implemented Solidity smart contract for a simple token system. The contract contains bugs, missing features, and failing tests.

Your mission is to:
- Fix existing bugs
- Implement missing functionalities
- Properly use Git to track your changes

---

## Git Environment Setup (Before Starting)
Run the following commands to clone the repository and configure Git:

```
git clone https://github.com/soltest26/test
cd test
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
git config core.hooksPath .githooks
git checkout -b fix/token-improvements
```

---

## Repository Structure
```
repo/
├── contracts/
│   └── Token.sol
├── test/
│   └── token.test.js
├── package.json
├── hardhat.config.js
└── README.md
```

---

## Known Issues in the Code
- No event emitted on transfer
- No check for zero address
- Missing totalSupply tracking
- No mint function
- No burn function

---

## Tasks

### ✅ Task 1: Fix Bugs
- Prevent transfers to `address(0)`
- Add necessary validations (e.g., sender has enough balance)
- Commit message:
  ```
  fix: prevent zero address transfer
  ```

### ✅ Task 2: Implement Missing Features
- Track `totalSupply`
- Emit `Transfer` event inside transfer functions
- Add `mint` function:
  - Only the deployer can call
  - Increases totalSupply
  - Updates recipient’s balance
- Add `burn` function:
  - Reduces sender’s balance
  - Decreases totalSupply
- Commit message:
  ```
  feat: add mint function
  ```

- Commit message:
  ```
  feat: add burn and totalSupply tracking
  ```

---

## Testing & Expected Behavior
Ensure the following:
- Transfers update balances correctly
- Transfer emits the event
- Mint increases total supply
- Burn decreases total supply
- Transfers to zero address fail

---

## Submission
- Push all your changes to your repository
- Provide the repository link.

---

