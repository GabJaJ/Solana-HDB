import { Component, computed, inject } from '@angular/core';
import { 
    TransferFormComponent, 
    TransferFormPayload } from './transfer-form.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { injectPublicKey, injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { MatDialogRef } from '@angular/material/dialog';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';


//[tokens]="allTokens() ?? []"
@Component({
    selector: 'solana-bootcamp-transfer-modal',
    template: ` 
    <div class="px-8 pt-16 pb-8">
        <h2 class="text-3xl text-center mb-8">Transferir Fondos</h2> 
        
        <solana-bootcamp-transfer-form 
            [disabled]="isRunning()"
            
            (sendTransfer)="onSendTransfer($event)"
            (cancelTransfer)="onCancelTransfer()"
            
        ></solana-bootcamp-transfer-form>

        @if (isRunning()) {
            <div
                class="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4"
            >
            <mat-progress-spinner
                    color="primary"
                    mode="indeterminate"
                    diameter="64"
                ></mat-progress-spinner>
                <p class="capitalize text-xl">{{ transactionStatus() }}...</p>
        </div>
        }


    </div>
    
    `,
    standalone: true,
    imports: [MatProgressSpinner, TransferFormComponent]
})

export class TransferModalComponent {
isRunning(): boolean {
throw new Error('Method not implemented.');
}
    private readonly _matDialogRef = inject(MatDialogRef);
    private readonly _matSnackBar = inject(MatSnackBar);
    private readonly _transactionSender = injectTransactionSender();
    private readonly _publicKey = injectPublicKey();
    private readonly _shyftApiService = inject(ShyftApiService);


    readonly transactionStatus = computed(() => this._transactionSender().status);
    readonly isRuning = computed (
        () => 
        this.transactionStatus() === 'sending' ||
        this.transactionStatus() === 'confirming' ||
        this.transactionStatus() === 'finalizing',
    );
    //readonly allTokens = computedAsync(() => this._shyftApiService.getAllTokens(this._publicKey()?.toBase58()),
    //);

    onSendTransfer(payload: TransferFormPayload) {
        this._matDialogRef.disableClose = true;

        this._transactionSender
        .send(({ publicKey }) =>
            createTransferInstructions({
            senderAddress: publicKey.toBase58(),
            receiverAddress: payload.receiver,
            mintAddress: payload.mintAddress,
            amount: payload.amount,
            fundReceiver: true,
            memo: payload.memo,
        }),
        )

        .subscribe({
            next: (signature) => {
                console.log(
                    'Transaccion enviada satisfactoriamente!. Ver explorador: ',
                );
                this._matSnackBar.open(
                    'Transaccion enviada satisfactoriamente!.',
                    'Cerrar',
                    {
                        duration:4000,
                        horizontalPosition: 'end',
                    },

                )
            }
        })


    }
    

    onTransfer(payload: TransferFormPayload) {
        this._transactionSender
            .send(({ publicKey }) => 
                createTransferInstructions({
                    amount: payload.amount,
                    mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
                    receiverAddress: payload.receiver,
                    senderAddress: publicKey.toBase58(),
                    fundReceiver: true,
                    memo:payload.memo,
                }),
            )
            .subscribe({
                next: (signature) => {
                        console.log(
                        `🎉 Transacción enviada satisfactoriamente. Ver explorador: https://explorer.solana.com/tx/${signature}`,
                        );
                        this._matSnackBar.open(
                        '🎉 Transacción enviada satisfactoriamente.',
                        'Cerrar',
                        {
                            duration: 4000,
                            horizontalPosition: 'end',
                        },
                        );
                        this._matDialogRef.close();
                    },
                    error: (error) => {
                        console.error(error);
                        this._matSnackBar.open(
                        '🚨 Hubo un error enviando transacción.',
                        'Cerrar',
                        {
                            duration: 4000,
                            horizontalPosition: 'end',
                        },
                        );
                    },
                    complete: () => (this._matDialogRef.disableClose = false),
                });
            }
                onCancelTransfer() {
                    this._matDialogRef.close();

    }
}