import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab5',
  standalone: true,
  imports: [IonicModule, CommonModule, FooterComponent, RouterLink],
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements AfterViewInit, OnDestroy {
  bgGradient = this.makeGradient(0);

  user: any = {
    name: 'Emma',
    age: 15,
    avatar: 'https://i.pravatar.cc/200?img=47',
    totalCoins: 8450,
    spentCoins: 3200,
    progress: 76,
  };

  private _userUpdatedHandler = () => this.loadUserFromStorage();

  ngAfterViewInit() {
    // load initial data and listen for updates
    this.loadUserFromStorage();
    this.loadAvatarAnimation();
    try {
      window.addEventListener('pp:userUpdated', this._userUpdatedHandler);
    } catch {}
  }

  ngOnDestroy() {
    try {
      window.removeEventListener('pp:userUpdated', this._userUpdatedHandler);
    } catch {}
  }

  loadAvatarAnimation() {
    // Load Lottie animation
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    document.head.appendChild(script);

    script.onload = () => {
      const container = document.getElementById('avatar-lottie');
      if (container) {
        const lottiePlayer = document.createElement('lottie-player');
        lottiePlayer.setAttribute('src', '/assets/avatar.json');
        lottiePlayer.setAttribute('background', 'transparent');
        lottiePlayer.setAttribute('speed', '1');
        lottiePlayer.setAttribute('style', 'width: 100%; height: 100%;');
        lottiePlayer.setAttribute('loop', '');
        lottiePlayer.setAttribute('autoplay', '');
        
        container.appendChild(lottiePlayer);
      }
    };
  }

  loadUserFromStorage() {
    try {
      const storedName = localStorage.getItem('userName');
      const storedAge = localStorage.getItem('userAge');
      const storedAvatar = localStorage.getItem('userAvatar');
      const storedTotal = localStorage.getItem('userTotalCoins');
      const storedSpent = localStorage.getItem('userSpentCoins');
      const storedProgress = localStorage.getItem('userProgress');

      if (storedName) this.user.name = storedName;
      if (storedAge) {
        const a = Number(storedAge);
        if (!isNaN(a)) this.user.age = a;
      }
      if (storedAvatar) this.user.avatar = storedAvatar;
      if (storedTotal) {
        const t = Number(storedTotal);
        if (!isNaN(t)) this.user.totalCoins = t;
      }
      if (storedSpent) {
        const s = Number(storedSpent);
        if (!isNaN(s)) this.user.spentCoins = s;
      }
      if (storedProgress) {
        const p = Number(storedProgress);
        if (!isNaN(p)) this.user.progress = p;
      }
    } catch (e) {
      // ignore
    }
  }

  onScroll(ev: any) {
    const top = ev?.detail?.scrollTop ?? 0;
    const t = Math.min(1, top / 500);
    this.bgGradient = this.makeGradient(t);
  }

  makeGradient(t: number) {
    const h1 = Math.round(330 + (340 - 330) * t);
    const h2 = Math.round(320 + (330 - 320) * t);
    return `linear-gradient(180deg, hsl(${h1}, 70%, 10%), hsl(${h2}, 70%, 7%))`;
  }

  // openSettings() {
  //   alert('⚙️ Settings page coming soon!');
  // }
}