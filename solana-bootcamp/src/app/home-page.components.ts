import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section.component';
import { FeaturesSectionComponent } from './features-section.component';
import { BalanceSectionComponent } from './balance-section.components';

@Component ({
    selector: 'solana-bootcamp-home-bootcamp',
    template: `
        <solana-bootcamp-hero-section></solana-bootcamp-hero-section>
        <solana-bootcamp-features-section></solana-bootcamp-features-section>
        <solana-bootcamp-balance-section></solana-bootcamp-balance-section>
    `,
    standalone: true,
    imports: [HeroSectionComponent, FeaturesSectionComponent, BalanceSectionComponent]
})

export class HomePageComponent{}