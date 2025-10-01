function updateCalendar() {
    const now = new Date();
    
    // Get the start of the week (Sunday)
    const startOfWeek = new Date(now);
    const day = now.getDay();
    startOfWeek.setDate(now.getDate() - day);
    
    // Get the end of the week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    // Format the week range
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const startMonth = monthNames[startOfWeek.getMonth()];
    const endMonth = monthNames[endOfWeek.getMonth()];
    const year = endOfWeek.getFullYear();
    
    let weekRangeText;
    if (startMonth === endMonth) {
        weekRangeText = `${startMonth} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${year}`;
    } else {
        weekRangeText = `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}, ${year}`;
    }
    
    document.getElementById('weekRange').textContent = weekRangeText;
    
    // Update individual day dates
    const dayElements = ['sunDate', 'monDate', 'tueDate', 'wedDate', 'thuDate', 'friDate', 'satDate'];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        document.getElementById(dayElements[i]).textContent = date.getDate();
    }
}

// Update calendar when page loads
updateCalendar();

// Meeting block injection for demo purposes
;(function populateMeetingBlocks(){
    // lengths in minutes and corresponding heights (px)
    const lengths = [15, 30, 60, 120]
    const heightMap = {15: 20, 30: 40, 60: 80, 120: 160}

    // weekday columns: Monday..Friday are the 2nd..6th .day-column in the DOM
    const dayColumns = Array.from(document.querySelectorAll('.calendar-grid .day-column'))

    // choose one of the five workdays to be empty (index 1..5 -> monday..friday)
    const workdayIndexes = [1,2,3,4,5]
    const emptyIndex = workdayIndexes[Math.floor(Math.random() * workdayIndexes.length)]

    workdayIndexes.forEach((colIdx)=>{
        if (colIdx === emptyIndex) return // leave empty

        const column = dayColumns[colIdx]
        if (!column) return

        // pick random length and variant
        const length = lengths[Math.floor(Math.random() * lengths.length)]
        const variant = Math.random() < 0.5 ? 'accepted' : 'tentative'

        // create meeting block element
        const block = document.createElement('div')
        block.className = `meeting-block ${variant}`
        block.style.height = heightMap[length] + 'px'

        const title = document.createElement('div')
        title.className = 'meeting-title'
        title.textContent = variant === 'accepted' ? 'Meeting' : 'Tentative'

        const len = document.createElement('div')
        len.className = 'meeting-length'
        len.textContent = `${length}m`

        block.appendChild(title)
        block.appendChild(len)

        // choose a random vertical position within the column (avoid overflow)
        const columnHeight = column.clientHeight
        const maxTop = Math.max(0, columnHeight - heightMap[length] - 8)
        const top = Math.floor(Math.random() * maxTop)
        block.style.top = top + 'px'

        column.appendChild(block)
    })
})()
