import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'solana-bootcamp-hero-section',
    template: `
    <section class="px-24 py-32 bg-black bg-opacity-5">
        <p class="text-center text-3xl">Este es el Hero.</p>
    </section>
    `,
    standalone: true,
})

export class HeroSectionComponent {}