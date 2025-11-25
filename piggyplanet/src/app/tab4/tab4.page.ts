import { Component, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import lottie from 'lottie-web';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-tab4',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent],
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements AfterViewInit {
  bgGradient = this.makeGradient(0);
  isModalOpen = false;
  selectedLesson: any = null;
  safeVideoUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  lessons = [
    {
      title: '💰 What is Saving?',
      duration: '5 minutes',
      reward: 50,
      description: 'Learn the basics of saving money and why it matters.',
      color: '#FFD1DC',
      icon: '💰',
      fullContent:
        'Saving means putting away a little money instead of spending it right away. It helps you prepare for future goals like buying a toy or going on a trip. The earlier you start saving, the faster your money can grow!',
      extraPoints: [
        '⭐ Saving helps you feel proud and responsible for your money.',
        '💡 You can start saving even with small amounts — every coin counts!',
        '🪙 Keeping your savings safe in a bank helps it grow with interest.',
        '🎯 Make saving fun! Set goals and celebrate when you reach them.',
      ],
      videoUrl: 'https://www.youtube.com/embed/wXHQjScKPzc',
    },
    {
      title: '🎯 Why Set Goals?',
      duration: '5 minutes',
      reward: 50,
      description: 'Discover how goals help you save for what you want.',
      color: '#B2EBF2',
      icon: '🎯',
      fullContent:
        'Goals give your savings a purpose! When you set a goal — like buying a bike — you know exactly how much you need and how to reach it. Setting goals makes saving exciting and rewarding!',
      extraPoints: [
        '🌟 Goals help you make smart decisions before spending.',
        '🪙 A goal shows you how close you are to your dream!',
        '💪 Sticking to your goal builds patience and self-control.',
        '🎉 Reaching your goal feels amazing — you earned it!',
      ],
      videoUrl: 'https://www.youtube.com/embed/yXKc8pQ2d1Q',
    },
    {
      title: '🌱 What is Interest?',
      duration: '6 minutes',
      reward: 75,
      description: 'Learn how money can grow over time.',
      color: '#C8E6C9',
      icon: '🌱',
      fullContent:
        'Interest is like a reward for saving money. When you keep your money in a bank, the bank pays you extra coins (interest) for trusting them with your money. The longer you save, the more you earn!',
      extraPoints: [
        '💡 Interest means your money can work while you sleep!',
        '⭐ The more time you save, the more your coins multiply.',
        '🎯 Banks and investment plans can give different interest rates.',
        '🪴 Interest helps your small savings grow big over time!',
      ],
      videoUrl: 'https://www.youtube.com/embed/0n4EfjxU-1c',
    },
  ];

  ngAfterViewInit() {
    // Load all Lottie animations after view is ready
    this.loadAllAnimations();
  }

  loadAllAnimations() {
    // Header animations
    this.loadHeaderAnimations();
    
    // Card animations
    this.loadCardAnimations();
  }

  loadHeaderAnimations() {
    // Left header animation
    const leftHeaderContainer = document.getElementById('learn-header1-animation');
    if (leftHeaderContainer) {
      lottie.loadAnimation({
        container: leftHeaderContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/learn-header1.json'
      });
    }

    // Right header animation
    const rightHeaderContainer = document.getElementById('learn-header2-animation');
    if (rightHeaderContainer) {
      lottie.loadAnimation({
        container: rightHeaderContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/learn-header2.json'
      });
    }
  }

  loadCardAnimations() {
    // Card animations
    const cardAnimations = [
      { id: 'learn-card1-animation', path: '/assets/learn-card1.json' },
      { id: 'learn-card2-animation', path: '/assets/learn-card2.json' },
      { id: 'learn-card3-animation', path: '/assets/learn-card3.json' }
    ];

    cardAnimations.forEach(anim => {
      const container = document.getElementById(anim.id);
      if (container) {
        lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: anim.path
        });
      }
    });
  }

  // Load modal animation when modal opens
  loadModalAnimation(lessonIndex: number) {
    const animId = `modal-${lessonIndex}-animation`;
    const container = document.getElementById(animId);
    if (container) {
      // Clear any existing animation
      container.innerHTML = '';
      
      // Determine which animation to load based on lesson index
      const animationMap: { [key: number]: string } = {
        0: '/assets/learn-card1.json',
        1: '/assets/learn-card2.json',
        2: '/assets/learn-card3.json'
      };
      
      const animationPath = animationMap[lessonIndex] || '/assets/learn-card1.json';
      
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath
      });
    }
  }

  getLessonIndex(lesson: any): number {
    return this.lessons.findIndex(l => l.title === lesson?.title);
  }

  onScroll(ev: any) {
    const top = ev?.detail?.scrollTop ?? 0;
    const t = Math.min(1, top / 500);
    this.bgGradient = this.makeGradient(t);
  }

  makeGradient(t: number) {
    const h1 = Math.round(340 + (350 - 340) * t);
    const h2 = Math.round(320 + (340 - 320) * t);
    return `linear-gradient(180deg, hsl(${h1}, 70%, 10%), hsl(${h2}, 70%, 7%))`;
  }

  openLessonModal(lesson: any) {
    this.selectedLesson = lesson;
    this.isModalOpen = true;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(lesson.videoUrl);
    
    // Load modal animation after a short delay to ensure DOM is ready
    setTimeout(() => {
      const lessonIndex = this.getLessonIndex(this.selectedLesson);
      this.loadModalAnimation(lessonIndex);
    }, 100);
  }

  closeLessonModal() {
    this.isModalOpen = false;
    this.selectedLesson = null;
    this.safeVideoUrl = null;
  }

  openProfile() {
    alert('Profile feature coming soon!');
  }

  // Add the missing methods INSIDE the class
  getModalHeaderGradient(): string {
    if (!this.selectedLesson) return 'linear-gradient(135deg, #ff6b9d, #ff8ec7)';
    
    const colorMap: { [key: string]: string } = {
      '#FFD1DC': 'linear-gradient(135deg, #ff6b9d, #ff8ec7)',
      '#B2EBF2': 'linear-gradient(135deg, #4fc3f7, #80deea)',
      '#C8E6C9': 'linear-gradient(135deg, #66bb6a, #a5d6a7)'
    };
    
    return colorMap[this.selectedLesson.color] || 'linear-gradient(135deg, #ff6b9d, #ff8ec7)';
  }

  getPointColor(): string {
    if (!this.selectedLesson) return 'linear-gradient(135deg, #c8e6c9, #a5d6a7)';
    
    const colorMap: { [key: string]: string } = {
      '#FFD1DC': 'linear-gradient(135deg, #ffcdd2, #ef9a9a)',
      '#B2EBF2': 'linear-gradient(135deg, #b3e5fc, #81d4fa)',
      '#C8E6C9': 'linear-gradient(135deg, #c8e6c9, #a5d6a7)'
    };
    
    return colorMap[this.selectedLesson.color] || 'linear-gradient(135deg, #c8e6c9, #a5d6a7)';
  }
}