const COLORS = [
  '#FF649D',
  '#FF649D66',
  '#FF494966',
  '#FF4949',
  '#FF9B3366',
  '#FF9B33',
  '#FFDB1066',
  '#FFDB10',
  '#94E31966',
  '#94E319',
  '#19D687',
  '#19D68766',
  '#54DDDA',
  '#54DDDA66',
  '#3092FD',
  '#3092FD66',
  '#9059F4',
  '#9059F466',
  '#CA1DCE',
  '#CA1DCE66'
];
const TYPE_MAP = { 0: { color: 'orange', name: '固定' }, 1: { color: 'purple', name: '灵活' } };
const STATUS_MAP = { 0: { color: '', name: '关闭' }, 1: { color: 'red', name: '启用' } };

// list   map  filter reduce some find every forEach  sort

const COLOR_MAP = COLORS.reduce((obj, color, i) => ((obj[i + 1] = color), obj), {});
// {obj[i+1]=color;return obj;}
export { COLOR_MAP, TYPE_MAP, STATUS_MAP };
