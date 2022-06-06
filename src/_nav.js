export default {
  items: [
    {
      name: 'Dashboard',
      url: '/Dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Sales Panel',
      url: '/sales',
      icon: 'icon-speedometer'
    },
    // {
    //   title: true,
    //   name: 'Theme',
    //   class: '',
    //   wrapper: {
    //     element: '',
    //     attributes: {}
    //   }
    // },
    // {
    //   name: 'Colors',
    //   url: '/theme/colors',
    //   icon: 'icon-drop'
    // },
    // {
    //   name: 'Typography',
    //   url: '/theme/typography',
    //   icon: 'icon-pencil'
    // },
    {
      title: true,
      name: 'Accounts',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Accounts',
      url: '/Accounts',
      icon: 'icon-notebook',
      children: [
        {
          name: 'Banks',
          url: '/Accounts/Bank',
          icon: 'icon-puzzle'
        },
        {
          name: 'Incomes',
          url: '/Accounts/Income',
          icon: 'icon-puzzle'
        },
        {
          name: 'Income Categories',
          url: '/Accounts/Income/Category',
          icon: 'icon-puzzle'
        },
        {
          name: 'Expenses',
          url: '/Accounts/Expense',
          icon: 'icon-puzzle'
        },
        {
          name: 'Expense Categories',
          url: '/Accounts/Expense/Category',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      title: true,
      name: 'Products & Inventory',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Product',
      url: '/Product',
      icon: 'fa fa-cubes',
      children: [
        {
          name: 'List',
          url: '/Product/List',
          icon: 'fa fa-cubes'
        },
        {
          name: 'Category',
          url: '/Product/Category',
          icon: 'fa fa-sitemap'
        },
        {
          name: 'Brand',
          url: '/Product/Brand',
          icon: 'fa fa-btc'
        },
        {
          name: 'Distribute',
          url: '/Product/Distribute',
          icon: 'fa fa-share'
        },
        {
          name: 'Barcode',
          url: '/Product/Barcode',
          icon: 'fa fa-barcode'
        },
        {
          name: 'QR Code',
          url: '/Product/QRCode',
          icon: 'fa fa-qrcode'
        },
        {
          name: 'Inventory',
          url: '/Product/Inventory',
          icon: 'fa fa-search'
        },
        {
          name: 'Waste',
          url: '/Waste',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Purchase',
      url: 'Purchase',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Purchase',
          url: '/Purchase',
          icon: 'fa fa-truck'
        },
        {
          name: 'Purchase Order',
          url: '/Purchase/Order',
          icon: 'icon-puzzle'
        },
        {
          name: 'Purchase Return',
          url: '/Purchase/Return',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      title: true,
      name: 'Vendor & Customer',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Contacts',
      url: '/Contacts',
      icon: 'fa fa-cubes'
    },
    {
      name: 'Employee',
      url: '/Employee',
      icon: 'fa fa-cubes'
    },
    {
      name: 'User',
      url: '/User',
      icon: 'fa fa-cubes',
      children: [
        {
          name: 'New',
          url: '/User/New',
          icon: 'fa fa-cube'
        },
        {
          name: 'List',
          url: '/User/List',
          icon: 'fa fa-cubes'
        },
        {
          name: 'Role',
          url: '/User/Role',
          icon: 'fa fa-cubes'
        }
      ]
    },
    {
      title: true,
      name: 'Shops',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Shops',
      url: '/Shop',
      icon: 'icon-home',
      children: [
        {
          name: 'Shop List',
          url: '/Shop/List',
          icon: 'icon-bag'
        },
        {
          name: 'Shop Floor',
          url: '/Shop/Floor',
          icon: 'icon-bag'
        },
        {
          name: 'Taxes',
          url: '/Shop/Taxes',
          icon: 'icon-bag'
        },
        {
          name: 'Shop Terminal',
          url: '/Shop/Terminal',
          icon: 'icon-bag'
        },
        {
          name: 'Shop Notice',
          url: '/Shop/Notice',
          icon: 'icon-bag'
        }
      ]
    }
    // {
    //   name: 'Base',
    //   url: '/base',
    //   icon: 'icon-puzzle',
    //   children: [
    //     {
    //       name: 'Breadcrumbs',
    //       url: '/base/breadcrumbs',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Cards',
    //       url: '/base/cards',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Carousels',
    //       url: '/base/carousels',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Collapses',
    //       url: '/base/collapses',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Forms',
    //       url: '/base/forms',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Jumbotrons',
    //       url: '/base/jumbotrons',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'List Groups',
    //       url: '/base/list-groups',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Navs',
    //       url: '/base/navs',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Paginations',
    //       url: '/base/paginations',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Popovers',
    //       url: '/base/popovers',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Progress Bars',
    //       url: '/base/progress-bars',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Switches',
    //       url: '/base/switches',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tables',
    //       url: '/base/tables',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tooltips',
    //       url: '/base/tooltips',
    //       icon: 'icon-puzzle'
    //     }
    //   ]
    // },
    // {
    //   name: 'Buttons',
    //   url: '/buttons',
    //   icon: 'icon-cursor',
    //   children: [
    //     {
    //       name: 'Standard Buttons',
    //       url: '/buttons/standard-buttons',
    //       icon: 'icon-cursor'
    //     },
    //     {
    //       name: 'Button Groups',
    //       url: '/buttons/button-groups',
    //       icon: 'icon-cursor'
    //     },
    //     {
    //       name: 'Dropdowns',
    //       url: '/buttons/dropdowns',
    //       icon: 'icon-cursor'
    //     },
    //     {
    //       name: 'Social Buttons',
    //       url: '/buttons/social-buttons',
    //       icon: 'icon-cursor'
    //     }
    //   ]
    // },
    // {
    //   name: 'Icons',
    //   url: '/icons',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Flags',
    //       url: '/icons/flags',
    //       icon: 'icon-star',
    //       badge: {
    //         variant: 'success',
    //         text: 'NEW'
    //       }
    //     },
    //     {
    //       name: 'Font Awesome',
    //       url: '/icons/font-awesome',
    //       icon: 'icon-star',
    //       badge: {
    //         variant: 'secondary',
    //         text: '4.7'
    //       }
    //     },
    //     {
    //       name: 'Simple Line Icons',
    //       url: '/icons/simple-line-icons',
    //       icon: 'icon-star'
    //     }
    //   ]
    // },
    // {
    //   name: 'Charts',
    //   url: '/charts',
    //   icon: 'icon-pie-chart'
    // },
    // {
    //   name: 'Notifications',
    //   url: '/notifications',
    //   icon: 'icon-bell',
    //   children: [
    //     {
    //       name: 'Alerts',
    //       url: '/notifications/alerts',
    //       icon: 'icon-bell'
    //     },
    //     {
    //       name: 'Badges',
    //       url: '/notifications/badges',
    //       icon: 'icon-bell'
    //     },
    //     {
    //       name: 'Modals',
    //       url: '/notifications/modals',
    //       icon: 'icon-bell'
    //     }
    //   ]
    // },
    // {
    //   name: 'Widgets',
    //   url: '/widgets',
    //   icon: 'icon-calculator',
    //   badge: {
    //     variant: 'primary',
    //     text: 'NEW'
    //   }
    // },
    // {
    //   divider: true
    // },
    // {
    //   title: true,
    //   name: 'Extras'
    // },
    // {
    //   name: 'Pages',
    //   url: '/pages',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Login',
    //       url: '/pages/login',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Register',
    //       url: '/pages/register',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Error 404',
    //       url: '/pages/404',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Error 500',
    //       url: '/pages/500',
    //       icon: 'icon-star'
    //     }
    //   ]
    // }
  ]
}
