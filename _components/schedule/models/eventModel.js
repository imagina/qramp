import QCalendar from "@quasar/quasar-ui-qcalendar";
const CURRENT_DAY = new Date()

function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = QCalendar.parseDate(newDay)
  return tm.date
}

const reRGBA = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/

function textToRgb (color) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string')
  }

  const m = reRGBA.exec(color)
  if (m) {
    const rgb = {
      r: Math.min(255, parseInt(m[2], 10)),
      g: Math.min(255, parseInt(m[3], 10)),
      b: Math.min(255, parseInt(m[4], 10))
    }
    if (m[1]) {
      rgb.a = Math.min(1, parseFloat(m[5]))
    }
    return rgb
  }
  return hexToRgb(color)
}

function hexToRgb (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }

  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  const num = parseInt(hex, 16)

  return hex.length > 6
    ? { r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55) }
    : { r: num >> 16, g: num >> 8 & 255, b: num & 255 }
}

function luminosity (color) {
  if (typeof color !== 'string' && (!color || color.r === undefined)) {
    throw new TypeError('Expected a string or a {r, g, b} object as color')
  }

  const
    rgb = typeof color === 'string' ? textToRgb(color) : color,
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
    G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
    B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export default [
    {
      id: 1,  
      title: '1st of the Month',
      details: 'Everything is funny as long as it is happening to someone else',
      date: getCurrentDay(1),
      bgcolor: 'orange'
    },
    {
      id: 2,
      title: 'Sisters Birthday',
      details: 'Buy a nice present',
      date: getCurrentDay(4),
      bgcolor: 'green',
      icon: 'fas fa-birthday-cake'
    },
    {
      id: 3,  
      title: 'Meeting',
      details: 'Time to pitch my idea to the company',
      date: getCurrentDay(8),
      time: '10:00',
      duration: 120,
      bgcolor: 'red',
      icon: 'fas fa-handshake'
    },
    {
      id: 4,  
      title: 'Lunch',
      details: 'Company is paying!',
      date: getCurrentDay(8),
      time: '11:30',
      duration: 90,
      bgcolor: 'teal',
      icon: 'fas fa-hamburger'
    },
    {
      id: 5,  
      title: 'Visit mom',
      details: 'Always a nice chat with mom',
      date: getCurrentDay(20),
      time: '17:00',
      duration: 90,
      bgcolor: 'blue-grey',
      icon: 'fas fa-car'
    },
    {
      id: 6,  
      title: 'Conference',
      details: 'Teaching Javascript 101',
      date: getCurrentDay(15),
      time: '08:00',
      duration: 540,
      bgcolor: 'blue',
      icon: 'fas fa-chalkboard-teacher'
    },
    {
      id: 7,  
      title: 'Girlfriend',
      details: 'Meet GF for dinner at Swanky Restaurant',
      date: getCurrentDay(15),
      time: '19:00',
      duration: 180,
      bgcolor: 'teal',
      icon: 'fas fa-utensils'
    },
    {
      id: 8,  
      title: 'Rowing',
      details: 'Time for some weekend R&R',
      date: getCurrentDay(16),
      bgcolor: 'purple',
      icon: 'rowing',
      days: 2
    },
    {
      id: 9,  
      title: 'Vacation',
      details: 'Trails and hikes, going camping! Don\'t forget to bring bear spray!',
      date: getCurrentDay(22),
      bgcolor: 'purple',
      icon: 'fas fa-plane',
      days: 7
    }
  ];