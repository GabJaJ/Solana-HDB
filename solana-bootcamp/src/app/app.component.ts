import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent} from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';

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
    <header class="px-16 pt-24 py-8">
      <h1 class="text-center text-5xl mb-4">My Bank</h1>

      

      <div class="flex justify-center">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      @if (account()) {
        <div class= "absolute top-4 left-4 flex justify-center items-center gap2">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class="text-xl>{{ account()?.balance }}</p>
        </div>


      }
    </header>

    <main></main>
  `,
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true },
  );

}

