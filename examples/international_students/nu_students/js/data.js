/**
 * Northeastern University Student Distribution Data
 * Source: NU Students by Campus (October 2025)
 */

export const studentData = {
    name: "NU Students",
    children: [
        {
            name: "Boston",
            type: "Physical Campus",
            region: "Northeast",
            children: [
                { name: "MS", program: "Master's", value: 2259 },
                { name: "UG", program: "Undergraduate", value: 4172 }
            ]
        },
        {
            name: "Seattle",
            type: "Physical Campus",
            region: "West",
            children: [
                { name: "MS", program: "Master's", value: 537 }
            ]
        },
        {
            name: "Silicon Valley",
            type: "Physical Campus",
            region: "West",
            children: [
                { name: "MS", program: "Master's", value: 519 }
            ]
        },
        {
            name: "Portland",
            type: "Physical Campus",
            region: "West",
            children: [
                { name: "MS", program: "Master's", value: 362 }
            ]
        },
        {
            name: "Vancouver",
            type: "Physical Campus",
            region: "International",
            children: [
                { name: "MS", program: "Master's", value: 246 }
            ]
        },
        {
            name: "Oakland",
            type: "Physical Campus",
            region: "West",
            children: [
                { name: "MS", program: "Master's", value: 107 },
                { name: "UG", program: "Undergraduate", value: 171 }
            ]
        },
        {
            name: "Arlington",
            type: "Physical Campus",
            region: "Northeast",
            children: [
                { name: "MS", program: "Master's", value: 84 }
            ]
        },
        {
            name: "London",
            type: "Physical Campus",
            region: "International",
            children: [
                { name: "UG", program: "Undergraduate", value: 48 }
            ]
        },
        {
            name: "New York",
            type: "Physical Campus",
            region: "Northeast",
            children: [
                { name: "UG", program: "Undergraduate", value: 26 }
            ]
        },
        {
            name: "Miami",
            type: "Physical Campus",
            region: "Southeast",
            children: [
                { name: "MS", program: "Master's", value: 18 }
            ]
        },
        {
            name: "Online",
            type: "Online Programs",
            region: "Virtual",
            children: [
                { name: "MS", program: "Master's", value: 281 }
            ]
        },
        {
            name: "Align Online",
            type: "Online Programs",
            region: "Virtual",
            children: [
                { name: "MS", program: "Master's", value: 171 }
            ]
        },
        {
            name: "NU.in",
            type: "Special Programs",
            region: "Global",
            children: [
                { name: "UG", program: "Undergraduate", value: 102 }
            ]
        },
        {
            name: "NU Immerse",
            type: "Special Programs",
            region: "Global",
            children: [
                { name: "UG", program: "Undergraduate", value: 12 }
            ]
        }
    ]
};

/**
 * Transform data for Program -> Campus hierarchy
 */
export function transformToProgramFirst(data) {
    const programMap = new Map();
    
    data.children.forEach(campus => {
        campus.children.forEach(program => {
            const programType = program.program;
            
            if (!programMap.has(programType)) {
                programMap.set(programType, {
                    name: programType,
                    children: []
                });
            }
            
            programMap.get(programType).children.push({
                name: `${campus.name} - ${program.name}`,
                campus: campus.name,
                program: programType,
                type: campus.type,
                region: campus.region,
                value: program.value
            });
        });
    });
    
    return {
        name: "NU Students",
        children: Array.from(programMap.values())
    };
}

/**
 * Calculate total students
 */
export function calculateTotal(data) {
    let total = 0;
    
    function sum(node) {
        if (node.value) {
            total += node.value;
        }
        if (node.children) {
            node.children.forEach(sum);
        }
    }
    
    sum(data);
    return total;
}

/**
 * Get program type colors
 */
export const programColors = {
    "Master's": "#d41b2c",
    "Undergraduate": "#0a7abf",
    "MS": "#d41b2c",
    "UG": "#0a7abf"
};

/**
 * Get color scale for programs
 */
export function getColorForProgram(programName) {
    if (programName.includes("Master") || programName === "MS") {
        return "#d41b2c";
    } else if (programName.includes("Undergraduate") || programName === "UG") {
        return "#0a7abf";
    }
    return "#7f8c8d";
}
