import { getColorForProgram } from './data.js';

export class TreemapVisualization {
    constructor(containerId, tooltipId) {
        this.container = d3.select(`#${containerId}`);
        this.tooltip = d3.select(`#${tooltipId}`);
        this.svg = null;
        this.width = 0;
        this.height = 0;
        this.hierarchyMode = 'campus'; // 'campus' or 'program'
        
        this.init();
    }

    init() {
        // Get container dimensions
        const containerElement = this.container.node();
        this.width = containerElement.clientWidth;
        this.height = containerElement.clientHeight;

        // Clear any existing SVG
        this.container.selectAll('*').remove();

        // Create SVG
        this.svg = this.container
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('id', 'treemap');

        // Create main group for treemap
        this.mainGroup = this.svg.append('g')
            .attr('class', 'treemap-group');
    }

    render(data) {
        // Create hierarchy
        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        // Create treemap layout
        const treemap = d3.treemap()
            .size([this.width, this.height])
            .padding(2)
            .round(true);

        treemap(root);

        // Clear previous render
        this.mainGroup.selectAll('*').remove();

        // Create groups for each node
        const nodes = this.mainGroup
            .selectAll('.node')
            .data(root.leaves())
            .join('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x0},${d.y0})`);

        // Add rectangles
        nodes.append('rect')
            .attr('class', 'node-rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', d => this.getNodeColor(d))
            .attr('opacity', 0.9);

        // Add text labels for larger nodes
        nodes.each((d, i, elements) => {
            const node = d3.select(elements[i]);
            const width = d.x1 - d.x0;
            const height = d.y1 - d.y0;
            const minSize = 50; // Minimum size to show text

            if (width > minSize && height > minSize) {
                const textGroup = node.append('g')
                    .attr('class', 'node-text-group');

                // Campus/Program name
                textGroup.append('text')
                    .attr('class', 'node-label')
                    .attr('x', width / 2)
                    .attr('y', height / 2 - 5)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                    .style('font-size', this.getFontSize(width, height, d.data.name))
                    .text(this.getTruncatedText(d.data.name, width));

                // Value
                textGroup.append('text')
                    .attr('class', 'node-value')
                    .attr('x', width / 2)
                    .attr('y', height / 2 + 15)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                    .style('font-size', this.getFontSize(width, height, d.value.toString(), 0.8))
                    .text(d.value.toLocaleString());
            }
        });

        // Add interactivity
        nodes
            .on('mouseover', (event, d) => this.showTooltip(event, d))
            .on('mousemove', (event) => this.moveTooltip(event))
            .on('mouseout', () => this.hideTooltip())
            .on('click', (event, d) => this.handleClick(event, d));
    }

    getNodeColor(d) {
        // Determine color based on program type
        const programName = d.data.program || d.data.name;
        return getColorForProgram(programName);
    }

    getFontSize(width, height, text, scale = 1) {
        const area = width * height;
        const baseSize = Math.sqrt(area) / 10;
        const maxSize = 16;
        const minSize = 10;
        
        let fontSize = Math.max(minSize, Math.min(maxSize, baseSize * scale));
        
        // Adjust based on text length
        const charWidth = fontSize * 0.6;
        const maxChars = width / charWidth;
        if (text.length > maxChars) {
            fontSize *= maxChars / text.length;
        }
        
        return Math.max(minSize, fontSize) + 'px';
    }

    getTruncatedText(text, width) {
        const charWidth = 8; // Approximate character width
        const maxChars = Math.floor(width / charWidth);
        
        if (text.length <= maxChars) {
            return text;
        }
        
        return text.substring(0, maxChars - 3) + '...';
    }

    showTooltip(event, d) {
        const parent = d.parent.data.name;
        const total = d.parent.value;
        const percentage = ((d.value / total) * 100).toFixed(1);
        
        let tooltipHTML = `
            <div class="tooltip-title">${d.data.name}</div>
            <div class="tooltip-content">
                <div class="tooltip-row">
                    <span class="tooltip-label">Students:</span>
                    <span class="tooltip-value">${d.value.toLocaleString()}</span>
                </div>
        `;
        
        if (parent !== 'NU Students') {
            tooltipHTML += `
                <div class="tooltip-row">
                    <span class="tooltip-label">${this.hierarchyMode === 'campus' ? 'Campus' : 'Program'}:</span>
                    <span class="tooltip-value">${parent}</span>
                </div>
            `;
        }
        
        tooltipHTML += `
                <div class="tooltip-row">
                    <span class="tooltip-label">% of ${parent}:</span>
                    <span class="tooltip-value">${percentage}%</span>
                </div>
        `;
        
        if (d.data.type) {
            tooltipHTML += `
                <div class="tooltip-row">
                    <span class="tooltip-label">Type:</span>
                    <span class="tooltip-value">${d.data.type}</span>
                </div>
            `;
        }
        
        if (d.data.region) {
            tooltipHTML += `
                <div class="tooltip-row">
                    <span class="tooltip-label">Region:</span>
                    <span class="tooltip-value">${d.data.region}</span>
                </div>
            `;
        }
        
        tooltipHTML += `</div>`;
        
        this.tooltip
            .html(tooltipHTML)
            .classed('visible', true);
        
        this.moveTooltip(event);
        
        // Update selected info
        document.getElementById('selectedInfo').textContent = 
            `${d.data.name} (${d.value.toLocaleString()})`;
    }

    moveTooltip(event) {
        const tooltipWidth = this.tooltip.node().offsetWidth;
        const tooltipHeight = this.tooltip.node().offsetHeight;
        
        let left = event.pageX + 15;
        let top = event.pageY + 15;
        
        // Keep tooltip in viewport
        if (left + tooltipWidth > window.innerWidth) {
            left = event.pageX - tooltipWidth - 15;
        }
        
        if (top + tooltipHeight > window.innerHeight) {
            top = event.pageY - tooltipHeight - 15;
        }
        
        this.tooltip
            .style('left', `${left}px`)
            .style('top', `${top}px`);
    }

    hideTooltip() {
        this.tooltip.classed('visible', false);
        document.getElementById('selectedInfo').textContent = '-';
    }

    handleClick(event, d) {
        // Optional: Add click interaction (e.g., zoom, filter)
        console.log('Clicked:', d.data);
    }

    resize() {
        const containerElement = this.container.node().parentNode;
        this.width = containerElement.clientWidth;
        this.height = containerElement.clientHeight;
        
        this.svg
            .attr('width', this.width)
            .attr('height', this.height);
    }

    setHierarchyMode(mode) {
        this.hierarchyMode = mode;
    }
}
