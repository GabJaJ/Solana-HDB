import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, tap,  of } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class ShyftApiService {
    private readonly _httpClient : HttpClient = inject(HttpClient);
    private readonly _Key = 'QobHfFkMqo307X2S';
    private readonly _header = { 'x-api-key': this._Key};
    private readonly _mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';

    getEndpoint() {
        const url = new URL('https://rpc.shyft.to');

        url.searchParams.set('api_key', this._Key);

        return url.toString();
    }
    
    getAccount(publicKey: string | undefined | null) {
        if (!publicKey) {
            return of(null);
        }
        
        const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey);
        url.searchParams.set('token', this._mint);

        return this._httpClient
        .get<{ 
            result: { balance: number; info: { image: string } };
    }>(url.toString(), { headers: this._header })
    .pipe(map((response) => response.result));
    }

    getTransactions(publicKey: string | undefined | null) {
        if (!publicKey) {
            return of(null);
        }
    
        const url = new URL('https://api.shyft.to/sol/v1/transaction/history');
    
        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('account', publicKey);
        url.searchParams.set('tx_num', '5');
    
        return this._httpClient
            .get<{ result: { status: string; type: string; timestamp: string; actions: any[] }[] }>(
            url.toString(),
            {
                headers: this._header,
            },
            )
            .pipe(
                tap((response) => {
                    response.result.map((transaction) => {
                        if (transaction.type === 'TOKEN_TRANSFER') {
                            
                            return {
                                amount: transaction.actions[0].info.amount,
                                status: transaction.status,
                                timestamp: transaction.timestamp,
                                type: transaction.type,

                                // ...
                            }
                        } else {
                            return transaction;
                        }
                    });
                }),
                map((response) => response.result),
            );
        }

    
}

@Injectable({ providedIn: 'root' })
export class tokenusdc {
    private readonly _httpClient = inject(HttpClient);
    private readonly _header = { 'x-api-key': 'QobHfFkMqo307X2S' };
    private readonly _mint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
    getAccount1(publicKey1: string | undefined | null) {

        if (!publicKey1) {
            return of(null);
        }

        const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey1);
        url.searchParams.set('token', this._mint)

        return this._httpClient.get<{
            result: { balance: number; info: { image: string; name: string; timestamp: string } };
        }>(url.toString(), { headers: this._header })
            .pipe(map((response) => response.result));
    }
}

@Injectable({ providedIn: 'root' })
export class solBalance {
    private readonly _httpClient = inject(HttpClient);
    private readonly _header = { 'x-api-key': 'QobHfFkMqo307X2S' };
    getAccount2(publicKey2: string | undefined | null) {

        if (!publicKey2) {
            return of(null);
        }

        const url = new URL('https://api.shyft.to/sol/v1/wallet/balance');

        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey2);


        return this._httpClient.get<{
            result: { balance: number };
        }>(url.toString(), { headers: this._header })
            .pipe(map((response) => response.result));
    }
}

@Injectable({ providedIn: 'root' })
export class ActivityWallet {
    private readonly _httpClient = inject(HttpClient);
    private readonly _header = { 'x-api-key': 'QobHfFkMqo307X2S' };
    getAccount3(publicKey3: string | undefined | null) {

        if (!publicKey3) {
            return of(null);
        }

        const url = new URL('https://api.shyft.to/sol/v1/transaction/history');

        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey3);


        return this._httpClient.get<{
            result: { blocktime: string };}>
            (url.toString(), 
            { 
                headers: this._header 
            },
        )
        .pipe(map((response) => response.result));
    }
}

//getTransactionHistory(publicKey: string | undefined | null) {
//        if (!publicKey) {
//            return of(null);
//        }
        
//        const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

//        url.searchParams.set('network', 'mainnet-beta');
//        url.searchParams.set('wallet', publicKey);
//        url.searchParams.set('token', this._mint);

//        return this._httpClient
//        .get<{ 
//            result: { balance: number; info: { image: string } };
//    }>(url.toString(), { headers: this._header })
//    .pipe(map((response) => response.result));
//    }
//}
