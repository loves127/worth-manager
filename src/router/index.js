import Config from '../config/index';

const Login = r => require.ensure([], () => r(require('../page/login/index')), 'login');
const Layout = r => require.ensure([], () => r(require('../page/layout')), 'layout');
// 快速入门
const Quick = r => require.ensure([], () => r(require('../page/quick/quick')), 'quick');

// 组织管理 -- 用户管理
const User = r => require.ensure([], () => r(require('../page/organization/user/index')), 'user');

// 组织管理 -- 公司管理
const Company = r => require.ensure([], () => r(require('../page/organization/company/index')), 'company');

// 组织管理 -- 部门管理
const Department = r => require.ensure([], () => r(require('../page/organization/department/index')), 'department');

// 组织管理 -- 岗位管理
const Post = r => require.ensure([], () => r(require('../page/organization/post/index')), 'post');

// 菜单管理
const Menu = r => require.ensure([],()=>r(require('../page/setting/menu/index'),'menu'));

// 权限管理
const Permission = r => require.ensure([],()=>r(require('../page/setting/permission/index'),'permission'));

// 角色管理
const Role = r => require.ensure([],()=>r(require('../page/setting/role/index'),'role'));

// 基本设置
const BaseSetting = r => require.ensure([],()=>r(require('../page/configuration/base/index'),'baseSetting'));

// 账户设置
const AccountSetting = r=> require.ensure([],()=>r(require('../page/configuration/account/index'),'accountSetting'));

// 收入管理
const Receipts =r => require.ensure([],()=>r(require('../page/financial/receipts/index'),'receipts'));

// 支出管理
const Expenses =r => require.ensure([],()=>r(require('../page/financial/expenses/index'),'expenses'));

// 转账记录
const TransferRecord = r => require.ensure([],()=>r(require('../page/financial/transfer-record/index'),'transfer-record'));

// 预算方案
const Budget = r => require.ensure([],()=>r(require('../page/financial/budget/index'),'budget'));

// 个人信息

// 修改密码

export default [{
  path: Config.route.login,
  name: 'Login',
  component: Login
}, {
  path: '/',
  name: 'Layout',
  component: Layout,
  children: [{
    path: '/quick',
    name: 'Quick',
    component: Quick,
    meta: {
      bcrumd: ['控制面板']
    }
  }, {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      bcrumd: ['组织管理', '用户管理']
    }
  }, {
    path: '/company',
    name: 'Company',
    component: Company,
    meta: {
      bcrumd: ['组织管理', '公司管理']
    }
  },{
    path: '/department',
    name: 'Department',
    component: Department,
    meta: {
      bcrumd: ['组织管理', '部门管理']
    }
  }, {
    path: '/post',
    name: 'Post',
    component: Post,
    meta: {
      bcrumd: ['组织管理', '岗位管理']
    }
  }, {
    path: '/receipts',
    name: 'Receipts',
    component: Receipts,
    meta: {
      bcrumd: ['收支管理', '收入管理']
    }
  }, {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
    meta: {
      bcrumd: ['收支管理', '支出管理']
    }
  }, {
    path: '/transferRecord',
    name: 'TransferRecord',
    component: TransferRecord,
    meta: {
      bcrumd: ['收支管理', '转账记录']
    }
  }, {
    path: '/budget',
    name: 'Budget',
    component: Budget,
    meta: {
      bcrumd: ['收支管理', '预算方案']
    }
  },{
    path: '/menu',
    name: 'Menu',
    component: Menu,
    meta: {
      bcrumd: ['系统设置', '菜单管理']
    }
  },{
    path: '/permission',
    name: 'Permission',
    component: Permission,
    meta: {
      bcrumd: ['系统设置', '权限管理']
    }
  },{ // 组织管理 -- 岗位管理
    path: '/role',
    name: 'Role',
    component: Role,
    meta: {
      bcrumd: ['系统设置', '角色管理']
    }
  },{
    path: '/baseSetting',
    name: 'BaseSetting',
    component: BaseSetting,
    meta: {
      bcrumd: ['信息设置', '基本设置']
    }
  },{
    path: '/accountSetting',
    name: 'AccountSetting',
    component: AccountSetting,
    meta: {
      bcrumd: ['信息设置', '账户设置']
    }
  }]
}, {
  path: '*',
  redirect: Config.route.login,
  name: 'Login',
  component: Login
}]
