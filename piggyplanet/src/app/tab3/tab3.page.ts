import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonLabel, IonInput, IonItem, 
} from '@ionic/angular/standalone';
import lottie from 'lottie-web';
import { FooterComponent } from '../footer/footer.component';

interface UserInvestment {
  id: string;
  investmentId: string;
  amount: number;
  startDate: Date;
  lastGrowthUpdate: Date;
  totalGrowth: number;
}

interface InvestmentOption {
  id: string;
  name: string;
  description: string;
  interestRate: number;
  theme: string;
  minInvestment: number;
  maxInvestment: number;
}

@Component({
  selector: 'app-tab3',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonLabel,
    IonInput,
    IonItem,
    FooterComponent
  ],
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss']
})
export class Tab3Page implements OnInit, AfterViewInit {
  @ViewChild('autoScrollRow') autoScrollRow!: ElementRef<HTMLDivElement>;

  balance = 1250;
  bgGradient = this.makeGradient(0);
  isModalOpen = false;
  selectedInvestment: any = null;
  investmentAmount = 0;
  userInvestments: UserInvestment[] = [];

  investmentOptions: InvestmentOption[] = [
    { 
      id: 'eco-forest', 
      name: 'Eco Forest', 
      description: 'Grow your money with nature! Plant virtual trees and watch your coins blossom like spring flowers! 🌳', 
      interestRate: 5, 
      theme: 'eco-forest',
      minInvestment: 10,
      maxInvestment: 500
    },
    { 
      id: 'tech-planet', 
      name: 'Tech Planet', 
      description: 'Invest in future technology. Ride the rocket of innovation to digital wealth! 🚀', 
      interestRate: 8, 
      theme: 'tech-planet',
      minInvestment: 20,
      maxInvestment: 1000
    },
    { 
      id: 'magic-kingdom', 
      name: 'Magic Kingdom', 
      description: 'Magical investments await! Where coins multiply like rabbits in a hat! 🎩', 
      interestRate: 12, 
      theme: 'magic-kingdom',
      minInvestment: 50,
      maxInvestment: 2000
    },
    { 
      id: 'dream-studio', 
      name: 'Dream Studio', 
      description: 'Support creativity and dreams! Turn imagination into coin-treasure! ✨', 
      interestRate: 7, 
      theme: 'dream-studio',
      minInvestment: 15,
      maxInvestment: 800
    },
    { 
      id: 'space-explorer', 
      name: 'Space Explorer', 
      description: 'Reach for the stars! Your coins will orbit and multiply in the cosmic bank! 🌌', 
      interestRate: 10, 
      theme: 'space-explorer',
      minInvestment: 30,
      maxInvestment: 1500
    }
  ];

  investmentTips = [
    { title: 'Save & Grow 🌱', text: 'Even a tiny seed can grow into a mighty tree — same with coins!', color: 'tip1' },
    { title: 'Invest Smart 💡', text: 'Don\'t put all coins in one planet! Diversify!', color: 'tip2' },
    { title: 'Patience Pays ⏳', text: 'Great returns take time. Be patient!', color: 'tip3' },
    { title: 'Cosmic Coins 🚀', text: 'Your coins can orbit and multiply in space!', color: 'tip4' },
    { title: 'Funny Fact 😂', text: 'A piggybank never lies — it only squeals with joy!', color: 'tip5' }
  ];

  ngOnInit() {
    this.loadUserData();
    this.startGrowthSimulation();
  }

  ngAfterViewInit() {
    this.loadAllAnimations();
    this.startAutoScroll();
  }

  loadAllAnimations() {
    // Header animations
    this.loadHeaderAnimation();
    this.loadInvestmentHeaderAnimation();
    
    // Main investment animation
    this.loadMainInvestmentAnimation();
    
    // Balance card animation
    this.loadPiggyCoinsAnimation();
    
    // Investment card animations
    this.loadInvestmentCardAnimations();
    
    // Tips animations
    this.loadTipsAnimations();
  }

  loadHeaderAnimation() {
    const animContainer = document.getElementById('invest-header-animation');
    if (animContainer) {
      lottie.loadAnimation({
        container: animContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/invest.json'
      });
    }
  }

  loadInvestmentHeaderAnimation() {
    const animContainer = document.getElementById('investment-header-animation');
    if (animContainer) {
      lottie.loadAnimation({
        container: animContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/investment-header.json'
      });
    }
  }

  loadMainInvestmentAnimation() {
    const animContainer = document.getElementById('invest-main-animation');
    if (animContainer) {
      lottie.loadAnimation({
        container: animContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/invest-main.json'
      });
    }
  }

  loadPiggyCoinsAnimation() {
    const animContainer = document.getElementById('piggycoins-animation');
    if (animContainer) {
      lottie.loadAnimation({
        container: animContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/piggycoins.json'
      });
    }
  }

  loadInvestmentCardAnimations() {
    // Load animations for all investment cards
    const investmentAnimations = [
      { id: 'invest1-animation', path: '/assets/invest1.json' },
      { id: 'invest2-animation', path: '/assets/invest2.json' },
      { id: 'invest3-animation', path: '/assets/invest3.json' },
      { id: 'invest4-animation', path: '/assets/invest4.json' },
      { id: 'invest5-animation', path: '/assets/invest5.json' }
    ];

    investmentAnimations.forEach(anim => {
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

  loadTipsAnimations() {
    // Load animations for all tips
    const tipAnimations = [
      { id: 'tip1-animation', path: '/assets/invest1.json' }, // Reusing invest1 for tip1
      { id: 'tip2-animation', path: '/assets/invest2.json' }, // Reusing invest2 for tip2
      { id: 'tip3-animation', path: '/assets/invest3.json' }, // Reusing invest3 for tip3
      { id: 'tip4-animation', path: '/assets/invest4.json' }, // Reusing invest4 for tip4
      { id: 'tip5-animation', path: '/assets/invest5.json' }  // Reusing invest5 for tip5
    ];

    tipAnimations.forEach(anim => {
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
  loadModalAnimation(investmentId: string) {
    const animId = `modal-${investmentId}-animation`;
    const container = document.getElementById(animId);
    if (container) {
      // Clear any existing animation
      container.innerHTML = '';
      
      // Determine which animation to load based on investment
      const animationMap: { [key: string]: string } = {
        'eco-forest': '/assets/invest1.json',
        'tech-planet': '/assets/invest2.json',
        'magic-kingdom': '/assets/invest3.json',
        'dream-studio': '/assets/invest4.json',
        'space-explorer': '/assets/invest5.json'
      };
      
      const animationPath = animationMap[investmentId] || '/assets/invest1.json';
      
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath
      });
    }
  }

  // Load history animations
  loadHistoryAnimations() {
    this.userInvestments.forEach(investment => {
      const animId = `history-${investment.investmentId}-animation`;
      const container = document.getElementById(animId);
      if (container) {
        const animationMap: { [key: string]: string } = {
          'eco-forest': '/assets/invest1.json',
          'tech-planet': '/assets/invest2.json',
          'magic-kingdom': '/assets/invest3.json',
          'dream-studio': '/assets/invest4.json',
          'space-explorer': '/assets/invest5.json'
        };
        
        const animationPath = animationMap[investment.investmentId] || '/assets/invest1.json';
        
        lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: animationPath
        });
      }
    });
  }

  loadUserData() {
    // Load from localStorage
    const savedBalance = localStorage.getItem('piggyCoinsBalance');
    const savedInvestments = localStorage.getItem('userInvestments');
    
    if (savedBalance) {
      this.balance = parseInt(savedBalance, 10);
    }
    
    if (savedInvestments) {
      this.userInvestments = JSON.parse(savedInvestments);
      // Load history animations after data is loaded
      setTimeout(() => this.loadHistoryAnimations(), 100);
    }
  }

  saveUserData() {
    localStorage.setItem('piggyCoinsBalance', this.balance.toString());
    localStorage.setItem('userInvestments', JSON.stringify(this.userInvestments));
  }

  onScroll(ev: any) {
    const top = ev?.detail?.scrollTop ?? 0;
    const max = 600;
    const t = Math.min(1, top / max);
    this.bgGradient = this.makeGradient(t);
  }

  makeGradient(t: number) {
    const h1 = Math.round(210 + (200 - 210) * t);
    const h2 = Math.round(220 + (250 - 220) * t);
    return `linear-gradient(180deg, hsl(${h1} 70% ${12 + t * 8}%), hsl(${h2} 70% ${8 + t * 4}%))`;
  }

  // Investment Methods
  openInvestModal(inv: any) {
    this.selectedInvestment = inv;
    this.investmentAmount = Math.min(100, this.balance);
    this.isModalOpen = true;
    
    // Load modal animation after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (this.selectedInvestment) {
        this.loadModalAnimation(this.selectedInvestment.id);
      }
    }, 100);
  }

  closeInvestModal() {
    this.isModalOpen = false;
    this.investmentAmount = 0;
  }

  setInvestmentAmount(amount: number) {
    this.investmentAmount = amount;
  }

  getQuickAmounts(): number[] {
    const max = Math.min(this.balance, this.selectedInvestment?.maxInvestment || this.balance);
    return [
      this.selectedInvestment?.minInvestment || 10,
      Math.min(100, max),
      Math.min(200, max),
      Math.min(500, max)
    ].filter((amount, index, array) => 
      amount > 0 && array.indexOf(amount) === index
    );
  }

  getProjectedGrowth(days: number) {
    if (!this.selectedInvestment || !this.investmentAmount) return 0;
    const weeklyRate = this.selectedInvestment.interestRate / 100;
    const weeks = days / 7;
    return this.investmentAmount * weeklyRate * weeks;
  }

  getRiskLevel(interestRate: number): string {
    if (interestRate <= 5) return 'low';
    if (interestRate <= 8) return 'medium';
    return 'high';
  }

  isValidInvestment() {
    if (!this.selectedInvestment) return false;
    
    return this.investmentAmount >= this.selectedInvestment.minInvestment &&
           this.investmentAmount <= this.balance &&
           this.investmentAmount <= this.selectedInvestment.maxInvestment;
  }

  confirmInvestment() {
    if (!this.isValidInvestment() || !this.selectedInvestment) return;
    
    // Deduct from balance
    this.balance -= this.investmentAmount;
    
    // Create new investment
    const newInvestment: UserInvestment = {
      id: this.generateId(),
      investmentId: this.selectedInvestment.id,
      amount: this.investmentAmount,
      startDate: new Date(),
      lastGrowthUpdate: new Date(),
      totalGrowth: 0
    };

    this.userInvestments.push(newInvestment);
    this.saveUserData();
    
    // Load animation for the new history item
    setTimeout(() => {
      this.loadHistoryAnimations();
    }, 100);
    
    // Show success message
    setTimeout(() => {
      alert(`🎉 Success! You invested ${this.investmentAmount} coins in ${this.selectedInvestment.name}! Your coins are now growing! 🌱`);
    }, 100);
    
    this.closeInvestModal();
  }

  // Investment Tracking Methods
  getInvestmentTotal(investmentId: string): number {
    return this.userInvestments
      .filter(inv => inv.investmentId === investmentId)
      .reduce((total, inv) => total + inv.amount, 0);
  }

  getInvestmentGrowth(investmentId: string): number {
    return this.userInvestments
      .filter(inv => inv.investmentId === investmentId)
      .reduce((total, inv) => total + inv.totalGrowth, 0);
  }

  getTotalInvested(): number {
    return this.userInvestments.reduce((total, inv) => total + inv.amount, 0);
  }

  getTotalGrowth(): number {
    return this.userInvestments.reduce((total, inv) => total + inv.totalGrowth, 0);
  }

  getInvestmentName(investmentId: string): string {
    const investment = this.investmentOptions.find(inv => inv.id === investmentId);
    return investment?.name || 'Unknown Investment';
  }

  getInvestmentTheme(investmentId: string): string {
    const investment = this.investmentOptions.find(inv => inv.id === investmentId);
    return investment?.theme || 'eco-forest';
  }

  getInvestmentIcon(theme: string): string {
    const iconMap: { [key: string]: string } = {
      'eco-forest': 'assets/icons/tree.png',
      'tech-planet': 'assets/icons/rocket.png',
      'magic-kingdom': 'assets/icons/magic.png',
      'dream-studio': 'assets/icons/star.png',
      'space-explorer': 'assets/icons/planet.png'
    };
    return iconMap[theme] || 'assets/icons/coin.png';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Growth Simulation
  startGrowthSimulation() {
    // Calculate growth every 30 seconds
    setInterval(() => {
      this.calculateGrowth();
    }, 30000);
  }

  calculateGrowth() {
    const now = new Date();
    let totalGrowth = 0;

    this.userInvestments.forEach(investment => {
      const investmentOption = this.investmentOptions.find(opt => opt.id === investment.investmentId);
      if (!investmentOption) return;

      const timeDiff = now.getTime() - investment.lastGrowthUpdate.getTime();
      const hoursPassed = timeDiff / (1000 * 60 * 60);
      
      // Calculate growth based on weekly interest rate
      const hourlyRate = investmentOption.interestRate / (24 * 7 * 100);
      const growth = investment.amount * hourlyRate * hoursPassed;

      if (growth > 0) {
        investment.totalGrowth += growth;
        investment.lastGrowthUpdate = now;
        totalGrowth += growth;
      }
    });

    if (totalGrowth > 0) {
      this.balance += totalGrowth;
      this.saveUserData();
    }
  }

  // Utility Methods
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Auto-scroll investment tips
  startAutoScroll() {
    if (!this.autoScrollRow) return;
    const row = this.autoScrollRow.nativeElement;
    let scrollAmount = 0;
    setInterval(() => {
      scrollAmount += 280;
      if (scrollAmount >= row.scrollWidth - row.clientWidth) {
        scrollAmount = 0;
      }
      row.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }, 3000);
  }

  // Make Math available in template
  Math = Math;
}