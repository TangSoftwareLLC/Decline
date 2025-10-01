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
    // use 30, 60, and 90 minute meeting lengths
    const lengths = [30, 60, 90]
    const heightMap = {30: 40, 60: 80, 90: 120}

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

    block.appendChild(title)

        // choose a random vertical position within the column (avoid overflow)
        const columnHeight = column.clientHeight
        const maxTop = Math.max(0, columnHeight - heightMap[length] - 8)
        const top = Math.floor(Math.random() * maxTop)
        block.style.top = top + 'px'

        column.appendChild(block)
    })
})()

// Paddle implementation for mouse control
;(function addPaddle(){
    const calendarContainer = document.querySelector('.calendar-container')
    const calendarGrid = document.querySelector('.calendar-grid')
    if (!calendarContainer || !calendarGrid) return

    const paddle = document.createElement('div')
    paddle.className = 'paddle'
    // append to body so the paddle can sit outside/below the calendar container
    document.body.appendChild(paddle)

    // initial placement: below the calendarContainer, horizontally centered over the grid
    function placePaddleInitially(){
        const containerRect = calendarContainer.getBoundingClientRect()
        const gridRect = calendarGrid.getBoundingClientRect()
        const paddleWidth = paddle.offsetWidth

        const top = window.scrollY + containerRect.bottom + 8 // 8px below container
        const left = window.scrollX + (gridRect.left + gridRect.width / 2 - paddleWidth / 2)

        paddle.style.top = top + 'px'
        paddle.style.left = left + 'px'
    }

    // place first time
    placePaddleInitially()

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

    let dragging = false

    function startDrag(e){
        dragging = true
        document.body.style.userSelect = 'none'
        if (e.target && e.target.setPointerCapture) {
            try { e.target.setPointerCapture(e.pointerId) } catch (err) {}
        }
    }

    function stopDrag(e){
        dragging = false
        document.body.style.userSelect = ''
        if (e.target && e.target.releasePointerCapture) {
            try { e.target.releasePointerCapture(e.pointerId) } catch (err) {}
        }
    }

    function onPointerMove(e){
        if (!dragging) return

        const gridRect = calendarGrid.getBoundingClientRect()
        const paddleWidth = paddle.offsetWidth

        // use pageX to account for scrolling
        const pageX = (e.pageX !== undefined) ? e.pageX : (e.touches && e.touches[0] && e.touches[0].pageX)
        if (pageX == null) return

        // compute allowed range in page coordinates
        const minPageX = window.scrollX + gridRect.left
        const maxPageX = window.scrollX + gridRect.left + gridRect.width - paddleWidth

        const newLeftPage = clamp(pageX - paddleWidth / 2, minPageX, maxPageX)

        paddle.style.left = newLeftPage + 'px'
        paddle.style.top = (window.scrollY + calendarContainer.getBoundingClientRect().bottom + 8) + 'px'
    }

    // Dragging only while pointer is down. Start on pointerdown over the paddle or over the calendar grid area.
    paddle.addEventListener('pointerdown', startDrag)
    calendarContainer.addEventListener('pointerdown', startDrag)

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', stopDrag)

    // reposition paddle on resize/scroll to stay below the container
    window.addEventListener('resize', placePaddleInitially)
    window.addEventListener('scroll', placePaddleInitially)

    // Hover move: when not dragging, allow mouse/pointer movement to control the paddle
    function hoverMove(e){
        // ignore while dragging
        if (dragging) return
        // ignore touch pointer types for hover behavior (touch uses drag)
        if (e.pointerType === 'touch') return

        const gridRect = calendarGrid.getBoundingClientRect()
        const paddleWidth = paddle.offsetWidth
        const pageX = (e.pageX !== undefined) ? e.pageX : (e.touches && e.touches[0] && e.touches[0].pageX)
        if (pageX == null) return

        const minPageX = window.scrollX + gridRect.left
        const maxPageX = window.scrollX + gridRect.left + gridRect.width - paddleWidth
        const newLeftPage = clamp(pageX - paddleWidth / 2, minPageX, maxPageX)

        paddle.style.left = newLeftPage + 'px'
        paddle.style.top = (window.scrollY + calendarContainer.getBoundingClientRect().bottom + 8) + 'px'
    }

    calendarContainer.addEventListener('pointermove', hoverMove)
})()
