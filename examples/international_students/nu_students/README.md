# NU Students Distribution - Interactive Treemap

An interactive D3.js treemap visualization showing Northeastern University student distribution across campuses and programs.

## Features

- **Dynamic Hierarchy Switching**: Toggle between Campus → Program and Program → Campus views
- **Interactive Tooltips**: Hover over any section to see detailed information
- **Color-Coded Programs**: Master's programs in red, Undergraduate programs in blue
- **Responsive Design**: Works on desktop and mobile devices
- **Clean Architecture**: Modular JavaScript with proper separation of concerns

## File Structure

```
nu_students/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # All styles and responsive design
├── js/
│   ├── main.js            # Application entry point and orchestration
│   ├── treemap.js         # D3.js treemap visualization logic
│   └── data.js            # Data structure and transformation utilities
└── README.md              # This file
```

## Data Insights

### Total Students: 10,613

### Top Campuses:
1. **Boston**: 6,431 students (60.5% of total)
   - 2,259 MS + 4,172 UG
   - Flagship campus dominance

2. **Seattle**: 537 students (5.1%)
   - All Master's programs
   - Strong tech industry connection

3. **Silicon Valley**: 519 students (4.9%)
   - All Master's programs
   - Tech hub presence

### Program Distribution:
- **Master's Programs**: 5,584 students (52.6%)
- **Undergraduate Programs**: 5,029 students (47.4%)

### Campus Types:
- **Physical Campuses**: 9,707 students (91.5%)
- **Online Programs**: 452 students (4.3%)
- **Special Programs**: 114 students (1.1%)

### Geographic Reach:
- 10 US cities
- 2 international locations (Vancouver, London)
- Online programs reaching students globally

## How to Use

1. **Open the visualization**:
   - Simply open `index.html` in a modern web browser
   - Or use a local server: `python -m http.server 8000`

2. **Switch Hierarchies**:
   - Click "Campus → Program" to see campuses broken down by program type
   - Click "Program → Campus" to see programs broken down by campus

3. **Explore Data**:
   - Hover over any rectangle to see detailed information
   - Larger rectangles = more students
   - Colors indicate program type (red = MS, blue = UG)

## Technical Stack

- **D3.js v7**: For data visualization and treemap layout
- **Vanilla JavaScript**: ES6 modules for clean, modular code
- **CSS3**: Modern styling with flexbox and grid
- **No build tools required**: Runs directly in the browser

## Key Insights Revealed

1. **Boston's Dominance**: Boston campus represents over 60% of total enrollment
2. **West Coast Expansion**: Significant presence in Seattle, Silicon Valley, Portland, Oakland
3. **MS Focus in Tech Hubs**: West Coast campuses are primarily Master's programs
4. **Diverse UG Programs**: Undergrad programs concentrated in Boston, Oakland, and special programs
5. **Growing Online Presence**: 452 students in online MS programs (Align + Online)

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Future Enhancements

Potential additions:
- Historical data comparison
- Program-specific filtering
- Export to PNG/SVG
- Drill-down animations
- Search functionality
- Data update over time

---

Built with ❤️ using D3.js and Vanilla JavaScript
