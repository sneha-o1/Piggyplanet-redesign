import { Component, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import lottie from 'lottie-web';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-details',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './all-details.page.html',
  styleUrls: ['./all-details.page.scss'],
})
export class AllDetailsPage implements AfterViewInit {
  userDetails = {
    name: '',
    parentName: '',
    dob: '',
    age: 0,
    upiId: '',
    monthlyAllowance: 0,
    parentalCode: '',
    confirmParentalCode: '',
    savingsGoal: '',
    targetAmount: 0
  };

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.loadDetailsLogoAnimation();

    // if there's already saved user details, prefill them
    try {
      const saved = localStorage.getItem('userDetails');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.userDetails = { ...this.userDetails, ...parsed };
      }
    } catch {}
  }

  loadDetailsLogoAnimation() {
    const logoContainer = document.getElementById('details-logo');
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

  calculateAge() {
    if (this.userDetails.dob) {
      const birthDate = new Date(this.userDetails.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      this.userDetails.age = age;
    }
  }

  isFormValid(): boolean {
    return (
      !!this.userDetails.name &&
      !!this.userDetails.parentName &&
      !!this.userDetails.dob &&
      !!this.userDetails.upiId &&
      this.userDetails.monthlyAllowance > 0 &&
      this.userDetails.parentalCode.length === 6 &&
      this.userDetails.confirmParentalCode.length === 6 &&
      this.userDetails.parentalCode === this.userDetails.confirmParentalCode &&
      !!this.userDetails.savingsGoal &&
      this.userDetails.targetAmount > 0
    );
  }

  saveDetails() {
    if (this.isFormValid()) {
      // Save all details to localStorage
      try {
        localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
        localStorage.setItem('userName', this.userDetails.name);
        localStorage.setItem('parentalCode', this.userDetails.parentalCode);
        localStorage.setItem('userAge', String(this.userDetails.age));
        localStorage.setItem('savingsGoal', this.userDetails.savingsGoal);
        localStorage.setItem('targetAmount', String(this.userDetails.targetAmount));
        localStorage.setItem('isProfileComplete', 'true');

        // 🔥 Notify Tab1 & Tab5 that new user data is available
        try {
          window.dispatchEvent(new Event('pp:userUpdated'));
        } catch {}

        // optional: also update balance/goals listeners if relevant
        try {
          window.dispatchEvent(new Event('pp:updated'));
        } catch {}

        alert('Profile completed successfully!');

        // navigate back to tab1 so changes are visible immediately
        // your routes may differ; this assumes '/tabs/tab1' is the route
        this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
      } catch (e) {
        alert('Failed to save profile. Please try again.');
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}
