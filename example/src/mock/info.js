export const header = [
  {
    key: 'qu_zong_tuan_dui',
    // name: '区总团队',

    children: [
      {
        name: '区总团队'
      },
      {
        name: '职位'
      }
    ],
    width: '180'
  },
  {
    key: 'gao_ji_ying_ye',
    name: '高级营业'
  },
  {
    key: 'ke_hu_jing_li',
    name: '客户经理'
  },
  {
    key: 'gao_ji_wu_ye',
    name: '高级物业'
  },
  {
    key: 'shi_xi_sheng',
    name: '实习生'
  },
  {
    key: 'he_ji',
    name: '合计'
  },
  {
    key: 'pai_qian',
    name: '派遣'
  }
];
export const body = [
  {
    qu_zong_tuan_dui: {
      name: '张三',
      combine: true,
      children: [
        {
          name: '直属'
        }
      ]
    },
    gao_ji_ying_ye: 5,
    ke_hu_jing_li: 0,
    gao_ji_wu_ye: 51,
    shi_xi_sheng: 0,
    he_ji: 56,
    pai_qian: 'xx部门'
  },
  {
    qu_zong_tuan_dui: {
      name: '张三',
      combine: true,
      children: [
        {
          name: '李四'
        }
      ]
    },
    gao_ji_ying_ye: 0,
    ke_hu_jing_li: 1,
    gao_ji_wu_ye: 24,
    shi_xi_sheng: 1,
    he_ji: 26,
    pai_qian: 'xx部门11'
  },
  {
    qu_zong_tuan_dui: {
      name: '张三',
      combine: false,
      children: [
        {
          name: '王五'
        }
      ]
    },
    gao_ji_ying_ye: 0,
    ke_hu_jing_li: 1,
    gao_ji_wu_ye: 20,
    shi_xi_sheng: 1,
    he_ji: 21,
    pai_qian: 'xx部门'
  },
  {
    qu_zong_tuan_dui: '赵大',
    gao_ji_ying_ye: 0,
    ke_hu_jing_li: 1,
    gao_ji_wu_ye: 24,
    shi_xi_sheng: 1,
    he_ji: 26,
    pai_qian: 'xx部门'
  },
  {
    qu_zong_tuan_dui: {
      name: '张三11',
      combine: true,
      children: [
        {
          name: '李四22'
        }
      ]
    },
    gao_ji_ying_ye: 0,
    ke_hu_jing_li: 1,
    gao_ji_wu_ye: 24,
    shi_xi_sheng: 1,
    he_ji: 26,
    pai_qian: 'xx部门'
  },
  {
    qu_zong_tuan_dui: {
      name: '张三11',
      combine: true,
      children: [
        {
          name: '王五22'
        }
      ]
    },
    gao_ji_ying_ye: 0,
    ke_hu_jing_li: 1,
    gao_ji_wu_ye: 20,
    shi_xi_sheng: 1,
    he_ji: 21,
    pai_qian: 'xx部门'
  },
  {
    qu_zong_tuan_dui: {
      name: '张三',
      combine: true,
      children: [
        {
          name: '李四111'
        }
      ]
    },
    gao_ji_ying_ye: 0,
    ke_hu_jing_li: 1,
    gao_ji_wu_ye: 24,
    shi_xi_sheng: 1,
    he_ji: 26,
    pai_qian: 'xx部门'
  },
  {
    qu_zong_tuan_dui: {
      name: '张三',
      combine: true,
      children: [
        {
          name: '王五111'
        }
      ]
    },
    gao_ji_ying_ye: 0,
    ke_hu_jing_li: 1,
    gao_ji_wu_ye: 20,
    shi_xi_sheng: 1,
    pai_qian: 'xx部门',
    he_ji: 21,
  }
];
export const footer = [
  {
    key: 'qu_zong_tuan_dui',
    name: '合计'
  },
  {
    key: 'gao_ji_ying_ye',
    name: '7'
  },
  {
    key: 'ke_hu_jing_li',
    name: '3'
  },
  {
    key: 'gao_ji_wu_ye',
    name: '193'
  },
  {
    key: 'shi_xi_sheng',
    name: '1'
  },
  {
    key: 'he_ji',
    name: '204'
  },
  {
    key: 'pai_qian',
    name: ''
  }
];
export default {
  header,
  body,
  footer
};
