import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent} from '@heavy-duty/wallet-adapter-material';



@Component({
  standalone: true,
  imports: [
    //RouterOutlet, 
    //RouterLink,
    //DecimalPipe,
    //MatAnchor,
    RouterModule, 
    HdWalletMultiButtonComponent,
  ],
  selector: 'solana-bootcamp-root',
  template: `
    <header class="px-16 pt-24 pb-8">
      <h1 class="text-center text-5xl mb-4">My Bank</h1>

      @if (account()) {
        <div class="absolute top-4 left-4 flex items-center gap-2">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class="text - 2xl font-bold">
            {{account()?.balance | number }}
          </p>
        </div>
      }

      <div class="flex justify-center">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>
    </header>

    <main></main>
    `,
})
export class AppComponent {
  //private readonly _shyftApiService = inject(ShyftApiService);
  //private readonly _walletStore = inject(WalletStore);
  //private readonly _publicKey = transferableAbortSignal(this._walletStore.publicKeys);

  //readonly account = computedAsync(
  //  () = this._shyftApiService.getAcount(this._publicKey()?.toBase58()),
  //  { requireSync: true },
  //)

}

