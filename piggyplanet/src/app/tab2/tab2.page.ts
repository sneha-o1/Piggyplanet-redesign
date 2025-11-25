import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LottieComponent, FooterComponent],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements AfterViewInit {
  @ViewChild('header', { read: ElementRef }) header!: ElementRef;

  bgGradient = this.makeGradient(0);
  isScrolled = false;

  lottieOptions: AnimationOptions = {
    path: 'assets/dancing-bear.json',
    loop: true,
    autoplay: true,
  };

  tasks = [
    {
      title: '🧹 Clean your room',
      description: 'Organize toys, make your bed, and vacuum the floor.',
      reward: 50,
      completed: false,
      waiting: false,
      color: '#FFE0B2',
      icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920229.png',
    },
    {
      title: '🍽 Do the dishes',
      description: 'Wash, dry, and put away all the dishes.',
      reward: 30,
      completed: false,
      waiting: false,
      color: '#B2EBF2',
      icon: 'https://cdn-icons-png.flaticon.com/512/3076/3076119.png',
    },
    {
      title: '👕 Help with laundry',
      description: 'Fold and put away your clothes neatly.',
      reward: 35,
      completed: false,
      waiting: false,
      color: '#C8E6C9',
      icon: 'https://cdn-icons-png.flaticon.com/512/679/679922.png',
    },
    {
      title: '🌿 Water the plants',
      description: 'Give your indoor plants a healthy drink.',
      reward: 20,
      completed: false,
      waiting: false,
      color: '#FFCDD2',
      icon: 'https://cdn-icons-png.flaticon.com/512/3039/3039333.png',
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      const headerEl = this.header.nativeElement;
      headerEl.style.setProperty('--border-radius', '0 0 24px 24px');
    }, 0);
  }

  onScroll(ev: any) {
    const top = ev?.detail?.scrollTop ?? 0;
    const t = Math.min(1, top / 500);
    this.bgGradient = this.makeGradient(t);
    this.isScrolled = top > 10;
  }

  makeGradient(t: number) {
    const h1 = Math.round(35 + (50 - 35) * t);
    const h2 = Math.round(30 + (45 - 30) * t);
    return `linear-gradient(180deg, hsl(${h1}, 90%, 8%), hsl(${h2}, 70%, 6%))`;
  }

  /* UPDATED LOGIC */
  markComplete(task: any) {
    if (!task.completed && !task.waiting) {
      task.waiting = true;
      alert('⏳ Task submitted! Waiting for parental confirmation.');
    }
  }

  openProfile() {
    alert('Profile feature coming soon!');
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log('Dancing bear animation created', animationItem);
  }
}
