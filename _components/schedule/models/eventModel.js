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
      title: 'CI5240 STA 2200 STD 0030 SC4',
      details: 'Everything is funny as long as it is happening to someone else',
      date: getCurrentDay(1),
      color: 'blue',
      STA: "22:00",
      STD: "00:30",
      flightNumber: "CI5240",
      gateId: "77",
      stationId: "3"
    },
    {
      id: 2,
      title: 'TK6435 STA 2205 STD 0015 SC14',
      details: 'Buy a nice present',
      date: getCurrentDay(4),
      color: 'green',
      STA: "22:05",
      STD: "00:15",
      flightNumber: "TK6435",
      gateId: "77",
      stationId: "3"
    },
    {
      id: 3,  
      title: 'GT8238 STA 2310 STD 1600 SC5',
      details: 'Time to pitch my idea to the company',
      date: getCurrentDay(8),
      time: '10:00',
      duration: 120,
      color: 'red',
      STA: "23:10",
      STD: "16:00",
      flightNumber: "GT8238",
      gateId: "77",
      stationId: "3"
    },
    {
      id: 4,  
      title: 'KZ134 STA 2320 STD 0140 NCA',
      details: 'Company is paying!',
      date: getCurrentDay(8),
      time: '11:30',
      duration: 90,
      color: 'red',
      STA: "23:20",
      STD: "01:40",
      flightNumber: "KZ134",
      gateId: "77",
      stationId: "3"
    },
    {
      id: 5,  
      title: 'NH8463 STA 1600 STD 1725 SC5',
      details: 'Always a nice chat with mom',
      date: getCurrentDay(20),
      time: '17:00',
      duration: 90,
      color: 'black',
      icon: 'fas fa-car',
      STA: "16:00",
      STD: "17:25",
      flightNumber: "NH8463",
      gateId: "77",
      stationId: "3"
    },
    {
      id: 6,  
      title: 'GT542 STA 2310 STD 2200+1 SC29',
      details: 'Teaching Javascript 101',
      date: getCurrentDay(15),
      time: '08:00',
      duration: 540,
      color: 'blue',
      icon: 'fas fa-chalkboard-teacher',
      STA: "23:10",
      STD: "22:00",
      flightNumber: "GT542",
      gateId: "77",
      stationId: "3"
    },
    {
      id: 7,  
      title: 'KZ134 STA 2155 STD 0200 NCA',
      details: 'Meet GF for dinner at Swanky Restaurant',
      date: getCurrentDay(15),
      time: '19:00',
      duration: 180,
      color: 'red',
      icon: 'fas fa-utensils',
      STA: "21:55",
      STD: "02:00",
      flightNumber: "KZ134",
      gateId: "77",
      stationId: "3"
    },
    {
      id: 8,  
      title: 'CI5236 STA 1730 STD 2000 SC18',
      details: 'Time for some weekend R&R',
      date: getCurrentDay(16),
      color: 'green',
      icon: 'rowing',
      days: 2,
      STA: "17:30",
      STD: "20:00",
      flightNumber: "CI5236",
      gateId: "77",
      stationId: "3"
    },
    {
      id: 9,  
      title: 'GT516 STA 1410 STD 1705 SC14',
      details: 'Trails and hikes, going camping! Don\'t forget to bring bear spray!',
      date: getCurrentDay(22),
      color: 'blue',
      icon: 'fas fa-plane',
      days: 7,
      STA: "14:10",
      STD: "17:05",
      flightNumber: "GT516",
      gateId: "77",
      stationId: "3"
    }
  ];