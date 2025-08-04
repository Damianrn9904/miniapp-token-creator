// backend/api/confirm-transaction.ts
import { NextRequest, NextResponse } from 'next/server';
import { MiniAppSendTransactionSuccessPayload } from '@worldcoin/minikit-js';

export async function POST(req: NextRequest) {
  const { transaction_id } = (await req.json()) as MiniAppSendTransactionSuccessPayload;
  const resp = await fetch(
    `https://developer.worldcoin.org/api/v2/minikit/transaction/${transaction_id}?type=transaction`,
    { headers: { Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}` } }
  );
  const tx = await resp.json();
  return NextResponse.json(tx);
}
