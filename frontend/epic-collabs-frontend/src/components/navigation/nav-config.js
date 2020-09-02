const MENU_ITEMS = [
  {
    key: 'browse',
    text: 'Browse',
    href: '/projects',
    isNew: true
  },
  {
    key: 'dashboard',
    text: 'Dashboard',
    href: '/dashboard'
  },
  {
    key: 'profile',
    text: 'Profile',
    href: '/profile'
  }
];

const NAV_CONFIGS = {
  browse: {
    label: 'Browse',
    icon: 'project'
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
