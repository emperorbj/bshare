// utils/formatDate.ts

export const formatDate = (mongoDate: string | Date | null | undefined): string => {
    if (!mongoDate) return '';
  
    const date = new Date(mongoDate);
  
    if (isNaN(date.getTime())) {
      return '';
    }
  
    // Example output: April 20, 2025
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  