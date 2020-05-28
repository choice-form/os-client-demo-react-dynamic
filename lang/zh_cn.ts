const zhCN = {
  locate: {
    click: '点击进行定位',
    doing: '正在定位...',
    success: '定位成功',
    failed: '定位失败',
    timeout: '定位超时',
  },
  reward: {
    wechat: '微信红包奖励',
    custom: "保留核销码或凭手机获取短信作为领奖凭证",
  },
  slideRate: {
    prev: '上一项',
    next: '下一项'
  },
  verification: {
    inputPhone: '请输入手机号',
    inputCode: '请输入验证码',
    getCapture: '获取图形验证码',
    inputPswd: '请输入密码',
    getMessage: '获取短信验证码'
  },
  preview: {
    title: '预览测试',
    bookmark: {
      title: '书签',
      input: '输入书签名',
      add: '添加书签',
      about: '关于书签',
      apply: '转到书签',
      delete: '删除书签',
      detail: '书签可以将已经回复过的问题的答案记录下来，当再次预览这份问卷时，加载书签可以自动加载保存的回复内容并跳转至保存书签时所在的题目。',
      history: '历史回滚',
      historyDetail: '回复的过程中，预览模块会暂存每一题的答案，点击回滚按钮可以快速回滚至对应的问题，并保留回复内容。',
      revertTo: '还原至该题'
    },
    time: {
      title: '时间',
      upload: '上传预览时间',
      input: '输入测试用户的名称',
      about: '关于时间',
      detail: '大多数用户会在调查问卷中使用计时功能。邀请更多的测试用户测试问卷，并上传回复的时间记录，可以更合理的设置计时功能。',
      total: '总耗时',
      cost: '{amount}秒'
    },
    noView: '无视图节点,答题过程中不会显示',
  }
}

type ILang = typeof zhCN;