// cron 正则表达式
export const CRON_EXPE = "^\\s*($|#|\\w+\\s*=|(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\)(?:[0-5]?\\d))?(?:(?:[0-5]?\\d)(?:(?:-|\\/|\\)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\)(?:[0-5]?\\d))?(?:(?:[0-5]?\\d)(?:(?:-|\\/|\\)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\)(?:[01]?\\d|2[0-3]))?(?:(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\)(?:[01]?\\d|2[0-3]))?)*)\\s+(\\?|\\*|(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\)(?:0?[1-9]|[12]\\d|3[01]))?(?:(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\)(?:0?[1-9]|[12]\\d|3[01]))?)*)\\s+(\\?|\\*|(?:[1-9]|1[012])(?:(?:-|\\/|\\)(?:[1-9]|1[012]))?(?:L|W)?(?:(?:[1-9]|1[012])(?:(?:-|\\/|\\)(?:[1-9]|1[012]))?(?:L|W)?)*|\\?|\\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\\s+(\\?|\\*|(?:[0-6])(?:(?:-|\\/|\\|#)(?:[0-6]))?(?:L)?(?:(?:[0-6])(?:(?:-|\\/|\\|#)(?:[0-6]))?(?:L)?)*|\\?|\\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\\s)+(\\?|\\*|(?:|\\d{4})(?:(?:-|\\/|\\)(?:|\\d{4}))?(?:(?:|\\d{4})(?:(?:-|\\/|\\)(?:|\\d{4}))?)*))$";


export const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const customStyleBackToTop = {
  right: '50px',
  bottom: '100px',
  width: '40px',
  height: '40px',
  'border-radius': '4px',
  'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
   background: '#e7eaf1',// 按钮的背景颜色 The background color of the button
 'box-shadow':'0 0 6px rgba(0,0,0, .12)'
}