import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section.component';
import { FeaturesSectionComponent } from './features-section.component';

@Component ({
    selector: 'solana-home-bootcamp',
    template: `
        <solana-hero-section></solana-hero-section>
        <solana-features-section></solana-features-section>
    `,
    standalone: true,
    imports: [HeroSectionComponent, FeaturesSectionComponent]
})

export class HomePageComponent{}