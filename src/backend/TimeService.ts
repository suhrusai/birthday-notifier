export const getCurrentMonthName = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    
    return months[currentMonthIndex];
  };
  
  const currentMonth = getCurrentMonthName();
