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
