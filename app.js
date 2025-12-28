let currentUser = null;
let map = null;

const app = {
  init() {
    // Show splash screen first
    this.showSplashScreen();
    this.setupEventListeners();
  },

  showSplashScreen() {
    // Create splash screen with white background
    document.getElementById('app').innerHTML = `
      <div class="splash-screen" id="splash-screen">
        <div class="splash-content">
          <img src="public/image.png" alt="Pick Up Logo" class="splash-logo">
        </div>
      </div>
    `;
    
    // After 3 seconds (1s fade in, 1s stay, 1s fade out), remove splash and show sign-in
    setTimeout(() => {
      this.removeSplashScreen();
      this.renderSignIn();
    }, 3000);
  },

  removeSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      splashScreen.classList.add('fade-out');
      setTimeout(() => {
        splashScreen.remove();
      }, 1500);
    }
  },

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-page]')) {
        this.navigateTo(e.target.dataset.page);
      }
    });
  },

  navigateTo(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    const targetPage = document.getElementById(page);
    if (targetPage) {
      targetPage.classList.add('active');

      if (page === 'map-page') {
        setTimeout(() => this.initMap(), 100);
      }

      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => item.classList.remove('active'));
      const activeNav = document.querySelector(`[data-page="${page}"]`);
      if (activeNav && activeNav.classList.contains('nav-item')) {
        activeNav.classList.add('active');
      }
    }
  },

  renderSignIn() {
    document.getElementById('app').innerHTML = `
      <div class="app-container">
        <div class="page active" id="signin-page">
          <div class="auth-page">
            <div class="auth-header">
              <div class="logo-container">
                <img src="public/image.png" alt="Pick Up Logo" class="logo">
              </div>
              <h1 class="welcome-text">Welcome Back</h1>
              <p class="welcome-subtitle">Please create your account with your valid information or sign in to manage your account.</p>
            </div>

            <form id="signin-form">
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" placeholder="Example@email.com" required>
              </div>

              <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" class="form-input" placeholder="********" required>
              </div>

              <button type="submit" class="btn-primary">Sign In</button>

              <p class="link-text">
                Don't have an account? <a href="#" data-page="signup-page">Sign Up</a>
              </p>

              <p class="link-text">
                <a href="#" style="color: var(--text-light);">Forgot your password?</a>
              </p>
            </form>
          </div>
        </div>

        <div class="page" id="signup-page">
          <div class="auth-page">
            <div class="auth-header">
              <div class="logo-container">
                <img src="public/image.png" alt="Pick Up Logo" class="logo">
              </div>
              <h1 class="welcome-text">Create Account</h1>
              <p class="welcome-subtitle">Join Pick Up to manage waste efficiently</p>
            </div>

            <form id="signup-form">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" placeholder="Your Name" required>
              </div>

              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" placeholder="Example@email.com" required>
              </div>

              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input type="tel" class="form-input" placeholder="+213 xxx xxx xxx" required>
              </div>

              <div class="form-group">
                <label class="form-label">Account Type</label>
                <select class="form-select" required>
                  <option value="">Select account type</option>
                  <option value="producer">Waste Producer (Restaurant, Hotel, Bakery)</option>
                  <option value="recycler">Recycler / Waste User</option>
                  <option value="pickup">Pickup Team</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" class="form-input" placeholder="********" required>
              </div>

              <button type="submit" class="btn-primary">Sign Up</button>

              <p class="link-text">
                Already have an account? <a href="#" data-page="signin-page">Sign In</a>
              </p>
            </form>
          </div>
        </div>

        <div class="page" id="home-page">
          <div class="header">
            <div class="header-content">
              <div>
                <h1 class="header-title">Pick Up</h1>
                <p class="header-subtitle">Waste Management Solution</p>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="action-cards">
              <div class="action-card" onclick="app.openRequestModal()">
                <div class="action-icon">📦</div>
                <div class="action-title">Request Pickup</div>
              </div>

              <div class="action-card" onclick="app.openDemandModal()">
                <div class="action-icon">♻️</div>
                <div class="action-title">Material Demand</div>
              </div>

              <div class="action-card" data-page="map-page">
                <div class="action-icon">🗺️</div>
                <div class="action-title">View Map</div>
              </div>

              <div class="action-card" onclick="app.callPickupTeam()">
                <div class="action-icon">📞</div>
                <div class="action-title">Call Team</div>
              </div>
            </div>

            <h2 class="section-title">Recent Activity</h2>
            <div class="list-item">
              <div class="list-avatar">🏪</div>
              <div class="list-content">
                <div class="list-title">Restaurant Le Gourmet</div>
                <div class="list-subtitle">Pickup completed - 45kg organic waste</div>
              </div>
            </div>

            <div class="list-item">
              <div class="list-avatar">🏭</div>
              <div class="list-content">
                <div class="list-title">Recycling Center North</div>
                <div class="list-subtitle">Material delivered - Plastic waste</div>
              </div>
            </div>

            <div class="list-item">
              <div class="list-avatar">🍞</div>
              <div class="list-content">
                <div class="list-title">Bakery du Coin</div>
                <div class="list-subtitle">Pickup scheduled for tomorrow</div>
              </div>
            </div>
          </div>

          <nav class="bottom-nav">
            <div class="nav-item active" data-page="home-page">
              <div class="nav-icon">🏠</div>
              <span>Home</span>
            </div>
            <div class="nav-item" data-page="map-page">
              <div class="nav-icon">🗺️</div>
              <span>Map</span>
            </div>
            <div class="nav-item" data-page="notifications-page">
              <div class="nav-icon">🔔</div>
              <span>Alerts</span>
            </div>
            <div class="nav-item" data-page="profile-page">
              <div class="nav-icon">👤</div>
              <span>Profile</span>
            </div>
          </nav>
        </div>

        <div class="page" id="map-page">
          <div class="header">
            <div class="header-content">
              <div>
                <h1 class="header-title">Pickup Locations</h1>
                <p class="header-subtitle">Sidi Bel Abbes, Algeria</p>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="map-container">
              <div id="map"></div>
            </div>

            <h2 class="section-title">Active Locations</h2>

            <div class="list-item">
              <div class="list-avatar">🏪</div>
              <div class="list-content">
                <div class="list-title">Restaurant Central</div>
                <div class="list-subtitle">Rue de la République</div>
              </div>
              <button class="list-action" onclick="app.callLocation()">📞</button>
            </div>

            <div class="list-item">
              <div class="list-avatar">🏨</div>
              <div class="list-content">
                <div class="list-title">Hotel Sidi Bel Abbes</div>
                <div class="list-subtitle">Boulevard Larbi Ben M'hidi</div>
              </div>
              <button class="list-action" onclick="app.callLocation()">📞</button>
            </div>

            <div class="list-item">
              <div class="list-avatar">🍞</div>
              <div class="list-content">
                <div class="list-title">Boulangerie Modern</div>
                <div class="list-subtitle">Rue Pasteur</div>
              </div>
              <button class="list-action" onclick="app.callLocation()">📞</button>
            </div>

            <div class="list-item">
              <div class="list-avatar">🏭</div>
              <div class="list-content">
                <div class="list-title">Recycling Center</div>
                <div class="list-subtitle">Zone Industrielle</div>
              </div>
              <button class="list-action" onclick="app.callLocation()">📞</button>
            </div>
          </div>

          <nav class="bottom-nav">
            <div class="nav-item" data-page="home-page">
              <div class="nav-icon">🏠</div>
              <span>Home</span>
            </div>
            <div class="nav-item active" data-page="map-page">
              <div class="nav-icon">🗺️</div>
              <span>Map</span>
            </div>
            <div class="nav-item" data-page="notifications-page">
              <div class="nav-icon">🔔</div>
              <span>Alerts</span>
            </div>
            <div class="nav-item" data-page="profile-page">
              <div class="nav-icon">👤</div>
              <span>Profile</span>
            </div>
          </nav>
        </div>

        <div class="page" id="notifications-page">
          <div class="header">
            <div class="header-content">
              <div>
                <h1 class="header-title">Notifications</h1>
                <p class="header-subtitle">Stay updated with your activities</p>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="notification-item">
              <div class="notification-title">New pickup request</div>
              <div class="notification-text">Restaurant Le Gourmet has requested a pickup for organic waste. Estimated weight: 45kg</div>
              <div class="notification-time">2 hours ago</div>
            </div>

            <div class="notification-item">
              <div class="notification-title">Pickup completed</div>
              <div class="notification-text">Your waste has been successfully collected and is on the way to the recycling center.</div>
              <div class="notification-time">5 hours ago</div>
            </div>

            <div class="notification-item">
              <div class="notification-title">Material demand available</div>
              <div class="notification-text">A recycling facility is looking for plastic waste. Check if you can fulfill this demand.</div>
              <div class="notification-time">1 day ago</div>
            </div>

            <div class="notification-item">
              <div class="notification-title">Route update</div>
              <div class="notification-text">Your pickup route has been updated. Please check the map for new locations.</div>
              <div class="notification-time">2 days ago</div>
            </div>
          </div>

          <nav class="bottom-nav">
            <div class="nav-item" data-page="home-page">
              <div class="nav-icon">🏠</div>
              <span>Home</span>
            </div>
            <div class="nav-item" data-page="map-page">
              <div class="nav-icon">🗺️</div>
              <span>Map</span>
            </div>
            <div class="nav-item active" data-page="notifications-page">
              <div class="nav-icon">🔔</div>
              <span>Alerts</span>
            </div>
            <div class="nav-item" data-page="profile-page">
              <div class="nav-icon">👤</div>
              <span>Profile</span>
            </div>
          </nav>
        </div>

        <div class="page" id="profile-page">
          <div class="header">
            <div class="header-content">
              <div>
                <h1 class="header-title">Profile</h1>
                <p class="header-subtitle">Manage your account</p>
              </div>
            </div>
          </div>

          <div class="content">
            <div style="text-align: center; padding: 40px 0;">
              <div style="width: 100px; height: 100px; border-radius: 50%; background: var(--primary-green); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 40px;">
                👤
              </div>
              <h2 style="font-size: 24px; font-weight: 700; color: var(--text-dark); margin-bottom: 8px;">User Name</h2>
              <p style="color: var(--text-light);">user@example.com</p>
            </div>

            <div class="list-item" style="cursor: pointer;">
              <div class="list-avatar" style="background: #e2e8f0; color: var(--text-dark);">⚙️</div>
              <div class="list-content">
                <div class="list-title">Settings</div>
                <div class="list-subtitle">Manage app preferences</div>
              </div>
            </div>

            <div class="list-item" style="cursor: pointer;">
              <div class="list-avatar" style="background: #e2e8f0; color: var(--text-dark);">📊</div>
              <div class="list-content">
                <div class="list-title">Statistics</div>
                <div class="list-subtitle">View your impact</div>
              </div>
            </div>

            <div class="list-item" style="cursor: pointer;">
              <div class="list-avatar" style="background: #e2e8f0; color: var(--text-dark);">❓</div>
              <div class="list-content">
                <div class="list-title">Help & Support</div>
                <div class="list-subtitle">Get assistance</div>
              </div>
            </div>

            <div class="list-item" style="cursor: pointer;" onclick="app.logout()">
              <div class="list-avatar" style="background: #fee2e2; color: #dc2626;">🚪</div>
              <div class="list-content">
                <div class="list-title" style="color: #dc2626;">Logout</div>
                <div class="list-subtitle">Sign out of your account</div>
              </div>
            </div>
          </div>

          <nav class="bottom-nav">
            <div class="nav-item" data-page="home-page">
              <div class="nav-icon">🏠</div>
              <span>Home</span>
            </div>
            <div class="nav-item" data-page="map-page">
              <div class="nav-icon">🗺️</div>
              <span>Map</span>
            </div>
            <div class="nav-item" data-page="notifications-page">
              <div class="nav-icon">🔔</div>
              <span>Alerts</span>
            </div>
            <div class="nav-item active" data-page="profile-page">
              <div class="nav-icon">👤</div>
              <span>Profile</span>
            </div>
          </nav>
        </div>

        <div class="modal" id="request-modal">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Request Pickup</h2>
              <button class="modal-close" onclick="app.closeModal('request-modal')">&times;</button>
            </div>
            <form id="request-form">
              <div class="form-group">
                <label class="form-label">Waste Type</label>
                <select class="form-select" required>
                  <option value="">Select waste type</option>
                  <option value="organic">Organic Waste</option>
                  <option value="plastic">Plastic</option>
                  <option value="paper">Paper & Cardboard</option>
                  <option value="glass">Glass</option>
                  <option value="metal">Metal</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Estimated Weight (kg)</label>
                <input type="number" class="form-input" placeholder="e.g., 50" required>
              </div>

              <div class="form-group">
                <label class="form-label">Pickup Address</label>
                <input type="text" class="form-input" placeholder="Your location" required>
              </div>

              <div class="form-group">
                <label class="form-label">Additional Notes</label>
                <input type="text" class="form-input" placeholder="Any special instructions">
              </div>

              <button type="submit" class="btn-primary">Submit Request</button>
            </form>
          </div>
        </div>

        <div class="modal" id="demand-modal">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Material Demand</h2>
              <button class="modal-close" onclick="app.closeModal('demand-modal')">&times;</button>
            </div>
            <form id="demand-form">
              <div class="form-group">
                <label class="form-label">Material Type Needed</label>
                <select class="form-select" required>
                  <option value="">Select material type</option>
                  <option value="organic">Organic Waste</option>
                  <option value="plastic">Plastic</option>
                  <option value="paper">Paper & Cardboard</option>
                  <option value="glass">Glass</option>
                  <option value="metal">Metal</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Quantity Needed (kg)</label>
                <input type="number" class="form-input" placeholder="e.g., 100" required>
              </div>

              <div class="form-group">
                <label class="form-label">Delivery Address</label>
                <input type="text" class="form-input" placeholder="Your facility location" required>
              </div>

              <div class="form-group">
                <label class="form-label">Purpose</label>
                <input type="text" class="form-input" placeholder="e.g., Recycling, Composting" required>
              </div>

              <button type="submit" class="btn-primary">Place Demand</button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.getElementById('signin-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.login();
    });

    document.getElementById('signup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.signup();
    });

    document.getElementById('request-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitPickupRequest();
    });

    document.getElementById('demand-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitMaterialDemand();
    });
  },

  login() {
    currentUser = { email: 'user@example.com' };
    this.navigateTo('home-page');
  },

  signup() {
    currentUser = { email: 'user@example.com' };
    this.navigateTo('home-page');
  },

  logout() {
    currentUser = null;
    this.navigateTo('signin-page');
  },

  initMap() {
    if (map) {
      map.remove();
    }

    const sidiBelAbbes = [35.1912, -0.6395];

    map = L.map('map').setView(sidiBelAbbes, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const locations = [
      { name: 'Restaurant Central', coords: [35.1912, -0.6395], type: '🏪' },
      { name: 'Hotel Sidi Bel Abbes', coords: [35.1950, -0.6350], type: '🏨' },
      { name: 'Boulangerie Modern', coords: [35.1880, -0.6420], type: '🍞' },
      { name: 'Recycling Center', coords: [35.1850, -0.6300], type: '🏭' }
    ];

    locations.forEach(location => {
      const icon = L.divIcon({
        html: `<div style="font-size: 24px;">${location.type}</div>`,
        className: 'custom-marker',
        iconSize: [30, 30]
      });

      L.marker(location.coords, { icon }).addTo(map)
        .bindPopup(`<b>${location.name}</b>`);
    });
  },

  openRequestModal() {
    document.getElementById('request-modal').classList.add('active');
  },

  openDemandModal() {
    document.getElementById('demand-modal').classList.add('active');
  },

  closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
  },

  submitPickupRequest() {
    alert('Pickup request submitted successfully! Our team will contact you soon.');
    this.closeModal('request-modal');
  },

  submitMaterialDemand() {
    alert('Material demand placed successfully! We will notify you when matches are found.');
    this.closeModal('demand-modal');
  },

  callPickupTeam() {
    if (confirm('Would you like to call the pickup team?')) {
      window.location.href = 'tel:+213XXXXXXXXX';
    }
  },

  callLocation() {
    if (confirm('Would you like to call this location?')) {
      window.location.href = 'tel:+213XXXXXXXXX';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
