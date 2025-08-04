// backend/api/verify.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyCloudProof } from '@worldcoin/minikit-js';

export async function POST(req: NextRequest) {
  const { proof, merkle_root, nullifier_hash, verification_level, action } = await req.json();
  const res = await verifyCloudProof({
    proof, merkle_root, nullifier_hash, verification_level, action
  });
  return NextResponse.json(res);
}
