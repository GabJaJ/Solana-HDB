import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent} from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { MatAnchor } from '@angular/material/button'
import { TransferModalComponent } from './transfer-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [
    //RouterOutlet, 
    //RouterLink,
    //DecimalPipe,
    MatAnchor,
    RouterModule, 
    HdWalletMultiButtonComponent,
  ],
  selector: 'solana-bootcamp-root',
  template: `
    <header class="py-8 relative">
      <h1 class="text-center text-5xl mb-4">My Bank</h1>

      

      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      @if (account()) {
        <div class= "absolute top-4 left-4 flex justify-center items-center gap2">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class="text-xl">{{ account()?.balance }}</p>
        </div>
      }

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['']" mat-raised-button>Home</a>
          </li>
          <li>
            <a [routerLink]="['settings']" mat-raised-button>Settings</a>
          </li>
          <li>
            <a [routerLink]="['balance']" mat-raised-button>Balance</a>
          </li>
        </ul>
      </nav>
    </header>

    <button (click)="onTransfer()">Transfer</button>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  private readonly _matDialog = inject(MatDialog);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true },
  );

  onTransfer() {

    this._matDialog.open(TransferModalComponent)
  }

}

