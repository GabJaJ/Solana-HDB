import { Component, inject } from '@angular/core';
import { ShyftApiService } from './shyft-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TransferModalComponent } from './transfer-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'solana-bootcamp-balance-section',
    imports: [MatTableModule, MatCard, MatButton],
    template: ` 
    <mat-card class="w-[500px] px-4 py-8">
        <h2 class="text-center text-3xl mb-4">Balance</h2>

        @if (!account()) {
            <p class="text-center">Conecta tu wallet para ver tu balance.</p>
        } @else {
            <div class="flex justify-center items-center gap-2 mb-4">
            <img [src]="account()?.info?.image" class="w-8 h-8" />
            <p class="text-xl">{{ account()?.balance }}</p>
            </div>

            <footer class="flex justify-center items-center gap-2">
                <button mat-raised-button color="primary" (click)="onTransfer()">
                Transferir fondos.
                </button>
            </footer>
        }

        

    </mat-card>
    <!--@if (Account3()) {
        <div class="flex items-center gap-2">
        <p class="text-xl">{{ Account3()?.info?.name }}</p>
        <p class="text-xl">{{ account3()?.balance }} Tokens</p>

        </div>
    }-->

    `,
    standalone: true,
})
export class BalanceSectionComponent {
    private readonly _matDialog = inject(MatDialog);
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);

    readonly account = computedAsync(() =>
        this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    );

    onTransfer() {

        this._matDialog.open(TransferModalComponent)
    }
}