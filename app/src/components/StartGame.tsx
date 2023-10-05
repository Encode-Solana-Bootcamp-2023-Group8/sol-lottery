import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, Transaction, TransactionInstruction, TransactionSignature, sendAndConfirmTransaction } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';
import { Provider,} from "@project-serum/anchor";

export const StartGame: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const { getUserSOLBalance } = useUserSOLBalanceStore();
    const programId = new PublicKey('3w5QAVGCLEBgxN1wJ2C19UuykJuJNVHTtC8uvZQ8JcAc'); // Replace with your program's ID

    async function createLottery(ticketPrice) {      
        // Define the instruction to call the create_lottery function
        const instruction = new TransactionInstruction({
          programId,
          keys: [
            { pubkey: publicKey, isSigner: true, isWritable: false },
            // { pubkey: lotteryAccount.publicKey, isSigner: false, isWritable: true },
          ],
          data: Buffer.from([0, ...ticketPrice.toBuffer()]), // Assuming create_lottery has an instruction index of 0
        });
      
        // Create and send the transaction
        const transaction = new Transaction().add(instruction);
        await sendAndConfirmTransaction(connection, transaction, []);
      
        console.log('Lottery created successfully!');
      }


    const onClick = useCallback(async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
            return;
        }

        let signature: TransactionSignature = '';

        try {
            await createLottery(1000000000);
        } catch (error: any) {
            notify({ type: 'error', message: `Lottery creation failed!`, description: error?.message, txid: signature });
            console.log('error', `Lottery creation failed! ${error?.message}`, signature);
        }
    }, [publicKey, connection, getUserSOLBalance]);

    return (

        <div className="relative group items-center">
            <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                    rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button 
                className="px-8 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                onClick={onClick}
                >Start Game</button>
        </div>

        
    );
};