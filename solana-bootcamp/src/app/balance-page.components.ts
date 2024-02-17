import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { TransactionsSectionComponent } from './transaction-section.component';

@Component({
    selector: 'solana-bootcamp-balance-bootcamp',
    template: `
        <section class="px-24 py-32 bg-black bg-opacity-5 flex justify-center">
            <solana-bootcamp-balance-section></solana-bootcamp-balance-section>
        </section>
        <div class="flex justify-center gap-4">
            

            <solana-bootcamp-transactions-section></solana-bootcamp-transactions-section>
        </div>
    `,
    standalone: true,
    imports: [BalanceSectionComponent, TransactionsSectionComponent],
})

export class BalancePageComponent {}