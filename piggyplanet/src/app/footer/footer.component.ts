import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit {

  currentYear: number = new Date().getFullYear();

  async ngAfterViewInit() {
    await this.loadLottieAnimation();
  }

  async loadLottieAnimation() {
    try {
      // Dynamically import lottie-web
      const lottie = await import('lottie-web');
      
      const container = document.getElementById('footer-animation-container');
      if (container) {
        lottie.default.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/assets/total-savings.json'
        });
      }
    } catch (error) {
      console.warn('Lottie animation could not be loaded:', error);
    }
  }
}