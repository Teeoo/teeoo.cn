module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:      新增功能'
    },
    {
      value: 'fix',
      name: 'fix:       修复BUG'
    },
    {
      value: 'docs',
      name: 'docs:      文档修改'
    },
    {
      value: 'style',
      name: 'style:     修改代码格式'
    },
    {
      value: 'test',
      name: 'test:      测试用例相关'
    },
    {
      value: 'build',
      name: 'build:     变更项目构建或外部依赖'
    },
    {
      value: 'refactor',
      name: 'refactor:  代码重构'
    },
    {
      value: 'revert',
      name: 'revert:    撤销'
    }
  ],

  scopes: [
    { name: 'react' },
    { name: 'sdk' },
    { name: 'vue' },
    { name: 'other' }
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',
  messages: {
    type: '选择您要提交的更改类型：',
    scope: '\n更改的范围（可选）：',
    // used if allowCustomScopes is true
    customScope: '更改的范围：',
    subject: '撰写简短的变更描述：\n',
    body: '撰写更改的详细描述（可选）， 使用“ |” 换行:\n',
    breaking: '不兼容变动（可选）:\n',
    footer: 'ISSUES CLOSED (可选). 例: #31, #34:\n',
    confirmCommit: '是否要继续提交？'
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100
}
