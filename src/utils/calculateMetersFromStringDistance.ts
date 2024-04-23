export const calculateMetersFromStringDistance = (stringDistance:string):number =>{
    const regex = /(\d+(\.\d+)?)\s*(km|m)\b/gi;
    let totalMeters = 0;
    let match;

    while ((match = regex.exec(stringDistance)) !== null) {
        const value = parseFloat(match[1]); 
        const unit = match[3].toLowerCase();

        if (unit === 'km') {
            totalMeters += value * 1000;
        } else if (unit === 'm') {
            totalMeters += value; 
        }
    }

    return totalMeters;
}