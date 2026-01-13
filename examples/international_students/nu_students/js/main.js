import { studentData, transformToProgramFirst, calculateTotal, programColors } from './data.js';
import { TreemapVisualization } from './treemap.js';

class App {
    constructor() {
        this.treemap = null;
        this.currentHierarchy = 'campus';
        this.currentData = studentData;
        this.totalStudents = calculateTotal(studentData);
        
        this.init();
    }

    init() {
        // Initialize treemap
        this.treemap = new TreemapVisualization('treemap', 'tooltip');
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initial render
        this.render();
        
        // Update stats
        this.updateStats();
        
        // Create legend
        this.createLegend();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    setupEventListeners() {
        // Hierarchy toggle buttons
        document.getElementById('campusFirst').addEventListener('click', () => {
            this.switchHierarchy('campus');
        });

        document.getElementById('programFirst').addEventListener('click', () => {
            this.switchHierarchy('program');
        });
    }

    switchHierarchy(mode) {
        if (this.currentHierarchy === mode) return;
        
        this.currentHierarchy = mode;
        
        // Update button states
        document.querySelectorAll('.hierarchy-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (mode === 'campus') {
            document.getElementById('campusFirst').classList.add('active');
            this.currentData = studentData;
            this.treemap.setHierarchyMode('campus');
        } else {
            document.getElementById('programFirst').classList.add('active');
            this.currentData = transformToProgramFirst(studentData);
            this.treemap.setHierarchyMode('program');
        }
        
        this.render();
    }

    render() {
        this.treemap.render(this.currentData);
    }

    updateStats() {
        document.getElementById('totalStudents').textContent = 
            this.totalStudents.toLocaleString();
    }

    createLegend() {
        const legendItems = document.getElementById('legendItems');
        
        const programs = [
            { name: "Master's Programs (MS)", color: programColors["Master's"] },
            { name: "Undergraduate Programs (UG)", color: programColors["Undergraduate"] }
        ];
        
        programs.forEach(program => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            
            const color = document.createElement('div');
            color.className = 'legend-color';
            color.style.backgroundColor = program.color;
            
            const label = document.createElement('span');
            label.className = 'legend-label';
            label.textContent = program.name;
            
            item.appendChild(color);
            item.appendChild(label);
            legendItems.appendChild(item);
        });
    }

    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            this.treemap.resize();
            this.render();
        }, 250);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new App());
} else {
    new App();
}
