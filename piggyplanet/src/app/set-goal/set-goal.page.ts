import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonModal,
  IonProgressBar,
  IonFooter,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import lottie from 'lottie-web';

export interface Goal {
  id: string;
  title: string;
  description: string;
  saved: number;
  target: number;
  deadline: string;
  color: string;
  image: string;
}

@Component({
  selector: 'app-set-goal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonModal,
    IonProgressBar,
    IonFooter,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput
  ],
  templateUrl: './set-goal.page.html',
  styleUrls: ['./set-goal.page.scss'],
})
export class SetGoalPage implements OnInit, AfterViewInit {
  bgGradient = this.makeGradient(0);
  balance = 1250;

  goals: Goal[] = [];

  // Color options for the modal
  colorOptions = [
    { name: 'Blue', value: '#BBDEFB' },
    { name: 'Pink', value: '#FFD1DC' },
    { name: 'Yellow', value: '#FFF59D' },
    { name: 'Green', value: '#C8E6C9' },
    { name: 'Purple', value: '#D1C4E9' },
    { name: 'Orange', value: '#FFE0B2' }
  ];

  // create goal modal
  isCreateModalOpen = false;
  newGoal: Partial<Goal> = {
    title: '',
    description: '',
    saved: 0,
    target: 0,
    deadline: '',
    color: '#BBDEFB',
    image: 'https://cdn-icons-png.flaticon.com/512/1580/1580336.png'
  };

  // deposit modal
  isDepositModalOpen = false;
  depositTarget: Goal | null = null;
  depositAmount: number | null = null;

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.loadAllAnimations();
  }

  loadAllAnimations() {
    // Header animations
    this.loadHeaderAnimations();
    
    // Goal card animations
    this.loadGoalCardAnimations();
  }

  loadHeaderAnimations() {
    // Back animation
    const backContainer = document.getElementById('back-animation');
    if (backContainer) {
      lottie.loadAnimation({
        container: backContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/back.json'
      });
    }

    // Goal header animation
    const goalHeaderContainer = document.getElementById('goal-header-animation');
    if (goalHeaderContainer) {
      lottie.loadAnimation({
        container: goalHeaderContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/goal-header.json'
      });
    }
  }

  loadGoalCardAnimations() {
    // Bicycle animation
    const bicycleContainer = document.getElementById('bicycle-animation');
    if (bicycleContainer) {
      lottie.loadAnimation({
        container: bicycleContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/bicycle.json'
      });
    }

    // Art animation
    const artContainer = document.getElementById('art-animation');
    if (artContainer) {
      lottie.loadAnimation({
        container: artContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/art.json'
      });
    }
  }

  /* ---------- persistence ---------- */
  loadData() {
    const savedBalance = localStorage.getItem('pp_balance');
    const savedGoals = localStorage.getItem('pp_goals');
    if (savedBalance) this.balance = parseInt(savedBalance, 10);
    if (savedGoals) {
      try {
        this.goals = JSON.parse(savedGoals) || [];
      } catch {
        this.goals = [];
      }
    }

    // seed defaults if none
    if (!this.goals || this.goals.length === 0) {
      this.goals = [
        {
          id: this.generateId(),
          title: '🚲 New Bicycle',
          description: 'A cool mountain bike for riding with friends',
          saved: 800,
          target: 2000,
          deadline: '01/09/26',
          color: '#FFD1DC',
          image: 'https://cdn-icons-png.flaticon.com/512/1580/1580336.png',
        },
        {
          id: this.generateId(),
          title: '🎨 Art Supplies',
          description: 'Professional drawing and painting set',
          saved: 450,
          target: 800,
          deadline: '03/01/26',
          color: '#C8E6C9',
          image: 'https://cdn-icons-png.flaticon.com/512/1053/1053183.png',
        }
      ];
      this.saveData();
    }
  }

  saveData() {
    localStorage.setItem('pp_balance', String(this.balance));
    localStorage.setItem('pp_goals', JSON.stringify(this.goals));

    // notify other pages in-app that goals/balance changed
    try {
      window.dispatchEvent(new Event('pp:updated'));
    } catch (e) {}
  }

  /* ---------- header scroll ---------- */
  onScroll(ev: any) {
    const top = ev?.detail?.scrollTop ?? 0;
    const t = Math.min(1, top / 500);
    this.bgGradient = this.makeGradient(t);
  }

  makeGradient(t: number) {
    const h1 = Math.round(275 + (290 - 275) * t);
    const h2 = Math.round(260 + (280 - 260) * t);
    return `linear-gradient(180deg, hsl(${h1}, 80%, 10%), hsl(${h2}, 70%, 7%))`;
  }

  /* ---------- navigation ---------- */
  goBack() {
    // simple back behaviour — falls back to history
    try {
      history.back();
    } catch {
      // noop
    }
  }

  /* ---------- create goal ---------- */
  openCreateModal() {
    this.newGoal = {
      title: '',
      description: '',
      saved: 0,
      target: 0,
      deadline: '',
      color: '#BBDEFB',
      image: 'https://cdn-icons-png.flaticon.com/512/1580/1580336.png'
    };
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  isCreateGoalValid(): boolean {
    return !!this.newGoal.title && !!this.newGoal.target && this.newGoal.target > 0;
  }

  createGoal() {
    if (!this.isCreateGoalValid()) return;
    const g: Goal = {
      id: this.generateId(),
      title: (this.newGoal.title || '').trim(),
      description: this.newGoal.description || '',
      saved: Number(this.newGoal.saved || 0),
      target: Number(this.newGoal.target || 0),
      deadline: this.newGoal.deadline || '',
      color: this.newGoal.color || '#BBDEFB',
      image: this.newGoal.image || 'https://cdn-icons-png.flaticon.com/512/1580/1580336.png'
    };

    this.goals.unshift(g);
    this.saveData();
    this.isCreateModalOpen = false;
  }

  /* ---------- deposit ---------- */
  openDepositModal(goal: Goal) {
    this.depositTarget = goal;
    this.depositAmount = null;
    this.isDepositModalOpen = true;
  }

  closeDepositModal() {
    this.isDepositModalOpen = false;
    this.depositTarget = null;
    this.depositAmount = null;
  }

  canDeposit(): boolean {
    if (!this.depositTarget) return false;
    if (!this.depositAmount || this.depositAmount <= 0) return false;
    if (this.depositAmount > this.balance) return false;
    return true;
  }

  confirmDeposit() {
    if (!this.canDeposit() || !this.depositTarget || !this.depositAmount) return;
    const amount = Math.floor(this.depositAmount);
    // Update balance and goal saved
    this.balance -= amount;
    this.depositTarget.saved += amount;

    // Parent match
    const parentMatch = Math.floor(amount * 0.25);
    this.depositTarget.saved += parentMatch;

    this.saveData();
    this.closeDepositModal();
  }

  /* ---------- delete ---------- */
  confirmDelete(goal: Goal) {
    const ok = confirm(`Delete the goal "${goal.title}"? This action cannot be undone.`);
    if (!ok) return;
    this.deleteGoal(goal);
  }

  deleteGoal(goal: Goal) {
    this.goals = this.goals.filter(g => g.id !== goal.id);
    this.saveData();
  }

  /* ---------- withdraw (optional) ---------- */
  withdrawFromGoal(goal: Goal) {
    const withdrawAmount = Math.min(goal.saved, Math.floor(goal.target * 0.1));
    if (withdrawAmount <= 0) {
      alert('Nothing available to withdraw.');
      return;
    }
    const ok = confirm(`Withdraw ${withdrawAmount} coins from "${goal.title}"?`);
    if (!ok) return;
    goal.saved -= withdrawAmount;
    this.balance += withdrawAmount;
    this.saveData();
  }

  /* ---------- helpers ---------- */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  openProfile() {
    alert('Profile coming soon!');
  }

  // Helper methods to safely access goal properties
  getGoalSaved(index: number): number {
    return this.goals[index]?.saved || 0;
  }

  getGoalTarget(index: number): number {
    return this.goals[index]?.target || 1; // Avoid division by zero
  }

  getProgressPercentage(index: number): number {
    const saved = this.getGoalSaved(index);
    const target = this.getGoalTarget(index);
    return target > 0 ? (saved / target) * 100 : 0;
  }

  getProgressValue(index: number): number {
    const saved = this.getGoalSaved(index);
    const target = this.getGoalTarget(index);
    return target > 0 ? saved / target : 0;
  }
}