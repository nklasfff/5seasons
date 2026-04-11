// Maps a season id to its CSS variable wrapper class (defined in index.css)
export function seasonClass(id) {
  switch (id) {
    case 'spring':
      return 'spring'
    case 'summer':
      return 'summer'
    case 'late_summer':
      return 'lsummer'
    case 'autumn':
      return 'autumn'
    case 'winter':
      return 'winter'
    default:
      return 'spring'
  }
}
