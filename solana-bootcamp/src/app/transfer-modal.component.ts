import { Component, OnInit } from '@angular/core';
import { TransferFormComponent } from './transfer-form.component';

@Component({
    selector: 'solana-bootcamp-transfer-modal',
    template: ` 
    <div class="px-8 py-16">
        <h2 class="text-3xl">Transferir Fondos</h2> 

        <solana-bootcamp-transfer-form></solana-bootcamp-transfer-form>

    </div>
    
    `,
    standalone: true,
    imports: [TransferFormComponent]
})

export class TransferModalComponent {
    
}