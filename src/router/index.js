import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'

import Colors from '@/views/theme/Colors'
import Typography from '@/views/theme/Typography'

import Charts from '@/views/Charts'
import Widgets from '@/views/Widgets'
// Views - Components
import Cards from '@/views/base/Cards'
import Forms from '@/views/base/Forms'
import Switches from '@/views/base/Switches'
import Tables from '@/views/base/Tables'
import Breadcrumbs from '@/views/base/Breadcrumbs'
import Carousels from '@/views/base/Carousels'
import Collapses from '@/views/base/Collapses'
import Jumbotrons from '@/views/base/Jumbotrons'
import ListGroups from '@/views/base/ListGroups'
import Navs from '@/views/base/Navs'
import Navbars from '@/views/base/Navbars'
import Paginations from '@/views/base/Paginations'
import Popovers from '@/views/base/Popovers'
import ProgressBars from '@/views/base/ProgressBars'
import Tooltips from '@/views/base/Tooltips'

// Views - Buttons
import StandardButtons from '@/views/buttons/StandardButtons'
import ButtonGroups from '@/views/buttons/ButtonGroups'
import Dropdowns from '@/views/buttons/Dropdowns'
import SocialButtons from '@/views/buttons/SocialButtons'

// Views - Icons
import Flags from '@/views/icons/Flags'
import FontAwesome from '@/views/icons/FontAwesome'
import SimpleLineIcons from '@/views/icons/SimpleLineIcons'

// Views - Notifications
import Alerts from '@/views/notifications/Alerts'
import Badges from '@/views/notifications/Badges'
import Modals from '@/views/notifications/Modals'

// Views - Pages
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Login from '@/views/pages/Login'
import Register from '@/views/pages/Register'

// Views - Sales
import Sales from '@/views/sales/Sales'

// Views - Product
import ProductList from '@/views/product/list'
import ProductLedger from '@/views/product/ledger/list'
import ProductBarCode from '@/views/product/barcode/index'
import ProductNew from '@/views/product/new'
import ProductCategory from '@/views/product/category'
import ProductDistribute from '@/views/product/distribute/new'
import ProductBrand from '@/views/product/brand'
import PurchaseOrderNew from '@/views/product/purchase/order/new'
import PurchaseReceiveNew from '@/views/product/purchase/receive/new'
import PurchaseReceiveList from '@/views/product/purchase/receive/list'
import PurchaseOrderList from '@/views/product/purchase/order/list'
import PurchaseReturnList from '@/views/product/purchase/return/list'
import PurchaseReturnNew from '@/views/product/purchase/return/new'

// Views - Accounts
import Income from '@/views/accounts/income/index'
import IncomeCategory from '@/views/accounts/income/category'
import Expense from '@/views/accounts/expense/index'
import ExpenseCategory from '@/views/accounts/expense/category'

// Views - Banks
import BankList from '@/views/bank/index'
import BankLedger from '@/views/bank/ledger/list'

// Views - Customers
import CustomerList from '@/views/customer/list'
import CustomerNew from '@/views/customer/new'

// Views - Contacts
import ContactList from '@/views/contacts/index'
import ContactLedger from '@/views/contacts/ledger/list'

// Views - Employee
import EmployeList from '@/views/employee/index'
import EmployeLedger from '@/views/employee/ledger/list'

// Views - Shop
import ShopList from '@/views/shop/index'
import ShopFloor from '@/views/shop/floor'
import Taxes from '@/views/shop/tax'
import ShopTerminal from '@/views/shop/terminal'
import ShopNotice from '@/views/shop/notice'

// Views - User
import UserRole from '@/views/users/roles/RoleCategory'
import UserRoleAssignment from '@/views/users/roles/RoleAssignment'
import UserList from '@/views/users/List'

// Views - Sales
import SalesPanel from '@/views/sales/SalesPanel'

Vue.use(Router)

export default new Router({

  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'sales',
          name: 'SalesPanel',
          component: SalesPanel
        },
        {
          path: 'Employee',
          name: 'Employee',
          component: EmployeList
        },
        {
          path: 'Employee/Ledger/:id',
          name: 'EmployeeLedger',
          component: EmployeLedger
        },
        {
          path: 'Sales',
          name: 'Sales',
          component: Sales
        },
        {
          path: 'User',
          redirect: '/User/List',
          name: 'User',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'List/',
              name: 'UserList',
              component: UserList
            },
            {
              path: 'Role',
              name: 'UserRole',
              component: UserRole
            },
            {
              path: 'Role/:id',
              name: 'UserRoleAssignment',
              component: UserRoleAssignment
            }
          ]
        },
        {
          path: 'Product',
          redirect: '/Product/List',
          name: 'Product',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'New',
              name: 'NewProduct',
              component: ProductNew
            },
            {
              path: 'Barcode',
              name: 'BarCode',
              component: ProductBarCode
            },
            {
              path: 'Ledger/:id',
              name: 'ProductLedger',
              component: ProductLedger
            },
            {
              path: 'List',
              name: 'ProductList',
              component: ProductList
            },
            {
              path: 'Category',
              name: 'ProductCategory',
              component: ProductCategory
            },
            {
              path: 'Distribute',
              name: 'ProductDistribute',
              component: ProductDistribute

            },
            {
              path: 'Brand',
              name: 'ProductBrand',
              component: ProductBrand
            }
          ]
        },
        {
          path: 'Purchase',
          name: 'ProductPurchase',
          redirect: '/Purchase/List',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'List',
              name: 'PurchaseList',
              component: PurchaseReceiveList
            },
            {
              path: 'New',
              name: 'NewPurchaseReceive',
              component: PurchaseReceiveNew
            },
            {
              path: 'Order',
              name: 'PurchaseOrder',
              redirect: '/Purchase/Order/List',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: 'List',
                  name: 'PurchaseOrderList',
                  component: PurchaseOrderList

                },
                {
                  path: 'New',
                  name: 'NewPurchaseOrder',
                  component: PurchaseOrderNew
                }
              ]
            },
            {
              path: 'Return',
              name: 'PurchaseReturn',
              redirect: '/Purchase/Return/List',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: 'List',
                  name: 'PurchaseReturnList',
                  component: PurchaseReturnList
                },
                {
                  path: 'New',
                  name: 'PurchaseReturnNew',
                  component: PurchaseReturnNew
                }
              ]
            }
          ]
        },
        {
          path: 'Accounts',
          redirect: '/Accounts/Income',
          name: 'Accounts',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'Bank',
              name: 'Banks',
              component: BankList
            },
            {
              path: 'Bank/Ledger/:id',
              name: 'BankLedger',
              component: BankLedger
            },
            {
              path: 'Income',
              name: 'Income',
              component: Income
            },
            {
              path: 'Income/Category',
              name: 'IncomeCategory',
              component: IncomeCategory
            },
            {
              path: 'Expense',
              name: 'Expense',
              component: Expense
            },
            {
              path: 'Expense/Category',
              name: 'ExpenseCategory',
              component: ExpenseCategory
            }
          ]
        },
        {
          path: 'Customer',
          redirect: '/Customers/List',
          name: 'Customers',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'List',
              name: 'Customer List',
              component: CustomerList
            },
            {
              path: 'New',
              name: 'Customer New',
              component: CustomerNew
            }
          ]
        },
        {
          path: 'Contacts',
          name: 'Contact',
          component: ContactList
        },
        {
          path: 'Contact/Ledger/:id',
          name: 'ContactLedger',
          component: ContactLedger
        },
        {
          path: 'Shop',
          redirect: '/Shop/List',
          name: 'Shops',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'List',
              name: 'Shop List',
              component: ShopList
            },
            {
              path: 'Floor',
              name: 'Shop Floor',
              component: ShopFloor
            },
            {
              path: 'Terminal',
              name: 'Shop Terminal',
              component: ShopTerminal
            },
            {
              path: 'Notice',
              name: 'Shop Notice',
              component: ShopNotice
            },
            {
              path: 'Taxes',
              name: 'Taxes',
              component: Taxes
            }
          ]
        },
        // {
        //   path: 'User',
        //   redirect: '/User/Role',
        //   name: 'Users',
        //   component: {
        //     render (c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'Role',
        //       name: 'UserRole',
        //       component: UserRole
        //     }
        //   ]
        // },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'social-buttons',
              name: 'Social Buttons',
              component: SocialButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
    // {
    //   path: '/Product',
    //   redirect: '/Product/New',
    //   name: 'ProductNew',
    //   // component: 'Product'
    //   component: {
    //     render (c) { return c('router-view') }
    //   }
    //   // children: [
    //   //   {
    //   //     path: 'New',
    //   //     name: 'ProductNew',
    //   //     component: 'ProductNew'
    //   //   }
    //   // ]
    // }
  ]
})
