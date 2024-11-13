import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ConnectionStore, injectPublicKey } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { TransferModalComponent } from './transfer-modal.component';
import { MatAnchor } from '@angular/material/button'


@Component({
  standalone: true,
  imports: [RouterOutlet, HdWalletMultiButtonComponent, MatAnchor,
            RouterModule],
  selector: 'solana-bootcamp-root',
  template: `
    <header class="py-8 relative">
      <h1 class="text-center text-5xl mb-4">My Bank Friend</h1>

      

      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      @if (account()) {
        <div class= "absolute top-4 left-4 flex justify-center items-center gap2">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class="font-bold">{{ account()?.balance }}</p>
        </div>
      }
    </header>

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

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent implements OnInit {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();
  private readonly _matDialog = inject(MatDialog);
  private readonly _connectionStore = inject(ConnectionStore);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
  );

  ngOnInit() {
    this._connectionStore.setEndpoint(this._shyftApiService.getEndpoint());
  }

  onTransfer() {
    this._matDialog.open(TransferModalComponent);
  }

}

