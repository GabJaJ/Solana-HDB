import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section.component';
import { FeaturesSectionComponent } from './features-section.component';

@Component ({
    selector: 'solana-bootcamp-home-bootcamp',
    template: `
        <solana-bootcamp-hero-section></solana-bootcamp-hero-section>
        <solana-bootcamp-features-section></solana-bootcamp-features-section>
    `,
    standalone: true,
    imports: [HeroSectionComponent, FeaturesSectionComponent]
})

export class HomePageComponent{}