import { Component, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import lottie from 'lottie-web';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  currentTab = 'login';
  showLoader = true; // Added loader state

  loginData = { username: '', password: '' };
  signupData = { username: '', password: '' };

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.loadLoginLoaderAnimation();
  }

  loadLoginLoaderAnimation() {
    const loaderContainer = document.getElementById('login-loader');
    if (loaderContainer) {
      lottie.loadAnimation({
        container: loaderContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/login-page.json',
      });
    }

    // Hide loader after 4.5 seconds and show login page
    setTimeout(() => {
      this.showLoader = false;
      this.loadLoginLogoAnimation();
    }, 4500); // 4.5 seconds
  }

  loadLoginLogoAnimation() {
    const logoContainer = document.getElementById('login-logo');
    if (logoContainer) {
      lottie.loadAnimation({
        container: logoContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/logo.json',
      });
    }
  }

  switchTab(tab: string) {
    this.currentTab = tab;
  }

  onLogin() {
    if (this.loginData.username && this.loginData.password) {
      localStorage.setItem('username', this.loginData.username);
      localStorage.setItem('isLoggedIn', 'true');

      this.router.navigate(['/tabs/tab1']);   // FIXED
    } else {
      alert('Please fill in all fields!');
    }
  }

  onSignup() {
    if (this.signupData.username && this.signupData.password) {
      localStorage.setItem('username', this.signupData.username);
      localStorage.setItem('isSignedUp', 'true');

      this.router.navigate(['/all-details']);  // FIXED
    } else {
      alert('Please fill in all fields!');
    }
  }
}