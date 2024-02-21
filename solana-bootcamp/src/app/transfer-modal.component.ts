import { Component } from '@angular/core';
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';

@Component({
    selector: 'solana-bootcamp-transfer-modal',
    template: ` 
    <div class="px-8 pt-16 pb-8">
        <h2 class="text-3xl text-center mb-8">Transferir Fondos</h2> 

        <solana-bootcamp-transfer-form (submitForm)= "onTransfer($event)"></solana-bootcamp-transfer-form>

    </div>
    
    `,
    standalone: true,
    imports: [TransferFormComponent]
})

export class TransferModalComponent {
    onTransfer(payload: TransferFormPayload) {
        console.log('Hola Mundo!', payload);
    }
}