const MENU_ITEMS = [
  {
    key: 'browse',
    text: 'Browse',
    href: '/projects',
    isProtected: false
  },
  {
    key: 'dashboard',
    text: 'Dashboard',
    href: '/dashboard',
    isProtected: true
  },
  {
    key: 'profile',
    text: 'Profile',
    href: '/profile',
    isProtected: true
  }
];

const NAV_CONFIGS = {
  browse: {
    label: 'Browse',
    icon: 'projects',
    isNew: true
  },
  dashboard: {
    label: 'Dashboard',
    icon: 'strategy'
  },
  profile: {
    label: 'Profile',
    icon: 'resume'
  }
};

export { MENU_ITEMS, NAV_CONFIGS };
