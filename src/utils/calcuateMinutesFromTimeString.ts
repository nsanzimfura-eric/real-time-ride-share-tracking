export const calcuateMinutesFromTimeString = (timeString:string):number =>{
    const regex = /(\d+)\s*(day|days|hour|hours|min|mins)\b/gi;
    let totalMinutes = 0;
    let match;

    while ((match = regex.exec(timeString)) !== null) {
        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase(); 

        if (unit.startsWith('day')) {
            totalMinutes += value * 1440; 
        } else if (unit.startsWith('hour')) {
            totalMinutes += value * 60; 
        } else if (unit.startsWith('min')) {
            totalMinutes += value;
        }
    }

    return totalMinutes;
}