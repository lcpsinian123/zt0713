const options = [],
  // 品牌  苹果
  // 系列   iPhone7  iPhone8   iPhoneX
  // 内存   64G      128G       256G 
  options = [{
    value: 'apple',
    label: 'Apple',
    children: {
      value: 'iphone7',
      label: 'iphone7',
      children: [{
          value: '2000',
          label: '32G',
        },
        {
          value:'3000',
          label:'64G',  
        }
      ]
    }
  }]
