// backend/api/deploy-token.ts
import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';
import CustomTokenABI from '../../out/CustomToken.sol/CustomToken.json';

export async function POST(req: NextRequest) {
  const { name, symbol, supply } = await req.json();
  const provider = new ethers.providers.JsonRpcProvider(process.env.WORLDCHAIN_RPC_URL);
  const wallet = new ethers.Wallet(process.env.DEPLOYER_KEY!, provider);
  const factory = new ethers.ContractFactory(CustomTokenABI.abi, CustomTokenABI.bytecode, wallet);
  const contract = await factory.deploy(name, symbol, supply);
  await contract.deployed();
  return NextResponse.json({ address: contract.address });
}
