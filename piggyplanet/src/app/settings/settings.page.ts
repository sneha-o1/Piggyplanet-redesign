import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user = {
    name: 'Emma',
    age: 15,
    avatar: 'https://i.pravatar.cc/200?img=47',
    totalCoins: 8450,
    savingsGoals: 3,
    streakDays: 15
  };

  joinDate = 'Jan 2024';

  notifications = {
    push: true,
    email: false,
    progress: true
  };

  security = {
    biometric: false
  };

  transactionFilter = 'all';
  filteredTransactions: any[] = [];

  transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 500,
      description: 'Monthly Allowance',
      reason: 'From parents',
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      type: 'deposit',
      amount: 200,
      description: 'Birthday Gift',
      reason: 'Grandma gift',
      date: new Date('2024-01-10')
    },
    {
      id: 3,
      type: 'withdrawal',
      amount: 150,
      description: 'Video Game Purchase',
      reason: 'New game',
      date: new Date('2024-01-08')
    },
    {
      id: 4,
      type: 'deposit',
      amount: 100,
      description: 'Chore Completion',
      reason: 'Cleaned room',
      date: new Date('2024-01-05')
    },
    {
      id: 5,
      type: 'withdrawal',
      amount: 50,
      description: 'Book Purchase',
      reason: 'School book',
      date: new Date('2024-01-02')
    },
    {
      id: 6,
      type: 'deposit',
      amount: 300,
      description: 'Pocket Money',
      reason: 'Weekly allowance',
      date: new Date('2024-01-01')
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
    this.loadSettings();
    this.filterTransactions();
  }

  loadUserData() {
    try {
      const savedUserDetails = localStorage.getItem('userDetails');
      if (savedUserDetails) {
        const userDetails = JSON.parse(savedUserDetails);
        this.user.name = userDetails.name || 'Emma';
        this.user.age = userDetails.age || 15;
      }
    } catch (e) {
      console.error('Error loading user data:', e);
    }
  }

  loadSettings() {
    try {
      const savedNotifications = localStorage.getItem('notificationSettings');
      const savedSecurity = localStorage.getItem('securitySettings');

      if (savedNotifications) {
        this.notifications = { ...this.notifications, ...JSON.parse(savedNotifications) };
      }

      if (savedSecurity) {
        this.security = { ...this.security, ...JSON.parse(savedSecurity) };
      }
    } catch (e) {
      console.error('Error loading settings:', e);
    }
  }

  filterTransactions() {
    if (this.transactionFilter === 'all') {
      this.filteredTransactions = this.transactions.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      this.filteredTransactions = this.transactions
        .filter(t => t.type === this.transactionFilter)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  get totalDeposits(): number {
    return this.transactions
      .filter(t => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get totalWithdrawals(): number {
    return this.transactions
      .filter(t => t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get currentBalance(): number {
    return this.totalDeposits - this.totalWithdrawals;
  }

  getTransactionIcon(type: string): string {
    switch (type) {
      case 'deposit':
        return 'add-circle-outline';
      case 'withdrawal':
        return 'remove-circle-outline';
      default:
        return 'cash-outline';
    }
  }

  // Settings Actions
  editProfile() {
    alert('Edit Profile feature coming soon!');
    // this.router.navigate(['/edit-profile']);
  }

  changeParentalCode() {
    const newCode = prompt('Enter new 6-digit parental code:');
    if (newCode && newCode.length === 6 && /^\d+$/.test(newCode)) {
      alert('Parental code updated successfully!');
    } else if (newCode) {
      alert('Please enter a valid 6-digit code.');
    }
  }

  manageUPI() {
    alert('UPI Management feature coming soon!');
  }

  saveNotificationSettings() {
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(this.notifications));
      console.log('Notification settings saved:', this.notifications);
    } catch (e) {
      console.error('Error saving notification settings:', e);
    }
  }

  saveSecuritySettings() {
    try {
      localStorage.setItem('securitySettings', JSON.stringify(this.security));
      console.log('Security settings saved:', this.security);
    } catch (e) {
      console.error('Error saving security settings:', e);
    }
  }

  changePassword() {
    alert('Change Password feature coming soon!');
  }

  privacySettings() {
    alert('Privacy Settings feature coming soon!');
  }

  contactSupport() {
    alert('Contact Support: support@piggyplanet.com');
  }

  aboutApp() {
    alert('PiggyPlanet v1.0.0\n\nA fun and educational savings app for kids!');
  }

  rateApp() {
    alert('Rate App feature coming soon!');
  }

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      // Clear user session
      localStorage.removeItem('userSession');
      alert('Logged out successfully!');
      this.router.navigate(['/login']);
    }
  }

  // Add this method to generate sample transactions (for demo)
  generateSampleTransactions() {
    // This is just for demo - in real app, you'd get this from backend
    console.log('Sample transactions loaded');
  }
}