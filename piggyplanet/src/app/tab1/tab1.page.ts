import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import lottie from 'lottie-web';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, FooterComponent],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements AfterViewInit, OnDestroy {
  @ViewChild('scratchCanvas', { static: false }) scratchCanvas!: ElementRef<HTMLCanvasElement>;

  // finance & goal
  savings = 1250;
  goal = 2000;
  age = 15;
  yearsLeft = 18 - this.age;

  // user details that come from AllDetails
  userName: string | null = null;
  parentalCodeStored: string | null = null;

  showAddModal = false;
  tempAmount = 0;
  reason = '';
  parentCode = '';

  bgGradient = this.makeGradient(0);
  piggyParallax = 'translateY(0px)';

  // Flip card and scratch card variables
  isCardFlipped = false;
  isScratched = false;
  isScratching = false;
  scratchPercentage = 0;
  currentPrize: any = {};

  // Available prizes
  prizes = [
    { icon: '💰', title: 'Coin Bonus!', description: 'You found some extra coins!', coins: 50 },
    { icon: '🎉', title: 'Chore Pass!', description: 'No chores for you today!', coins: 0 },
    { icon: '⭐', title: 'Bonus Streak!', description: 'Your streak is protected today!', coins: 0 },
    { icon: '🎯', title: 'Goal Boost!', description: 'Your goal progress got a boost!', coins: 25 },
    { icon: '😔', title: 'Better Luck Next Time!', description: 'No prize this time, try again tomorrow!', coins: 0 },
    { icon: '🏆', title: 'Jackpot!', description: 'You hit the jackpot!', coins: 100 },
    { icon: '🤝', title: 'Parent Bonus!', description: 'Your parent matched your savings!', coins: 75 },
    { icon: '🌟', title: 'Lucky Star!', description: 'The stars are shining on you!', coins: 30 }
  ];

  // handlers for events
  private _ppUpdateHandler = () => this.loadSharedData();
  private _userUpdatedHandler = () => this.loadUserDetails();

  ngAfterViewInit() {
    // Initialize all animations after view is ready
    this.loadLogoAnimation();
    this.loadAddMoneyAnimation();
    this.loadSetGoalAnimation();
    this.loadEarnAnimation();
    this.loadPiggyAnimation();
    this.loadAvatarAnimation();
    this.loadStreakAnimation();
    this.loadProgressAnimation();
    this.loadUntil18Animation();

    // Initialize scratch card
    setTimeout(() => {
      this.initializeScratchCard();
    }, 1000);

    // load shared data from storage
    this.loadSharedData();
    this.loadUserDetails();

    // listen for updates from other pages/components
    try {
      window.addEventListener('pp:updated', this._ppUpdateHandler);
      window.addEventListener('pp:userUpdated', this._userUpdatedHandler);
    } catch (e) {
      // ignore
    }
  }

  ngOnDestroy() {
    try {
      window.removeEventListener('pp:updated', this._ppUpdateHandler);
      window.removeEventListener('pp:userUpdated', this._userUpdatedHandler);
    } catch (e) {}
  }

  /**
   * Load shared application data saved by the Set-Goal page.
   * - Reads 'pp_balance' and 'pp_goals' from localStorage
   */
  loadSharedData() {
    try {
      const savedBalance = localStorage.getItem('pp_balance');
      const savedGoals = localStorage.getItem('pp_goals');

      if (savedBalance) {
        const val = Number(savedBalance);
        if (!isNaN(val)) {
          this.savings = val;
        }
      }

      if (savedGoals) {
        try {
          const goals = JSON.parse(savedGoals);
          if (Array.isArray(goals) && goals.length > 0) {
            const totalTarget = goals.reduce((t: number, g: any) => t + (Number(g.target) || 0), 0);
            if (totalTarget > 0) {
              this.goal = totalTarget;
            }
          }
        } catch (e) {
          // ignore
        }
      }
    } catch (e) {
      // ignore localStorage issues
    }
  }

  /**
   * Load user details (name, age, parentalCode) stored by AllDetails page.
   * This is called on init and whenever pp:userUpdated is dispatched.
   */
  loadUserDetails() {
    try {
      const storedName = localStorage.getItem('userName');
      const storedAge = localStorage.getItem('userAge');
      const storedParCode = localStorage.getItem('parentalCode');

      if (storedName) {
        this.userName = storedName;
      }
      if (storedAge) {
        const a = Number(storedAge);
        if (!isNaN(a)) {
          this.age = a;
          this.yearsLeft = Math.max(0, 18 - a);
        }
      }
      if (storedParCode) {
        this.parentalCodeStored = storedParCode;
      }
    } catch (e) {
      // ignore
    }
  }

  // Flip card function
  flipCard() {
    this.isCardFlipped = !this.isCardFlipped;
    if (this.isCardFlipped && !this.isScratched) {
      this.generateRandomPrize();
    }
  }

  // Generate random prize
  generateRandomPrize() {
    const randomIndex = Math.floor(Math.random() * this.prizes.length);
    this.currentPrize = { ...this.prizes[randomIndex] };
  }

  // Initialize scratch card
  initializeScratchCard() {
    if (!this.scratchCanvas?.nativeElement) return;

    const canvas = this.scratchCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 280;
    canvas.height = 180;

    // Draw scratch layer
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch card pattern
    ctx.fillStyle = '#ff8e8e';
    for (let i = 0; i < canvas.width; i += 20) {
      for (let j = 0; j < canvas.height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.fillRect(i, j, 10, 10);
        }
      }
    }

    // Add text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);
    ctx.font = '12px Arial';
    ctx.fillText('👆 Use your finger to scratch', canvas.width / 2, canvas.height / 2 + 20);
  }

  // Start scratching
  startScratching(event: any) {
    this.isScratching = true;
    this.scratch(event);
  }

  // Scratch function
  scratch(event: any) {
    if (!this.isScratching || this.isScratched) return;

    const canvas = this.scratchCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
    const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;

    // Clear a circle around the touch point
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratched percentage
    this.calculateScratchedPercentage();
  }

  // Calculate how much is scratched
  calculateScratchedPercentage() {
    const canvas = this.scratchCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    this.scratchPercentage = (transparentPixels / (pixels.length / 4)) * 100;

    // If ~20% is scratched, reveal the prize
    if (this.scratchPercentage > 20 && !this.isScratched) {
      this.isScratched = true;
      this.revealPrize();
    }
  }

  // Reveal prize and add coins if any
  revealPrize() {
    if (this.currentPrize.coins) {
      this.savings += this.currentPrize.coins;
      // persist to storage for cross-tab consistency
      try {
        localStorage.setItem('pp_balance', String(this.savings));
        // notify others
        window.dispatchEvent(new Event('pp:updated'));
      } catch (e) {}
    }

    // Show celebration
    setTimeout(() => {
      if (this.currentPrize.coins) {
        alert(`🎉 Congratulations! You won ${this.currentPrize.coins} coins!`);
      } else {
        alert(`🎉 ${this.currentPrize.title}`);
      }
    }, 500);
  }

  // Reset scratch card
  resetScratchCard() {
    this.isScratched = false;
    this.scratchPercentage = 0;
    this.initializeScratchCard();
    this.flipCard();
  }

  // End scratching
  endScratching() {
    this.isScratching = false;
  }

  // Add event listeners for mouse/touch end
  onMouseUp() {
    this.endScratching();
  }

  onTouchEnd() {
    this.endScratching();
  }

  // Existing animation loading methods...
  loadLogoAnimation() {
    const logoContainer = document.getElementById('logo-container');
    if (logoContainer) {
      lottie.loadAnimation({
        container: logoContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/logo.json'
      });
    }
  }

  loadAddMoneyAnimation() {
    const addMoneyContainer = document.getElementById('add-money-animation');
    if (addMoneyContainer) {
      lottie.loadAnimation({
        container: addMoneyContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/add money.json'
      });
    }
  }

  loadSetGoalAnimation() {
    const setGoalContainer = document.getElementById('set-goal-animation');
    if (setGoalContainer) {
      lottie.loadAnimation({
        container: setGoalContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/sat-goal.json'
      });
    }
  }

  loadEarnAnimation() {
    const earnContainer = document.getElementById('earn-animation');
    if (earnContainer) {
      lottie.loadAnimation({
        container: earnContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/earn.json'
      });
    }
  }

  loadPiggyAnimation() {
    const piggyContainer = document.getElementById('piggy-animation');
    if (piggyContainer) {
      lottie.loadAnimation({
        container: piggyContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/piggy.json'
      });
    }
  }

  loadAvatarAnimation() {
    const avatarContainer = document.getElementById('avatar-animation');
    if (avatarContainer) {
      lottie.loadAnimation({
        container: avatarContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/avatar.json'
      });
    }
  }

  loadStreakAnimation() {
    const streakContainer = document.getElementById('streak-animation');
    if (streakContainer) {
      lottie.loadAnimation({
        container: streakContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/streak.json'
      });
    }
  }

  loadProgressAnimation() {
    const progressContainer = document.getElementById('progress-animation');
    if (progressContainer) {
      lottie.loadAnimation({
        container: progressContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/progress.json'
      });
    }
  }

  loadUntil18Animation() {
    const until18Container = document.getElementById('until18-animation');
    if (until18Container) {
      lottie.loadAnimation({
        container: until18Container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/untill18.json'
      });
    }
  }

  onScroll(ev: any) {
    const top = ev?.detail?.scrollTop ?? 0;
    const max = 600;
    const t = Math.min(1, top / max);
    this.bgGradient = this.makeGradient(t);
    this.piggyParallax = `translateY(${Math.round(-t * 12)}px)`;
  }

  makeGradient(t: number) {
    const h1 = Math.round(260 + (40 - 260) * t);
    const h2 = Math.round(220 + (10 - 220) * t);
    return `linear-gradient(180deg, hsl(${h1} 60% ${10 + t * 6}%), hsl(${h2} 60% ${6 + t * 4}%))`;
  }

  get percentFull() {
    return Math.min(100, Math.round((this.savings / this.goal) * 100));
  }

  openAddMoneyModal() { this.showAddModal = true; }
  closeAddMoneyModal() {
    this.showAddModal = false;
    this.tempAmount = 0;
    this.reason = '';
    this.parentCode = '';
  }

  confirmAddMoney() {
    // read parental code stored by AllDetails (fallback to previously stored or default '1234')
    const mockParentCode = this.parentalCodeStored || localStorage.getItem('parentalCode') || '1234';
    if (!this.tempAmount || this.tempAmount <= 0) {
      alert('Please enter an amount greater than zero.');
      return;
    }
    if (this.parentCode !== mockParentCode) {
      alert('Invalid parental code.');
      return;
    }
    this.savings += Math.round(this.tempAmount);

    // persist and notify (so SetGoal UI also sees updated balance)
    try {
      localStorage.setItem('pp_balance', String(this.savings));
      window.dispatchEvent(new Event('pp:updated'));
    } catch (e) {}

    alert(`₹${this.tempAmount} deposited for "${this.reason}". 🎉`);
    this.closeAddMoneyModal();
  }

  setGoal() {}
  viewTasks() {}
  openProfile() { alert('Profile coming soon!'); }
}
