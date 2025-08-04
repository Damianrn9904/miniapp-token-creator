// frontend/components/CreateTokenForm.tsx
import { useState } from 'react';
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js';

export default function CreateTokenForm() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState(0);
  const [txId, setTxId] = useState<string>('');

  const handleCreate = async () => {
    // 1. Verificación World ID
    await MiniKit.commandsAsync.verify({ action: 'create-token', verification_level: VerificationLevel.Orb });
    // 2. Despliegue on-chain
    const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [{
        address: '0x4200000000000000000000000000000000000012', // factory :contentReference[oaicite:10]{index=10}
        abi: [{ /* sólo la firma de createERC20 */ }],
        functionName: 'createERC20',
        args: [name, symbol, supply.toString()],
      }],
    });
    if (finalPayload.status === 'success') {
      setTxId(finalPayload.transaction_id);
    }
  };

  // 3. Esperar a que confirme
  const { isSuccess } = useWaitForTransactionReceipt({
    client: createPublicClient({ chain: worldchain, transport: http(process.env.NEXT_PUBLIC_RPC_URL!) }),
    appConfig: { app_id: process.env.NEXT_PUBLIC_APP_ID! },
    transactionId: txId,
  });

  return (
    <div>
      <input placeholder="Nombre" onChange={e => setName(e.target.value)} />
      <input placeholder="Símbolo" onChange={e => setSymbol(e.target.value)} />
      <input type="number" placeholder="Supply" onChange={e => setSupply(+e.target.value)} />
      <button onClick={handleCreate}>Crear Token</button>
      {isSuccess && <p>✅ Token desplegado correctamente</p>}
    </div>
  );
}
