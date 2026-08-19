import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent
  ]
})
export class LandingPage implements AfterViewInit, OnDestroy {

  surpriseRevealed = false;
  showEggMessage = false;

  private animations: AnimationItem[] = [];
  private observer?: IntersectionObserver;
  private eggTimer?: ReturnType<typeof setTimeout>;
  private surpriseRewardTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    /*
     * Wait for Ionic/Angular to finish rendering the page
     * before initializing Lottie animations and observers.
     */
    setTimeout(() => {
      this.loadAnimations();
      this.setupRevealAnimations();
    }, 100);
  }

  /**
   * Load one Lottie animation.
   */
  private loadAnimation(
    elementId: string,
    animationPath: string,
    loop = true,
    autoplay = true
  ): AnimationItem | undefined {

    const container = document.getElementById(elementId);

    if (!container) {
      console.warn(
        `[PiggyPlanet] Lottie container not found: ${elementId}`
      );
      return undefined;
    }

    /*
     * Prevent accidental duplicate animations if this method
     * is called more than once for the same DOM container.
     */
    if (container.dataset['lottieLoaded'] === 'true') {
      return undefined;
    }

    container.dataset['lottieLoaded'] = 'true';

    const animation = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop,
      autoplay,
      path: `/assets/${animationPath}`
    });

    this.animations.push(animation);

    return animation;
  }

  /**
   * Load all landing-page animations.
   */
  private loadAnimations(): void {

    // -------------------------
    // HEADER
    // -------------------------

    this.loadAnimation(
      'landing-logo-animation',
      'logo.json'
    );

    // -------------------------
    // HERO
    // -------------------------

    this.loadAnimation(
      'landing-piggy-animation',
      'piggy.json'
    );

    this.loadAnimation(
      'landing-goal-animation',
      'goal-header.json'
    );

    this.loadAnimation(
      'landing-streak-animation',
      'streak.json'
    );

    // -------------------------
    // PRODUCT PREVIEW
    // -------------------------

    this.loadAnimation(
      'window-logo-animation',
      'logo.json'
    );

    this.loadAnimation(
      'coins-animation',
      'piggycoins.json'
    );

    this.loadAnimation(
      'dashboard-streak-animation',
      'streak.json'
    );

    this.loadAnimation(
      'dashboard-progress-animation',
      'progress.json'
    );

    // -------------------------
    // DAILY SURPRISE
    // -------------------------

    this.loadAnimation(
      'surprise-animation',
      'piggycoins.json'
    );

    // -------------------------
    // HOW IT WORKS
    // -------------------------

    this.loadAnimation(
      'goal-step-animation',
      'sat-goal.json'
    );

    this.loadAnimation(
      'save-step-animation',
      'save-money.json'
    );

    this.loadAnimation(
      'earn-step-animation',
      'earn.json'
    );

    // -------------------------
    // PRINCIPLES
    // -------------------------

    this.loadAnimation(
      'progress-principle-animation',
      'progress.json'
    );

    this.loadAnimation(
      'reward-principle-animation',
      'piggycoins.json'
    );

    // -------------------------
    // FINAL CTA
    // -------------------------

    this.loadAnimation(
      'cta-piggy-animation',
      'piggy.json'
    );

    // -------------------------
    // FOOTER
    // -------------------------

    this.loadAnimation(
      'footer-pig-animation',
      'logo.json'
    );
  }

  /**
   * Reveal sections when they enter the viewport.
   */
  private setupRevealAnimations(): void {

    const elements = document.querySelectorAll('.reveal');

    if (!elements.length) {
      return;
    }

    /*
     * If the browser does not support IntersectionObserver,
     * simply show all content.
     */
    if (!('IntersectionObserver' in window)) {
      elements.forEach(element => {
        element.classList.add('is-visible');
      });

      return;
    }

    this.observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add('is-visible');

            this.observer?.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach(element => {
      this.observer?.observe(element);
    });
  }

  /**
   * Daily Surprise interaction.
   */
  revealSurprise(): void {

    if (this.surpriseRevealed) {
      return;
    }

    this.surpriseRevealed = true;

    /*
     * Angular needs to render the revealed reward container
     * before Lottie can attach to it.
     */
    this.surpriseRewardTimer = setTimeout(() => {

      const rewardContainer =
        document.getElementById('reward-animation');

      if (!rewardContainer) {
        return;
      }

      /*
       * The container is newly created by *ngIf,
       * so mark it before loading.
       */
      rewardContainer.dataset['lottieLoaded'] = 'true';

      const rewardAnimation = lottie.loadAnimation({
        container: rewardContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/earn.json'
      });

      this.animations.push(rewardAnimation);

    }, 50);
  }

  /**
   * Small hidden PiggyPlanet easter egg.
   */
  handleLogoClick(): void {

    this.showEggMessage = true;

    if (this.eggTimer) {
      clearTimeout(this.eggTimer);
    }

    this.eggTimer = setTimeout(() => {
      this.showEggMessage = false;
    }, 2500);
  }

  ngOnDestroy(): void {

    if (this.surpriseRewardTimer) {
      clearTimeout(this.surpriseRewardTimer);
    }

    if (this.eggTimer) {
      clearTimeout(this.eggTimer);
    }

    this.observer?.disconnect();

    this.animations.forEach(animation => {
      try {
        animation.destroy();
      } catch {
        // Ignore already-destroyed animations.
      }
    });

    this.animations = [];
  }
}